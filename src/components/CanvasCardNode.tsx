"use client";

import { memo, useCallback } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";

const PLACEHOLDERS: Record<string, string> = {
  Document: "Start typing...",
  Text: "Type something...",
  Block: "Add note...",
  Group: "Group description...",
};

const CanvasCardNode = ({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  const label = (data?.label as string) ?? "Card";
  const content = (data?.content as string) ?? "";
  const placeholder = PLACEHOLDERS[label] ?? "Write here...";

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, content: value } } : n
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div
      className="group relative flex min-h-[120px] min-w-[220px] flex-col rounded-xl border-2 bg-white shadow-md transition-shadow dark:bg-[var(--bg-secondary)] dark:border-[var(--border-light)]"
      style={{
        boxShadow: selected
          ? "0 0 0 2px var(--accent-primary)"
          : "var(--shadow-sm)",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!absolute !left-[-8px] !top-1/2 !-translate-y-1/2 !h-3.5 !w-3.5 !border-[3px] !border-[#007aff] !bg-white !rounded-full !opacity-0 hover:!opacity-100 focus:!opacity-100 group-hover:!opacity-100"
        style={{ left: -8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!absolute !right-[-8px] !top-1/2 !-translate-y-1/2 !h-3.5 !w-3.5 !border-[3px] !border-[#007aff] !bg-white !rounded-full !opacity-0 hover:!opacity-100 focus:!opacity-100 group-hover:!opacity-100"
        style={{ right: -8 }}
      />

      {/* Card header - drag handle (no nodrag) */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--border-light)] px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {label}
        </span>
      </div>

      {/* Editable content - nodrag so typing doesn't move node */}
      <div className="nodrag flex flex-1 flex-col overflow-hidden p-2">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
          className="min-h-[80px] w-full flex-1 resize-none border-none bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          rows={3}
          aria-label={`Content for ${label}`}
        />
      </div>
    </div>
  );
};

export default memo(CanvasCardNode);
