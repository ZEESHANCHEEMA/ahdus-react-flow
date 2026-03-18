"use client";

import { memo } from "react";

export type SidebarAction =
  | "document"
  | "text"
  | "block"
  | "group"
  | "salesforce"
  | "run"
  | "fitView"
  | "settings";

type SidebarProps = {
  onAction: (action: SidebarAction) => void;
};

const iconClass =
  "h-6 w-6 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus:text-[var(--text-primary)]";

const buttonClass =
  "flex w-full items-center justify-center rounded-lg p-3 transition-colors hover:bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-inset";

const Sidebar = memo(function Sidebar({ onAction }: SidebarProps) {
  return (
    <aside
      className="flex w-16 flex-shrink-0 flex-col items-center rounded-r-2xl border-r border-[var(--border-light)] bg-[var(--bg-secondary)] py-4 shadow-sm"
      aria-label="Tool sidebar"
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("document")}
        aria-label="Add document"
        title="Add document"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("text")}
        aria-label="Add text"
        title="Add text"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 4v3h5.5v12h3V7H19V4H5z" />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("block")}
        aria-label="Add block"
        title="Add block"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      </button>

      <div className="my-1 w-8 border-t border-[var(--border-light)]" role="separator" />

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("group")}
        aria-label="Add group"
        title="Add group"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v8l4-2" />
          <path d="M12 2L8 4v8l4 2 4-2V4l-4-2z" />
          <path d="M12 14v8l4-2" />
          <path d="M12 14l-4 2v8l4 2 4-2v-8l-4-2z" />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("salesforce")}
        aria-label="Salesforce"
        title="Salesforce"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#00a1e0] text-[10px] font-bold leading-none text-white">
          SF
        </span>
      </button>

      <div className="my-1 w-8 border-t border-[var(--border-light)]" role="separator" />

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("run")}
        aria-label="Run workflow"
        title="Run workflow"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("fitView")}
        aria-label="Fit view"
        title="Fit view"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h2v2H3V6z" />
          <path d="M19 6h2v2h-2V6z" />
          <path d="M3 16h2v2H3v-2z" />
          <path d="M19 16h2v2h-2v-2z" />
          <rect x="5" y="5" width="14" height="14" rx="1" />
        </svg>
      </button>

      <div className="my-1 w-8 border-t border-[var(--border-light)]" role="separator" />

      <button
        type="button"
        className={buttonClass}
        onClick={() => onAction("settings")}
        aria-label="Settings"
        title="Settings"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </aside>
  );
});

export default Sidebar;
