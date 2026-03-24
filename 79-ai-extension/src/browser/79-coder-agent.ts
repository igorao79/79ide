import { injectable } from '@theia/core/shared/inversify';
import {
    AbstractStreamParsingChatAgent,
    ChatAgent,
    SystemMessageDescription
} from '@theia/ai-chat/lib/common';
import { LanguageModelRequirement } from '@theia/ai-core/lib/common';

@injectable()
export class NineSevenCoderAgent extends AbstractStreamParsingChatAgent implements ChatAgent {

    readonly id = '79-coder';
    readonly name = '79 Coder';
    readonly description = 'ИИ-ассистент для генерации, объяснения и рефакторинга кода';
    readonly iconClass = 'codicon codicon-sparkle';

    readonly languageModelRequirements: LanguageModelRequirement[] = [{
        purpose: 'chat',
        identifier: 'ollama/qwen2.5-coder:7b'
    }];

    protected readonly defaultLanguageModelPurpose = 'chat';

    readonly supportedLanguages = [
        'python', 'javascript', 'typescript', 'rust',
        'go', 'java', 'c', 'cpp', 'csharp', 'html',
        'css', 'sql', 'bash', 'powershell'
    ];

    protected override async getSystemMessageDescription(): Promise<SystemMessageDescription | undefined> {
        return {
            text: `Ты — 79 Coder, экспертный ИИ-ассистент программиста.

ПРАВИЛА:
1. Пиши чистый, хорошо прокомментированный код
2. Оборачивай код в markdown блоки с тегом языка
3. Кратко объясняй что код делает
4. Если задача неясна — пиши самый вероятный вариант
5. Отвечай на том же языке что и пользователь
6. При рефакторинге — покажи улучшенную версию и объясни изменения
7. При объяснении — разбирай код пошагово

У тебя есть доступ к файлам пользователя в его workspace.
Используй контекст файлов когда это релевантно.`
        };
    }
}
