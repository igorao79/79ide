import { injectable } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

@injectable()
export class NineSevenModelSelectorInjector implements FrontendApplicationContribution {

    private currentModel: string = 'qwen2.5-coder:7b';
    private models: string[] = [
        'qwen2.5-coder:7b',
        'qwen2.5-coder:14b',
        'qwen3-coder:30b',
        'deepseek-coder-v2:16b',
        'codellama:7b',
        'llama3.1:8b',
        'starcoder2:7b'
    ];

    async onStart(): Promise<void> {
        // Retry injection every 2s until successful, then watch for DOM changes
        const interval = setInterval(() => {
            if (this.tryInject()) {
                clearInterval(interval);
                this.startWatching();
            }
        }, 2000);
    }

    private startWatching(): void {
        // Re-inject if chat panel is reopened
        const observer = new MutationObserver(() => {
            if (!document.getElementById('79-model-bar')) {
                this.tryInject();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    private tryInject(): boolean {
        // Already injected
        if (document.getElementById('79-model-bar')) {
            return true;
        }

        // Strategy 1: Find .theia-ChatInputOptions-left
        let target = document.querySelector('.theia-ChatInputOptions-left');
        if (target) {
            this.injectInto(target, 'prepend');
            return true;
        }

        // Strategy 2: Find .theia-ChatInputOptions
        target = document.querySelector('.theia-ChatInputOptions');
        if (target) {
            this.injectInto(target, 'prepend');
            return true;
        }

        // Strategy 3: Find .theia-ChatInput and inject before it
        target = document.querySelector('.theia-ChatInput');
        if (target) {
            this.injectBefore(target);
            return true;
        }

        // Strategy 4: Find the chat input box
        target = document.querySelector('.theia-ChatInput-Editor-Box');
        if (target && target.parentElement) {
            this.injectAfter(target);
            return true;
        }

        return false;
    }

    private createSelector(): HTMLElement {
        const bar = document.createElement('div');
        bar.id = '79-model-bar';
        bar.style.cssText = `
            display: flex; align-items: center; gap: 8px;
            padding: 4px 10px; margin: 0;
            background: rgba(22,22,42,0.6);
            border-top: 1px solid rgba(124,58,237,0.1);
            font-family: 'Inter', sans-serif;
        `;

        // Label
        const label = document.createElement('span');
        label.style.cssText = 'font-size: 10px; color: #555e73; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;';
        label.textContent = 'Model';
        bar.appendChild(label);

        // Select
        const select = document.createElement('select');
        select.id = '79-model-select';
        select.style.cssText = `
            background: #0f0f1a; color: #a78bfa;
            border: 1px solid rgba(124,58,237,0.2);
            border-radius: 6px; padding: 3px 24px 3px 8px;
            font-size: 11px; font-family: 'JetBrains Mono', monospace;
            cursor: pointer; outline: none; flex: 1; min-width: 0;
            appearance: none; -webkit-appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 8 5'%3E%3Cpath fill='%23a78bfa' d='M0 0l4 5 4-5z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 8px center;
        `;

        this.models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            opt.selected = m === this.currentModel;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            this.currentModel = select.value;
            // Flash green
            select.style.borderColor = '#34d399';
            setTimeout(() => { select.style.borderColor = 'rgba(124,58,237,0.2)'; }, 800);
        });

        select.addEventListener('focus', () => {
            select.style.borderColor = '#7c3aed';
            select.style.boxShadow = '0 0 0 2px rgba(124,58,237,0.15)';
        });
        select.addEventListener('blur', () => {
            select.style.borderColor = 'rgba(124,58,237,0.2)';
            select.style.boxShadow = 'none';
        });

        bar.appendChild(select);
        return bar;
    }

    private injectInto(target: Element, position: 'prepend' | 'append'): void {
        const bar = this.createSelector();
        if (position === 'prepend') {
            target.insertBefore(bar, target.firstChild);
        } else {
            target.appendChild(bar);
        }
    }

    private injectBefore(target: Element): void {
        const bar = this.createSelector();
        target.parentElement?.insertBefore(bar, target);
    }

    private injectAfter(target: Element): void {
        const bar = this.createSelector();
        if (target.nextSibling) {
            target.parentElement?.insertBefore(bar, target.nextSibling);
        } else {
            target.parentElement?.appendChild(bar);
        }
    }
}
