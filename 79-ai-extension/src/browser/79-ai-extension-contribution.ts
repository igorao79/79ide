import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandRegistry, CommandService } from '@theia/core/lib/common';
import { AbstractViewContribution, FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { NineSevenWelcomeWidget } from './79-welcome-widget';
import { injectTheme } from './79-theme-injector';

export const OPEN_WELCOME_COMMAND: Command = {
    id: '79-ide.open-welcome',
    label: '79 IDE: Welcome'
};

export const OPEN_GIT_COMMAND: Command = {
    id: '79-ide.open-git',
    label: '79 IDE: Quick Git'
};

@injectable()
export class NineSevenExtensionContribution extends AbstractViewContribution<NineSevenWelcomeWidget> implements FrontendApplicationContribution {

    @inject(CommandService)
    protected readonly commandService: CommandService;

    constructor() {
        super({
            widgetId: NineSevenWelcomeWidget.ID,
            widgetName: NineSevenWelcomeWidget.LABEL,
            defaultWidgetOptions: { area: 'main' },
            toggleCommandId: OPEN_WELCOME_COMMAND.id
        });
    }

    async initialize(): Promise<void> {
        injectTheme();
    }

    async onStart(app: FrontendApplication): Promise<void> {
        injectTheme();
        this.openView({ activate: true, reveal: true });

        // Open AI Chat
        setTimeout(() => {
            this.commandService.executeCommand('ai-chat-ui:toggle').catch(() => {});
        }, 1500);

        // Open Git Quick panel
        setTimeout(() => {
            this.commandService.executeCommand('79-git-quick:toggle').catch(() => {});
        }, 2000);

        // Inject logo
        setTimeout(() => this.injectLogo(), 2000);

        // Fix status bar to black (Theia sets inline blue)
        setTimeout(() => this.fixStatusBar(), 2000);
        setTimeout(() => this.fixStatusBar(), 4000);
    }

    private fixStatusBar(): void {
        const fix = () => {
            const bar = document.querySelector('.theia-statusBar') as HTMLElement;
            if (!bar) { return; }
            bar.setAttribute('style', 'background-color: #000000 !important; background: #000000 !important; border-top: 1px solid rgba(255,255,255,0.06) !important;');
            bar.querySelectorAll('div, span, a, .theia-statusBar-entry').forEach(el => {
                const h = el as HTMLElement;
                h.style.cssText = h.style.cssText.replace(/background-color:[^;]+;?/g, '') + ' color: #555 !important;';
            });
        };
        // Run immediately and keep running every 500ms for 10 seconds
        fix();
        let count = 0;
        const interval = setInterval(() => {
            fix();
            count++;
            if (count > 20) { clearInterval(interval); }
        }, 500);
        // Also observe for any attribute changes
        const bar = document.querySelector('.theia-statusBar');
        if (bar) {
            new MutationObserver(fix).observe(bar, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
        }
    }

    private injectLogo(): void {
        if (document.getElementById('79-logo-img')) {
            return;
        }
        const menuBar = document.querySelector('.p-MenuBar') || document.querySelector('.lm-MenuBar');
        if (!menuBar) {
            return;
        }
        const img = document.createElement('img');
        img.id = '79-logo-img';
        img.src = './favicon.ico';
        img.style.cssText = 'width: 18px; height: 18px; position: absolute; left: 10px; top: 50%; transform: translateY(-50%); filter: invert(1); pointer-events: none;';
        (menuBar as HTMLElement).style.position = 'relative';
        menuBar.insertBefore(img, menuBar.firstChild);
    }

    registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);
        commands.registerCommand(OPEN_WELCOME_COMMAND, {
            execute: () => this.openView({ activate: true, reveal: true })
        });
        commands.registerCommand(OPEN_GIT_COMMAND, {
            execute: () => {
                this.commandService.executeCommand('79-git-quick:toggle').catch(() => {});
            }
        });
    }
}
