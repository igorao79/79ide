import { injectable } from '@theia/core/shared/inversify';
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';

@injectable()
export class NineSevenColorContribution implements ColorContribution {
    registerColors(colors: ColorRegistry): void {
        colors.register(
            { id: 'statusBar.background', defaults: { dark: '#000000', light: '#ffffff', hcDark: '#000000', hcLight: '#ffffff' }, description: '79 IDE status bar background' },
            { id: 'statusBar.foreground', defaults: { dark: '#555555', light: '#333333', hcDark: '#ffffff', hcLight: '#000000' }, description: '79 IDE status bar foreground' },
            { id: 'statusBar.noFolderBackground', defaults: { dark: '#000000', light: '#ffffff' }, description: '79 IDE status bar no folder' },
            { id: 'statusBar.debuggingBackground', defaults: { dark: '#000000', light: '#ffffff' }, description: '79 IDE status bar debugging' },
            { id: 'statusBarItem.activeBackground', defaults: { dark: '#111111', light: '#eeeeee' }, description: '79 IDE status bar item active' },
            { id: 'statusBarItem.hoverBackground', defaults: { dark: '#111111', light: '#eeeeee' }, description: '79 IDE status bar item hover' }
        );
    }
}
