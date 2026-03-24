import { injectable } from '@theia/core/shared/inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { NineSevenGitWidget } from './79-git-widget';
import { Command, CommandRegistry } from '@theia/core/lib/common';

export const TOGGLE_GIT_COMMAND: Command = {
    id: '79-git-quick:toggle',
    label: '79: Quick Git'
};

@injectable()
export class NineSevenGitContribution extends AbstractViewContribution<NineSevenGitWidget> {

    constructor() {
        super({
            widgetId: NineSevenGitWidget.ID,
            widgetName: NineSevenGitWidget.LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 600
            },
            toggleCommandId: TOGGLE_GIT_COMMAND.id
        });
    }

    registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);
        commands.registerCommand(TOGGLE_GIT_COMMAND, {
            execute: () => this.openView({ activate: true, reveal: true })
        });
    }
}
