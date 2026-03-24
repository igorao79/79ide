import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { CommandService } from '@theia/core/lib/common';

@injectable()
export class NineSevenWelcomeWidget extends ReactWidget {
    static readonly ID = '79-welcome';
    static readonly LABEL = 'Welcome';

    @inject(CommandService)
    protected readonly commandService!: CommandService;

    @postConstruct()
    protected init(): void {
        this.id = NineSevenWelcomeWidget.ID;
        this.title.label = NineSevenWelcomeWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'codicon codicon-home';
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div className="welcome-page-root">
                <div className="welcome-logo">
                    <div className="welcome-logo-glow" />
                    <div className="welcome-logo-text">79</div>
                </div>
                <div className="welcome-subtitle">
                    INTELLIGENT DEVELOPMENT ENVIRONMENT
                </div>

                <div className="welcome-actions">
                    <div className="welcome-action-card" onClick={() => this.exec('ai-chat-ui:toggle')}>
                        <div className="welcome-action-icon">
                            <span className="codicon codicon-comment-discussion" style={{ fontSize: '22px', color: '#fff' }} />
                        </div>
                        <div className="welcome-action-title">AI Chat</div>
                        <div className="welcome-action-desc">Talk to 79 Coder</div>
                    </div>
                    <div className="welcome-action-card" onClick={() => this.exec('workspace:open')}>
                        <div className="welcome-action-icon">
                            <span className="codicon codicon-folder-opened" style={{ fontSize: '22px', color: '#fff' }} />
                        </div>
                        <div className="welcome-action-title">Open Project</div>
                        <div className="welcome-action-desc">Open folder</div>
                    </div>
                    <div className="welcome-action-card" onClick={() => this.exec('terminal:new')}>
                        <div className="welcome-action-icon">
                            <span className="codicon codicon-terminal" style={{ fontSize: '22px', color: '#fff' }} />
                        </div>
                        <div className="welcome-action-title">Terminal</div>
                        <div className="welcome-action-desc">AI-powered shell</div>
                    </div>
                </div>

                <div className="welcome-quickstart">
                    <div className="welcome-quickstart-title">Keyboard Shortcuts</div>
                    <ul className="welcome-shortcut-list">
                        <li className="welcome-shortcut-item">
                            <span className="welcome-shortcut-label">AI Chat</span>
                            <span className="welcome-shortcut-key">Ctrl+Shift+I</span>
                        </li>
                        <li className="welcome-shortcut-item">
                            <span className="welcome-shortcut-label">Command Palette</span>
                            <span className="welcome-shortcut-key">Ctrl+Shift+P</span>
                        </li>
                        <li className="welcome-shortcut-item">
                            <span className="welcome-shortcut-label">Quick File Open</span>
                            <span className="welcome-shortcut-key">Ctrl+P</span>
                        </li>
                        <li className="welcome-shortcut-item">
                            <span className="welcome-shortcut-label">Terminal</span>
                            <span className="welcome-shortcut-key">Ctrl+`</span>
                        </li>
                        <li className="welcome-shortcut-item">
                            <span className="welcome-shortcut-label">Settings</span>
                            <span className="welcome-shortcut-key">Ctrl+,</span>
                        </li>
                    </ul>
                </div>

                <div className="welcome-footer">
                    79 IDE <span className="welcome-footer-version">v1.0.0</span> — Powered by Ollama
                </div>
            </div>
        );
    }

    private exec(commandId: string): void {
        this.commandService.executeCommand(commandId).catch(() => {});
    }
}
