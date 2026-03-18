"use client";

import { memo } from "react";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

const SettingsModal = memo(function SettingsModal({ open, onClose }: SettingsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="settings-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--border-light)] bg-[var(--toolbar-bg)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="settings-title" className="text-lg font-semibold text-[var(--text-primary)]">
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            aria-label="Close settings"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Configure API keys, theme, and preferences here.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

export default SettingsModal;
