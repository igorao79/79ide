import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { CommandService, MessageService } from '@theia/core/lib/common';

@injectable()
export class NineSevenGitWidget extends ReactWidget {
    static readonly ID = '79-git-quick';
    static readonly LABEL = '79 Git';

    @inject(CommandService)
    protected readonly commandService!: CommandService;

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    protected repoUrl: string = '';
    protected commitMsg: string = '';
    protected statusText: string = '';

    @postConstruct()
    protected init(): void {
        this.id = NineSevenGitWidget.ID;
        this.title.label = NineSevenGitWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'codicon codicon-git-merge';
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div style={{
                padding: '16px',
                fontFamily: "'Inter', sans-serif",
                color: '#e8ecf4',
                height: '100%',
                overflowY: 'auto',
                background: '#0c0c16'
            }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, color: '#8b93a8', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Quick Git
                </h3>

                {/* Repo Link */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', color: '#555e73', marginBottom: '6px', display: 'block' }}>Repository URL</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            placeholder="https://github.com/user/repo.git"
                            value={this.repoUrl}
                            onChange={e => { this.repoUrl = (e.target as HTMLInputElement).value; this.update(); }}
                            style={{
                                flex: 1, padding: '8px 12px', fontSize: '12px',
                                background: '#16162a', border: '1px solid rgba(124,58,237,0.15)',
                                borderRadius: '8px', color: '#e8ecf4', outline: 'none',
                                fontFamily: "'JetBrains Mono', monospace"
                            }}
                        />
                        <button
                            onClick={() => this.linkRepo()}
                            style={{
                                padding: '8px 14px', fontSize: '11px', fontWeight: 600,
                                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Link
                        </button>
                    </div>
                </div>

                {/* Quick Commit */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', color: '#555e73', marginBottom: '6px', display: 'block' }}>Quick Commit</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            placeholder="Commit message..."
                            value={this.commitMsg}
                            onChange={e => { this.commitMsg = (e.target as HTMLInputElement).value; this.update(); }}
                            onKeyDown={e => { if (e.key === 'Enter') this.quickCommit(); }}
                            style={{
                                flex: 1, padding: '8px 12px', fontSize: '12px',
                                background: '#16162a', border: '1px solid rgba(124,58,237,0.15)',
                                borderRadius: '8px', color: '#e8ecf4', outline: 'none',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        />
                        <button
                            onClick={() => this.quickCommit()}
                            style={{
                                padding: '8px 14px', fontSize: '11px', fontWeight: 600,
                                background: 'linear-gradient(135deg, #34d399, #059669)',
                                color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Commit
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <button onClick={() => this.gitPush()} style={this.btnStyle('#7c3aed')}>Push</button>
                    <button onClick={() => this.gitPull()} style={this.btnStyle('#22d3ee')}>Pull</button>
                    <button onClick={() => this.gitStatus()} style={this.btnStyle('#555e73')}>Status</button>
                </div>

                {/* Status Output */}
                {this.statusText && (
                    <pre style={{
                        padding: '12px', fontSize: '11px',
                        background: '#07070d', border: '1px solid rgba(124,58,237,0.1)',
                        borderRadius: '8px', color: '#8b93a8', overflowX: 'auto',
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'pre-wrap', maxHeight: '200px'
                    }}>
                        {this.statusText}
                    </pre>
                )}
            </div>
        );
    }

    private btnStyle(bg: string): React.CSSProperties {
        return {
            padding: '6px 14px', fontSize: '11px', fontWeight: 600,
            background: bg, color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer'
        };
    }

    private async runTerminalCommand(cmd: string): Promise<void> {
        this.statusText = `Running: ${cmd}...`;
        this.update();
        try {
            await this.commandService.executeCommand('terminal:new');
            // Small delay to let terminal open
            setTimeout(() => {
                this.commandService.executeCommand('workbench.action.terminal.sendSequence',
                    { text: cmd + '\n' }).catch(() => {});
            }, 500);
        } catch {
            this.statusText = 'Open a terminal manually and run: ' + cmd;
            this.update();
        }
    }

    private async linkRepo(): Promise<void> {
        if (!this.repoUrl.trim()) {
            this.messageService.warn('Please enter a repository URL');
            return;
        }
        await this.runTerminalCommand(`git remote add origin ${this.repoUrl.trim()} 2>/dev/null || git remote set-url origin ${this.repoUrl.trim()}`);
        this.statusText = `Linked to: ${this.repoUrl}`;
        this.update();
    }

    private async quickCommit(): Promise<void> {
        if (!this.commitMsg.trim()) {
            this.messageService.warn('Please enter a commit message');
            return;
        }
        await this.runTerminalCommand(`git add -A && git commit -m "${this.commitMsg.trim()}"`);
        this.statusText = `Committed: "${this.commitMsg}"`;
        this.commitMsg = '';
        this.update();
    }

    private async gitPush(): Promise<void> {
        await this.runTerminalCommand('git push -u origin main 2>/dev/null || git push');
    }

    private async gitPull(): Promise<void> {
        await this.runTerminalCommand('git pull');
    }

    private async gitStatus(): Promise<void> {
        await this.runTerminalCommand('git status');
    }
}
