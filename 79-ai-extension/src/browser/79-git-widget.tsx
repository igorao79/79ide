import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { CommandService, MessageService } from '@theia/core/lib/common';

@injectable()
export class NineSevenGitWidget extends ReactWidget {
    static readonly ID = '79-git-quick';
    static readonly LABEL = '79 Git';

    @inject(CommandService) protected readonly commandService!: CommandService;
    @inject(MessageService) protected readonly messageService!: MessageService;

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

    private readonly inputStyle: React.CSSProperties = {
        flex: 1, padding: '7px 10px', fontSize: '12px',
        background: '#151515', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px', color: '#fff', outline: 'none',
        fontFamily: "'JetBrains Mono', monospace"
    };

    private btnStyle(color: string): React.CSSProperties {
        return {
            padding: '7px 14px', fontSize: '11px', fontWeight: 600,
            background: color, color: color === '#fff' ? '#000' : '#fff',
            border: 'none', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap'
        };
    }

    protected render(): React.ReactNode {
        return (
            <div style={{ padding: '14px', fontFamily: "'Inter', sans-serif", color: '#fff', height: '100%', overflowY: 'auto', background: '#080808' }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Quick Git
                </h3>

                {/* Repo URL */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '10px', color: '#444', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Repository</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input type="text" placeholder="https://github.com/user/repo.git" value={this.repoUrl}
                            onChange={e => { this.repoUrl = (e.target as HTMLInputElement).value; this.update(); }}
                            style={this.inputStyle} />
                        <button onClick={() => this.linkRepo()} style={this.btnStyle('#fff')}>Link</button>
                    </div>
                </div>

                {/* Quick Commit */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '10px', color: '#444', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Commit</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input type="text" placeholder="message..." value={this.commitMsg}
                            onChange={e => { this.commitMsg = (e.target as HTMLInputElement).value; this.update(); }}
                            onKeyDown={e => { if (e.key === 'Enter') this.quickCommit(); }}
                            style={{ ...this.inputStyle, fontFamily: "'Inter', sans-serif" }} />
                        <button onClick={() => this.quickCommit()} style={this.btnStyle('#fff')}>Commit</button>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    <button onClick={() => this.gitPush()} style={this.btnStyle('#333')}>Push</button>
                    <button onClick={() => this.gitPull()} style={this.btnStyle('#333')}>Pull</button>
                    <button onClick={() => this.gitStatus()} style={this.btnStyle('#222')}>Status</button>
                </div>

                {/* Output */}
                {this.statusText && (
                    <pre style={{
                        padding: '10px', fontSize: '10px', background: '#0e0e0e',
                        border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
                        color: '#888', overflowX: 'auto', fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'pre-wrap', maxHeight: '180px'
                    }}>{this.statusText}</pre>
                )}
            </div>
        );
    }

    private async runTerminalCommand(cmd: string): Promise<void> {
        this.statusText = `$ ${cmd}`;
        this.update();
        try {
            await this.commandService.executeCommand('terminal:new');
            setTimeout(() => {
                this.commandService.executeCommand('workbench.action.terminal.sendSequence', { text: cmd + '\n' }).catch(() => {});
            }, 500);
        } catch {
            this.statusText = 'Run manually: ' + cmd;
            this.update();
        }
    }

    private async linkRepo(): Promise<void> {
        if (!this.repoUrl.trim()) { this.messageService.warn('Enter a repository URL'); return; }
        await this.runTerminalCommand(`git remote add origin ${this.repoUrl.trim()} 2>/dev/null || git remote set-url origin ${this.repoUrl.trim()}`);
        this.statusText = `Linked: ${this.repoUrl}`;
        this.update();
    }

    private async quickCommit(): Promise<void> {
        if (!this.commitMsg.trim()) { this.messageService.warn('Enter a commit message'); return; }
        await this.runTerminalCommand(`git add -A && git commit -m "${this.commitMsg.trim()}"`);
        this.statusText = `Committed: "${this.commitMsg}"`;
        this.commitMsg = '';
        this.update();
    }

    private async gitPush(): Promise<void> { await this.runTerminalCommand('git push -u origin main 2>/dev/null || git push'); }
    private async gitPull(): Promise<void> { await this.runTerminalCommand('git pull'); }
    private async gitStatus(): Promise<void> { await this.runTerminalCommand('git status'); }
}
