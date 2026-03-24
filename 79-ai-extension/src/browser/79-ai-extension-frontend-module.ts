import { ContainerModule } from '@theia/core/shared/inversify';
import { ChatAgent } from '@theia/ai-chat/lib/common';
import { Agent } from '@theia/ai-core/lib/common';
import { FrontendApplicationContribution, WidgetFactory, bindViewContribution } from '@theia/core/lib/browser';
import { NineSevenCoderAgent } from './79-coder-agent';
import { NineSevenWelcomeWidget } from './79-welcome-widget';
import { NineSevenGitWidget } from './79-git-widget';
import { NineSevenExtensionContribution } from './79-ai-extension-contribution';

export default new ContainerModule(bind => {
    // Register 79 Coder AI Agent
    bind(NineSevenCoderAgent).toSelf().inSingletonScope();
    bind(ChatAgent).toService(NineSevenCoderAgent);
    bind(Agent).toService(NineSevenCoderAgent);

    // Register Welcome Widget
    bind(NineSevenWelcomeWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: NineSevenWelcomeWidget.ID,
        createWidget: () => ctx.container.get<NineSevenWelcomeWidget>(NineSevenWelcomeWidget)
    })).inSingletonScope();

    // Register Git Quick Widget
    bind(NineSevenGitWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: NineSevenGitWidget.ID,
        createWidget: () => ctx.container.get<NineSevenGitWidget>(NineSevenGitWidget)
    })).inSingletonScope();

    // Register Contribution (commands, menus, startup behavior)
    bindViewContribution(bind, NineSevenExtensionContribution);
    bind(FrontendApplicationContribution).toService(NineSevenExtensionContribution);
});
