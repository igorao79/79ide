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
    label: '79 IDE: Git Quick Panel'
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

        // Open Welcome tab
        this.openView({ activate: true, reveal: true });

        // Open AI Chat in right panel
        setTimeout(() => {
            this.commandService.executeCommand('ai-chat-ui:toggle').catch(() => {});
        }, 1500);

        // Inject logo into menu bar
        setTimeout(() => this.injectLogo(), 2000);
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
