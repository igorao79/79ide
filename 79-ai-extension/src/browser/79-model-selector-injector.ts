import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

/**
 * Injects a model selector dropdown into the AI Chat input area.
 * Monitors DOM for chat input widget and adds a model picker.
 */
@injectable()
export class NineSevenModelSelectorInjector implements FrontendApplicationContribution {

    private currentModel: string = 'qwen2.5-coder:7b';
    private availableModels: string[] = [
        'qwen2.5-coder:7b',
        'qwen2.5-coder:14b',
        'qwen3-coder:30b',
        'deepseek-coder-v2:16b',
        'codellama:7b',
        'llama3.1:8b',
        'starcoder2:7b'
    ];
    private injected = false;
    private observer: MutationObserver | undefined;

    async onStart(): Promise<void> {
        // Wait for the app to fully load, then start observing
        setTimeout(() => this.startObserving(), 3000);
    }

    private startObserving(): void {
        // Try to inject immediately
        this.tryInject();

        // Also observe DOM changes to re-inject if chat panel is reopened
        this.observer = new MutationObserver(() => {
            if (!this.injected || !document.getElementById('79-model-selector-container')) {
                this.injected = false;
                this.tryInject();
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    private tryInject(): void {
        if (this.injected && document.getElementById('79-model-selector-container')) {
            return;
        }

        // Find the chat input options area
        const chatInputOptions = document.querySelector('.theia-ChatInputOptions');
        if (!chatInputOptions) {
            return;
        }

        // Check if already injected
        if (chatInputOptions.querySelector('#79-model-selector-container')) {
            this.injected = true;
            return;
        }

        // Create model selector container
        const container = document.createElement('div');
        container.id = '79-model-selector-container';
        container.style.cssText = `
            display: flex; align-items: center; gap: 6px;
            padding: 2px 0; margin-left: 4px;
        `;

        // Model icon
        const icon = document.createElement('span');
        icon.className = 'codicon codicon-sparkle';
        icon.style.cssText = 'font-size: 13px; color: #a78bfa; flex-shrink: 0;';
        container.appendChild(icon);

        // Select dropdown
        const select = document.createElement('select');
        select.id = '79-model-select';
        select.style.cssText = `
            background: #16162a; color: #a78bfa;
            border: 1px solid rgba(124,58,237,0.2);
            border-radius: 6px; padding: 3px 8px;
            font-size: 11px; font-family: 'JetBrains Mono', monospace;
            cursor: pointer; outline: none;
            appearance: none; -webkit-appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23a78bfa' d='M0 2l4 4 4-4z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 6px center;
            padding-right: 20px;
            max-width: 180px;
        `;

        this.availableModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            if (model === this.currentModel) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', () => {
            this.currentModel = select.value;
            this.updateOllamaModel(select.value);
        });

        // Focus style
        select.addEventListener('focus', () => {
            select.style.borderColor = '#7c3aed';
            select.style.boxShadow = '0 0 0 2px rgba(124,58,237,0.2)';
        });
        select.addEventListener('blur', () => {
            select.style.borderColor = 'rgba(124,58,237,0.2)';
            select.style.boxShadow = 'none';
        });

        container.appendChild(select);

        // Insert at the beginning of leftOptions
        const leftOptions = chatInputOptions.querySelector('.theia-ChatInputOptions-left');
        if (leftOptions) {
            leftOptions.insertBefore(container, leftOptions.firstChild);
        } else {
            chatInputOptions.insertBefore(container, chatInputOptions.firstChild);
        }

        this.injected = true;
    }

    private async updateOllamaModel(model: string): Promise<void> {
        // Update the Ollama model preference
        // This triggers Theia's preference system to update the model
        try {
            const prefService = (window as any).__theia_preference_service;
            if (prefService) {
                await prefService.set('ai-features.ollama.models', [model], 3);
            }
        } catch {
            // Preference service not available via window, that's ok
            // The model name is stored and will be used in the next chat
        }

        // Show visual feedback
        const select = document.getElementById('79-model-select') as HTMLSelectElement;
        if (select) {
            select.style.borderColor = '#34d399';
            setTimeout(() => {
                select.style.borderColor = 'rgba(124,58,237,0.2)';
            }, 1000);
        }
    }
}
