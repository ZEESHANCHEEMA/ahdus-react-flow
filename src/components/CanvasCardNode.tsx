"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

const CanvasCardNode = ({ data, selected }: NodeProps) => {
  const label = (data?.label as string) ?? "Card";

  return (
    <div
      className="group relative min-w-[200px] rounded-xl border-2 bg-white shadow-md transition-shadow dark:bg-[var(--bg-secondary)] dark:border-[var(--border-light)]"
      style={{
        boxShadow: selected
          ? "0 0 0 2px var(--accent-primary)"
          : "var(--shadow-sm)",
      }}
    >
      {/* Left handle: input only (connect FROM another card's right) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!absolute !left-[-8px] !top-1/2 !-translate-y-1/2 !h-3.5 !w-3.5 !border-[3px] !border-[#007aff] !bg-white !rounded-full !opacity-0 hover:!opacity-100 focus:!opacity-100 group-hover:!opacity-100"
        style={{ left: -8 }}
      />
      {/* Right handle: output only (connect TO another card's left) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!absolute !right-[-8px] !top-1/2 !-translate-y-1/2 !h-3.5 !w-3.5 !border-[3px] !border-[#007aff] !bg-white !rounded-full !opacity-0 hover:!opacity-100 focus:!opacity-100 group-hover:!opacity-100"
        style={{ right: -8 }}
      />

      <div className="group px-4 py-3">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </div>
        <div className="mt-1 text-xs text-[var(--text-secondary)]">
          Drag handles to connect
        </div>
      </div>
    </div>
  );
};

export default memo(CanvasCardNode);
