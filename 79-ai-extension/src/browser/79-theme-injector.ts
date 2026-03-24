export const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
    --79-bg: #000000;
    --79-bg-1: #080808;
    --79-bg-2: #0e0e0e;
    --79-bg-3: #151515;
    --79-bg-4: #1c1c1c;
    --79-bg-hover: #222222;
    --79-text: #ffffff;
    --79-text-2: #b0b0b0;
    --79-text-3: #666666;
    --79-border: rgba(255,255,255,0.08);
    --79-border-2: rgba(255,255,255,0.04);
    --79-accent: #ffffff;
    --79-font: 'Inter', -apple-system, sans-serif;
    --79-mono: 'JetBrains Mono', monospace;
}

/* GLOBAL */
body, .theia-ApplicationShell, .p-Widget, .lm-Widget,
.p-TabBar, .lm-TabBar, .p-MenuBar, .lm-MenuBar, .p-Menu, .lm-Menu,
.theia-TreeContainer, .theia-input, input, select, textarea, button {
    font-family: var(--79-font) !important;
    -webkit-font-smoothing: antialiased !important;
}
.monaco-editor, .monaco-editor .view-lines, .xterm, .terminal-wrapper {
    font-family: var(--79-mono) !important;
}
body, .theia-ApplicationShell { background: #000 !important; }

/* ===== MENU BAR ===== */
#theia-top-panel { background: #000 !important; border-bottom: 1px solid var(--79-border) !important; }
.p-MenuBar, .lm-MenuBar { background: #000 !important; height: 40px !important; padding-left: 10px !important; }

/* Logo "79" text */
.p-MenuBar::before, .lm-MenuBar::before {
    content: '79' !important; font-size: 15px !important; font-weight: 800 !important;
    color: #fff !important; -webkit-text-fill-color: #fff !important;
    background: none !important; margin-right: 16px !important; letter-spacing: -1px !important;
    margin-left: 24px !important;
}

.p-MenuBar-item, .lm-MenuBar-item { color: #666 !important; background: transparent !important; font-size: 12px !important; font-weight: 500 !important; border-radius: 4px !important; padding: 4px 10px !important; margin: 0 1px !important; }
.p-MenuBar-itemLabel, .lm-MenuBar-itemLabel { color: #666 !important; }
.p-MenuBar-item:hover .p-MenuBar-itemLabel, .lm-MenuBar-item:hover .lm-MenuBar-itemLabel { color: #fff !important; }
.p-MenuBar-item:hover, .lm-MenuBar-item:hover { background: rgba(255,255,255,0.06) !important; }
.p-MenuBar-item.p-mod-active, .lm-MenuBar-item.lm-mod-active { background: rgba(255,255,255,0.1) !important; }
.p-MenuBar-item.p-mod-active .p-MenuBar-itemLabel, .lm-MenuBar-item.lm-mod-active .lm-MenuBar-itemLabel { color: #fff !important; }

/* Dropdowns */
.p-Menu, .lm-Menu { background: #0e0e0e !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 8px !important; box-shadow: 0 16px 48px rgba(0,0,0,0.8) !important; padding: 4px !important; }
.p-Menu-item, .lm-Menu-item { border-radius: 4px !important; padding: 6px 12px !important; }
.p-Menu-item:hover, .lm-Menu-item:hover { background: rgba(255,255,255,0.06) !important; }
.p-Menu-itemLabel, .lm-Menu-itemLabel { color: #e0e0e0 !important; font-size: 12px !important; }
.p-Menu-itemShortcut, .lm-Menu-itemShortcut { color: #555 !important; font-size: 10px !important; font-family: var(--79-mono) !important; }

/* ===== ACTIVITY BAR ===== */
.theia-app-sidebar-container, .p-TabBar.theia-app-sides, .lm-TabBar.theia-app-sides {
    background: #000 !important; border-right: 1px solid var(--79-border) !important; width: 48px !important;
}
.theia-app-sides .p-TabBar-tab, .theia-app-sides .lm-TabBar-tab {
    border-radius: 8px !important; width: 36px !important; height: 36px !important;
    margin: 4px auto !important; padding: 0 !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    background: transparent !important; border: none !important; position: relative !important;
    transition: background 0.15s !important;
}
.theia-app-sides .p-TabBar-tab:hover, .theia-app-sides .lm-TabBar-tab:hover {
    background: rgba(255,255,255,0.06) !important;
}
.theia-app-sides .p-TabBar-tab.p-mod-current, .theia-app-sides .lm-TabBar-tab.lm-mod-current {
    background: rgba(255,255,255,0.08) !important;
}
.theia-app-sides .p-TabBar-tab.p-mod-current::after, .theia-app-sides .lm-TabBar-tab.lm-mod-current::after {
    content: '' !important; position: absolute !important; left: -6px !important;
    top: 25% !important; bottom: 25% !important; width: 2px !important;
    background: #fff !important; border-radius: 1px !important;
}

/* Activity icons — white */
.theia-app-sides .codicon { color: #555 !important; font-size: 18px !important; transition: color 0.15s !important; }
.theia-app-sides .p-TabBar-tab:hover .codicon, .theia-app-sides .lm-TabBar-tab:hover .codicon { color: #aaa !important; }
.theia-app-sides .p-TabBar-tab.p-mod-current .codicon, .theia-app-sides .lm-TabBar-tab.lm-mod-current .codicon { color: #fff !important; }

/* ===== TABS ===== */
.p-TabBar:not(.theia-app-sides), .lm-TabBar:not(.theia-app-sides) {
    background: #080808 !important; border-bottom: 1px solid var(--79-border) !important;
    padding: 4px 8px 0 !important; min-height: 38px !important;
}
.p-TabBar-content, .lm-TabBar-content, .theia-tabBar-content,
#theia-main-content-panel > .p-TabBar, #theia-main-content-panel > .lm-TabBar,
.theia-app-main .p-TabBar, .theia-app-main .lm-TabBar { background: #080808 !important; }

.p-TabBar:not(.theia-app-sides) .p-TabBar-tab, .lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab {
    background: transparent !important; border: none !important;
    border-radius: 6px 6px 0 0 !important; padding: 5px 16px !important; position: relative !important;
}
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab:hover, .lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab:hover {
    background: rgba(255,255,255,0.03) !important;
}
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab.p-mod-current, .lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab.lm-mod-current {
    background: #0e0e0e !important;
}
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab.p-mod-current::after, .lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab.lm-mod-current::after {
    content: '' !important; position: absolute !important; bottom: 0 !important;
    left: 20% !important; right: 20% !important; height: 1px !important;
    background: #fff !important;
}
.p-TabBar-tabLabel, .lm-TabBar-tabLabel { font-size: 12px !important; color: #555 !important; }
.p-TabBar-tab.p-mod-current .p-TabBar-tabLabel, .lm-TabBar-tab.lm-mod-current .lm-TabBar-tabLabel {
    color: #fff !important; font-weight: 500 !important;
}

/* ===== EDITOR ===== */
.theia-editor .monaco-editor, .theia-editor .monaco-editor .margin,
.theia-editor .monaco-editor-background, .monaco-editor .inputarea.ime-input { background: #0e0e0e !important; }

/* ===== SIDE PANELS ===== */
#theia-left-side-panel, #theia-right-side-panel, .theia-side-panel { background: #080808 !important; }
.theia-sidepanel-toolbar { background: #080808 !important; border-bottom: 1px solid var(--79-border) !important; }

/* ===== FILE TREE ===== */
.theia-TreeContainer .theia-TreeNode { border-radius: 4px !important; margin: 1px 4px !important; }
.theia-TreeContainer .theia-TreeNode:hover { background: rgba(255,255,255,0.04) !important; }
.theia-TreeContainer .theia-TreeNode.theia-mod-selected { background: rgba(255,255,255,0.08) !important; }

/* ===== SCROLLBARS ===== */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }

/* ===== STATUS BAR ===== */
.theia-statusBar { background: #000 !important; border-top: 1px solid var(--79-border) !important; height: 24px !important; }
.theia-statusBar-entry { color: #555 !important; font-size: 11px !important; }

/* ===== INPUTS ===== */
.theia-input, .monaco-inputbox .input {
    background: #151515 !important; border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 6px !important; color: #fff !important;
}
.theia-input:focus, .monaco-inputbox.synthetic-focus .input {
    border-color: rgba(255,255,255,0.2) !important; box-shadow: 0 0 0 2px rgba(255,255,255,0.05) !important;
}

/* ===== BUTTONS ===== */
.theia-button { background: #fff !important; color: #000 !important; border: none !important; border-radius: 6px !important; font-weight: 600 !important; }
.theia-button:hover { background: #e0e0e0 !important; }
.theia-button.secondary { background: #1c1c1c !important; color: #fff !important; border: 1px solid rgba(255,255,255,0.1) !important; }

/* ===== TERMINAL ===== */
.terminal-wrapper, .xterm { background: #000 !important; }

/* ===== COMMAND PALETTE ===== */
.monaco-quick-input-widget { background: #0e0e0e !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 10px !important; box-shadow: 0 20px 60px rgba(0,0,0,0.8) !important; }

/* ===== AI CHAT ===== */
.theia-ChatView, .ai-chat-view, #ai-chat-view { background: #080808 !important; }

/* Hide default Theia welcome message, agent avatar, agent suggestions */
.theia-WelcomeMessage-Container-Inner { display: none !important; }
.theia-WelcomeMessage-Divider { display: none !important; }
.chat-agent-suggestions { display: none !important; }
.theia-AgentAvatar { display: none !important; }

/* Hide "Recent Chats" header in welcome */
.theia-ChatView h2, .theia-ChatView h3 { display: none !important; }

/* Replace with simple centered text */
.theia-WelcomeMessage-Container {
    display: flex !important; align-items: center !important; justify-content: center !important;
    height: 100% !important;
}
.theia-WelcomeMessage-Container::before {
    content: '79 AI' !important;
    font-size: 24px !important; font-weight: 700 !important; color: #333 !important;
    letter-spacing: 2px !important;
}

.p-DockPanel-handle, .lm-DockPanel-handle { background: var(--79-border) !important; }
::selection { background: rgba(255,255,255,0.15) !important; }

.theia-sidebar-menu .codicon-settings-gear { opacity: 0.3 !important; }
.theia-sidebar-menu .codicon-settings-gear:hover { opacity: 0.8 !important; }

/* ===== WELCOME PAGE ===== */
.welcome-page-root {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 100%; padding: 40px 20px;
    background: #000; overflow-y: auto; color: #fff; font-family: var(--79-font);
}
.welcome-logo { position: relative; margin-bottom: 12px; }
.welcome-logo-text {
    font-size: 96px; font-weight: 800; letter-spacing: -6px;
    color: #fff; -webkit-text-fill-color: #fff; user-select: none;
}
.welcome-logo-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
    pointer-events: none; z-index: -1;
}
.welcome-subtitle {
    font-size: 11px; color: #555; margin-bottom: 56px;
    letter-spacing: 6px; font-weight: 500; text-transform: uppercase;
}
.welcome-actions {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 12px; max-width: 480px; width: 100%; margin-bottom: 40px;
}
.welcome-action-card {
    display: flex; flex-direction: column; align-items: center;
    padding: 24px 12px; background: #0e0e0e;
    border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;
    cursor: pointer; transition: all 0.2s ease;
}
.welcome-action-card:hover {
    border-color: rgba(255,255,255,0.15); background: #151515;
    transform: translateY(-2px);
}
.welcome-action-icon {
    margin-bottom: 12px; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.04); border-radius: 10px;
}
.welcome-action-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
.welcome-action-desc { font-size: 10px; color: #555; text-align: center; }
.welcome-quickstart {
    max-width: 480px; width: 100%; background: #0e0e0e;
    border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px 28px;
}
.welcome-quickstart-title {
    font-size: 10px; font-weight: 600; color: #444;
    text-transform: uppercase; letter-spacing: 3px; margin-bottom: 14px;
}
.welcome-shortcut-list { list-style: none; padding: 0; margin: 0; }
.welcome-shortcut-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}
.welcome-shortcut-item:last-child { border-bottom: none; }
.welcome-shortcut-label { color: #888; font-size: 12px; }
.welcome-shortcut-key {
    font-family: var(--79-mono); font-size: 10px;
    padding: 2px 8px; background: #1c1c1c;
    border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; color: #aaa;
}
.welcome-footer { margin-top: 36px; font-size: 11px; color: #333; }
.welcome-footer-version { color: #888; font-weight: 600; }
`;

export function injectTheme(): void {
    if (document.getElementById('79-ide-theme')) {
        return;
    }
    const style = document.createElement('style');
    style.id = '79-ide-theme';
    style.textContent = THEME_CSS;
    document.head.appendChild(style);
}
