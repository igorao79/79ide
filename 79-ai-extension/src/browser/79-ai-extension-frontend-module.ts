import { ContainerModule } from '@theia/core/shared/inversify';
import { ChatAgent } from '@theia/ai-chat/lib/common';
import { Agent } from '@theia/ai-core/lib/common';
import { FrontendApplicationContribution, WidgetFactory, bindViewContribution } from '@theia/core/lib/browser';
import { NineSevenCoderAgent } from './79-coder-agent';
import { NineSevenWelcomeWidget } from './79-welcome-widget';
import { NineSevenGitWidget } from './79-git-widget';
import { NineSevenExtensionContribution } from './79-ai-extension-contribution';
import { NineSevenGitContribution } from './79-git-contribution';
import { NineSevenModelSelectorInjector } from './79-model-selector-injector';

export default new ContainerModule(bind => {
    // 79 Coder AI Agent
    bind(NineSevenCoderAgent).toSelf().inSingletonScope();
    bind(ChatAgent).toService(NineSevenCoderAgent);
    bind(Agent).toService(NineSevenCoderAgent);

    // Welcome Widget
    bind(NineSevenWelcomeWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: NineSevenWelcomeWidget.ID,
        createWidget: () => ctx.container.get<NineSevenWelcomeWidget>(NineSevenWelcomeWidget)
    })).inSingletonScope();

    // Git Quick Widget + Sidebar Contribution
    bind(NineSevenGitWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: NineSevenGitWidget.ID,
        createWidget: () => ctx.container.get<NineSevenGitWidget>(NineSevenGitWidget)
    })).inSingletonScope();
    bindViewContribution(bind, NineSevenGitContribution);

    // Model Selector Injector
    bind(NineSevenModelSelectorInjector).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(NineSevenModelSelectorInjector);

    // Main Contribution (Welcome, commands)
    bindViewContribution(bind, NineSevenExtensionContribution);
    bind(FrontendApplicationContribution).toService(NineSevenExtensionContribution);
});
