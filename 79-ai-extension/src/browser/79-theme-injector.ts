export const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
    --79-accent: #7c3aed;
    --79-accent-light: #a78bfa;
    --79-accent-dark: #5b21b6;
    --79-accent-glow: rgba(124, 58, 237, 0.25);
    --79-neon: #22d3ee;
    --79-bg-deepest: #07070d;
    --79-bg-deep: #0c0c16;
    --79-bg-base: #101020;
    --79-bg-surface: #16162a;
    --79-bg-elevated: #1e1e3a;
    --79-bg-hover: #28284a;
    --79-text-primary: #e8ecf4;
    --79-text-secondary: #8b93a8;
    --79-text-muted: #555e73;
    --79-border: rgba(124, 58, 237, 0.12);
    --79-font: 'Inter', sans-serif;
    --79-mono: 'JetBrains Mono', monospace;
}

body, .theia-ApplicationShell, .p-Widget, .p-TabBar, .p-MenuBar, .p-Menu,
.theia-TreeContainer, .theia-input, input, select, textarea, button {
    font-family: var(--79-font) !important;
    -webkit-font-smoothing: antialiased !important;
}
.monaco-editor, .monaco-editor .view-lines, .xterm, .terminal-wrapper {
    font-family: var(--79-mono) !important;
}
body, .theia-ApplicationShell {
    background-color: var(--79-bg-deepest) !important;
}

/* ===== TOP MENU BAR ===== */
#theia-top-panel { background: #07070d !important; border-bottom: 1px solid rgba(124,58,237,0.12) !important; }

.p-MenuBar, .lm-MenuBar { background: #07070d !important; height: 42px !important; padding-left: 12px !important; }
.p-MenuBar::before, .lm-MenuBar::before {
    content: '79' !important; font-size: 18px !important; font-weight: 800 !important;
    background: linear-gradient(135deg, #7c3aed, #22d3ee) !important;
    -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
    margin-right: 20px !important; letter-spacing: -1px !important;
}

.p-MenuBar-item, .lm-MenuBar-item { color: #8b93a8 !important; background: transparent !important; font-size: 12px !important; font-weight: 500 !important; border-radius: 6px !important; padding: 4px 12px !important; margin: 0 1px !important; }
.p-MenuBar-itemLabel, .lm-MenuBar-itemLabel { color: #8b93a8 !important; }
.p-MenuBar-item:hover, .lm-MenuBar-item:hover { background: rgba(124,58,237,0.25) !important; }
.p-MenuBar-item:hover .p-MenuBar-itemLabel, .lm-MenuBar-item:hover .lm-MenuBar-itemLabel { color: #e8ecf4 !important; }
.p-MenuBar-item.p-mod-active, .lm-MenuBar-item.lm-mod-active { background: #7c3aed !important; }
.p-MenuBar-item.p-mod-active .p-MenuBar-itemLabel, .lm-MenuBar-item.lm-mod-active .lm-MenuBar-itemLabel { color: #fff !important; }

/* Dropdowns */
.p-Menu, .lm-Menu { background: rgba(16,16,32,0.97) !important; border: 1px solid rgba(124,58,237,0.2) !important; border-radius: 12px !important; box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important; padding: 6px !important; }
.p-Menu-item, .lm-Menu-item { border-radius: 8px !important; padding: 7px 14px !important; }
.p-Menu-item:hover, .lm-Menu-item:hover { background: rgba(124,58,237,0.25) !important; }
.p-Menu-itemLabel, .lm-Menu-itemLabel { color: #e8ecf4 !important; font-size: 12.5px !important; }
.p-Menu-itemShortcut, .lm-Menu-itemShortcut { color: #555e73 !important; font-size: 10.5px !important; }

/* ============================================
   ACTIVITY BAR — Круглые иконки вместо квадратов
   ============================================ */
.theia-app-sidebar-container,
.p-TabBar.theia-app-sides,
.lm-TabBar.theia-app-sides {
    background: var(--79-bg-deepest) !important;
    border-right: 1px solid var(--79-border) !important;
    width: 56px !important;
}

.theia-app-sides .p-TabBar-tab,
.theia-app-sides .lm-TabBar-tab {
    border-radius: 50% !important;
    width: 40px !important;
    height: 40px !important;
    margin: 5px auto !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1) !important;
    border: none !important;
    border-left: none !important;
    position: relative !important;
    background: transparent !important;
}

.theia-app-sides .p-TabBar-tab:hover,
.theia-app-sides .lm-TabBar-tab:hover {
    background: var(--79-accent-glow) !important;
    transform: scale(1.1) !important;
}

.theia-app-sides .p-TabBar-tab.p-mod-current,
.theia-app-sides .lm-TabBar-tab.lm-mod-current {
    background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(34,211,238,0.15)) !important;
    box-shadow: 0 0 20px rgba(124,58,237,0.2) !important;
}

/* Точка-индикатор под активной иконкой */
.theia-app-sides .p-TabBar-tab.p-mod-current::after,
.theia-app-sides .lm-TabBar-tab.lm-mod-current::after {
    content: '' !important;
    position: absolute !important;
    bottom: -3px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 5px !important;
    height: 5px !important;
    background: var(--79-neon) !important;
    border-radius: 50% !important;
    box-shadow: 0 0 8px var(--79-neon) !important;
}

/* Icon size — p- и lm- prefixes для совместимости */
.p-TabBar.theia-app-sides .p-TabBar-tabIcon,
.lm-TabBar.theia-app-sides .lm-TabBar-tabIcon,
.theia-app-sides .p-TabBar-tabIcon,
.theia-app-sides .lm-TabBar-tabIcon {
    font-size: 20px !important;
}

/* ===== COLORED ACTIVITY ICONS ===== */
/* Files — голубая */
.theia-app-sides .codicon-files {
    color: #60a5fa !important;
    filter: drop-shadow(0 0 6px rgba(96,165,250,0.5)) !important;
}
/* Search — розовая */
.theia-app-sides .codicon-search {
    color: #f472b6 !important;
    filter: drop-shadow(0 0 6px rgba(244,114,182,0.5)) !important;
}
/* Git — зелёная */
.theia-app-sides .codicon-source-control,
.theia-app-sides .codicon-git-merge,
.theia-app-sides .codicon-repo-forked {
    color: #34d399 !important;
    filter: drop-shadow(0 0 6px rgba(52,211,153,0.5)) !important;
}
/* Debug — оранжевая */
.theia-app-sides .codicon-debug-alt,
.theia-app-sides .codicon-debug,
.theia-app-sides .codicon-bug {
    color: #fb923c !important;
    filter: drop-shadow(0 0 6px rgba(251,146,60,0.5)) !important;
}
/* Extensions/Test — фиолетовая */
.theia-app-sides .codicon-extensions,
.theia-app-sides .codicon-beaker {
    color: #c084fc !important;
    filter: drop-shadow(0 0 6px rgba(192,132,252,0.5)) !important;
}
/* AI Chat — бирюзовая */
.theia-app-sides .codicon-comment-discussion,
.theia-app-sides .codicon-hubot,
.theia-app-sides .codicon-robot {
    color: #22d3ee !important;
    filter: drop-shadow(0 0 6px rgba(34,211,238,0.5)) !important;
}

/* Fallback для всех codicon в sidebar */
.theia-app-sides .codicon {
    transition: all 0.25s ease !important;
    font-size: 20px !important;
}

/* Hover эффект — увеличение + яркость */
.theia-app-sides .p-TabBar-tab:hover .codicon,
.theia-app-sides .lm-TabBar-tab:hover .codicon {
    filter: brightness(1.4) drop-shadow(0 0 10px currentColor) !important;
    transform: scale(1.2) !important;
}

/* Active — подсвечен */
.theia-app-sides .p-TabBar-tab.p-mod-current .codicon,
.theia-app-sides .lm-TabBar-tab.lm-mod-current .codicon {
    filter: brightness(1.3) drop-shadow(0 0 8px currentColor) !important;
}

/* ===== TABS ===== */
.p-TabBar:not(.theia-app-sides),
.lm-TabBar:not(.theia-app-sides) {
    background: #0c0c16 !important;
    background-color: #0c0c16 !important;
    border-bottom: 1px solid rgba(124,58,237,0.12) !important;
    padding: 6px 8px 0 !important;
    min-height: 40px !important;
}
/* Убить любой серый фон у контейнера табов */
.theia-tabBar-content, .p-TabBar-content, .lm-TabBar-content,
#theia-main-content-panel > .p-TabBar,
#theia-main-content-panel > .lm-TabBar,
.theia-app-main .p-TabBar,
.theia-app-main .lm-TabBar {
    background: #0c0c16 !important;
    background-color: #0c0c16 !important;
}

.p-TabBar:not(.theia-app-sides) .p-TabBar-tab,
.lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab {
    background: transparent !important;
    border: none !important;
    border-radius: 10px 10px 0 0 !important;
    padding: 6px 18px !important;
    margin: 0 2px !important;
    transition: all 0.15s ease !important;
    position: relative !important;
}
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab:hover,
.lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab:hover {
    background: rgba(124,58,237,0.08) !important;
}
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab.p-mod-current,
.lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab.lm-mod-current {
    background: #101020 !important;
}
/* Gradient underline */
.p-TabBar:not(.theia-app-sides) .p-TabBar-tab.p-mod-current::after,
.lm-TabBar:not(.theia-app-sides) .lm-TabBar-tab.lm-mod-current::after {
    content: '' !important; position: absolute !important; bottom: 0 !important;
    left: 10% !important; right: 10% !important; height: 2px !important;
    background: linear-gradient(90deg, #7c3aed, #22d3ee) !important;
    border-radius: 2px 2px 0 0 !important;
}

.p-TabBar-tabLabel, .lm-TabBar-tabLabel {
    font-size: 12px !important; font-weight: 400 !important; color: #555e73 !important;
}
.p-TabBar-tab.p-mod-current .p-TabBar-tabLabel,
.lm-TabBar-tab.lm-mod-current .lm-TabBar-tabLabel {
    color: var(--79-text-primary) !important;
    font-weight: 500 !important;
}

/* ============================================
   EDITOR
   ============================================ */
.theia-editor .monaco-editor,
.theia-editor .monaco-editor .margin,
.theia-editor .monaco-editor-background,
.monaco-editor .inputarea.ime-input {
    background-color: var(--79-bg-base) !important;
}

/* ============================================
   SIDE PANELS
   ============================================ */
#theia-left-side-panel, #theia-right-side-panel, .theia-side-panel {
    background: var(--79-bg-deep) !important;
}

/* Заголовки панелей */
.theia-sidepanel-toolbar {
    background: var(--79-bg-deep) !important;
    border-bottom: 1px solid var(--79-border) !important;
    height: 36px !important;
}

/* ============================================
   FILE TREE
   ============================================ */
.theia-TreeContainer .theia-TreeNode {
    border-radius: 8px !important;
    margin: 1px 6px !important;
    transition: background 0.12s ease !important;
}
.theia-TreeContainer .theia-TreeNode:hover {
    background: var(--79-bg-hover) !important;
}
.theia-TreeContainer .theia-TreeNode.theia-mod-selected {
    background: linear-gradient(90deg, var(--79-accent-glow), transparent) !important;
}
.theia-TreeNodeSegment { font-size: 12.5px !important; }

/* ============================================
   SCROLLBARS — Super тонкие
   ============================================ */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.15); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(124,58,237,0.35); }

/* ============================================
   STATUS BAR — Минимальный
   ============================================ */
.theia-statusBar {
    background: var(--79-bg-deepest) !important;
    border-top: 1px solid var(--79-border) !important;
    height: 26px !important;
}
.theia-statusBar-entry {
    color: var(--79-text-muted) !important;
    font-size: 11px !important;
}

/* ============================================
   INPUTS
   ============================================ */
.theia-input, .monaco-inputbox .input {
    background: var(--79-bg-surface) !important;
    border: 1px solid var(--79-border) !important;
    border-radius: 8px !important;
    color: var(--79-text-primary) !important;
    font-size: 12.5px !important;
}
.theia-input:focus, .monaco-inputbox.synthetic-focus .input {
    border-color: var(--79-accent) !important;
    box-shadow: 0 0 0 3px var(--79-accent-glow) !important;
}

/* ============================================
   BUTTONS
   ============================================ */
.theia-button {
    background: linear-gradient(135deg, var(--79-accent), #6d28d9) !important;
    color: white !important; border: none !important;
    border-radius: 8px !important; font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(124,58,237,0.3) !important;
}
.theia-button:hover {
    box-shadow: 0 4px 16px rgba(124,58,237,0.4) !important;
    transform: translateY(-1px) !important;
}

/* ============================================
   COMMAND PALETTE
   ============================================ */
.monaco-quick-input-widget {
    background: rgba(16,16,32,0.97) !important;
    border: 1px solid rgba(124,58,237,0.2) !important;
    border-radius: 16px !important;
    box-shadow: 0 24px 80px rgba(0,0,0,0.7) !important;
    overflow: hidden !important;
}

/* ============================================
   TERMINAL
   ============================================ */
.terminal-wrapper, .xterm { background-color: var(--79-bg-deepest) !important; }

/* ===== AI CHAT ===== */
.theia-ChatView, .ai-chat-view, #ai-chat-view {
    background: #0c0c16 !important;
}

/* Chat input area styling */
.theia-ChatInput, .chat-input-widget {
    background: #16162a !important;
    border: 1px solid rgba(124,58,237,0.15) !important;
    border-radius: 10px !important;
}

/* Model selector in chat — make it visible */
.theia-ChatView select, .ai-chat-view select,
.chat-model-selector, .model-selector {
    background: #16162a !important;
    color: #a78bfa !important;
    border: 1px solid rgba(124,58,237,0.2) !important;
    border-radius: 6px !important;
    padding: 4px 8px !important;
    font-size: 11px !important;
    font-family: 'JetBrains Mono', monospace !important;
}

.p-DockPanel-handle, .lm-DockPanel-handle { background: rgba(124,58,237,0.08) !important; }
::selection { background: rgba(124, 58, 237, 0.35) !important; }

/* ===== SETTINGS GEAR ===== */
.theia-sidebar-menu .codicon-settings-gear { opacity: 0.4 !important; }

/* ===== GIT WIDGET ===== */
#79-git-quick { background: #0c0c16 !important; }

/* ============================================
   WELCOME PAGE
   ============================================ */
.welcome-page-root {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 100%; padding: 40px 20px;
    background:
        radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.03) 0%, transparent 40%),
        var(--79-bg-deepest);
    overflow-y: auto; color: var(--79-text-primary); font-family: var(--79-font);
}
.welcome-logo { position: relative; margin-bottom: 8px; }
.welcome-logo-text {
    font-size: 88px; font-weight: 800; letter-spacing: -5px;
    background: linear-gradient(135deg, #7c3aed 0%, #22d3ee 60%, #a78bfa 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; user-select: none;
    filter: drop-shadow(0 0 40px rgba(124,58,237,0.3));
}
.welcome-logo-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(34,211,238,0.05) 40%, transparent 70%);
    pointer-events: none; z-index: -1;
    animation: pulse79 4s ease-in-out infinite;
}
@keyframes pulse79 {
    0%, 100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
}
.welcome-subtitle {
    font-size: 12px; color: var(--79-text-muted); margin-bottom: 56px;
    letter-spacing: 5px; font-weight: 500; text-transform: uppercase;
}
.welcome-actions {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 14px; max-width: 520px; width: 100%; margin-bottom: 44px;
}
.welcome-action-card {
    display: flex; flex-direction: column; align-items: center;
    padding: 28px 14px;
    background: rgba(22,22,42,0.5);
    border: 1px solid var(--79-border);
    border-radius: 16px;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}
.welcome-action-card:hover {
    border-color: rgba(124,58,237,0.4);
    background: rgba(30,30,58,0.8);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(124,58,237,0.15);
}
.welcome-action-icon {
    margin-bottom: 14px; width: 50px; height: 50px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(34,211,238,0.08));
    border-radius: 14px;
}
.welcome-action-title { font-size: 13px; font-weight: 600; color: var(--79-text-primary); margin-bottom: 4px; }
.welcome-action-desc { font-size: 11px; color: var(--79-text-muted); text-align: center; }
.welcome-quickstart {
    max-width: 520px; width: 100%;
    background: rgba(22,22,42,0.4);
    border: 1px solid var(--79-border);
    border-radius: 16px; padding: 24px 32px;
}
.welcome-quickstart-title {
    font-size: 10px; font-weight: 600; color: var(--79-text-muted);
    text-transform: uppercase; letter-spacing: 3px; margin-bottom: 18px;
}
.welcome-shortcut-list { list-style: none; padding: 0; margin: 0; }
.welcome-shortcut-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid rgba(124,58,237,0.06);
}
.welcome-shortcut-item:last-child { border-bottom: none; }
.welcome-shortcut-label { color: var(--79-text-secondary); font-size: 12.5px; }
.welcome-shortcut-key {
    font-family: var(--79-mono); font-size: 10px;
    padding: 3px 10px;
    background: rgba(124,58,237,0.08);
    border: 1px solid rgba(124,58,237,0.12);
    border-radius: 6px; color: var(--79-accent-light);
}
.welcome-footer { margin-top: 40px; font-size: 11px; color: var(--79-text-muted); }
.welcome-footer-version { color: var(--79-neon); font-weight: 600; }
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
