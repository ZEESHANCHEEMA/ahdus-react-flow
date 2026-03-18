"use client";

import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CanvasCardNode from "@/components/CanvasCardNode";
import Sidebar, { type SidebarAction } from "@/components/Sidebar";
import SettingsModal from "@/components/SettingsModal";

const nodeTypes = { canvasCard: CanvasCardNode };

const initialNodes: Node[] = [
  { id: "1", type: "canvasCard", position: { x: 100, y: 100 }, data: { label: "Card", content: "" } },
];

const initialEdges: Edge[] = [];

type CardKind = "document" | "text" | "block" | "group";

const CARD_LABELS: Record<CardKind, string> = {
  document: "Document",
  text: "Text",
  block: "Block",
  group: "Group",
};

function CanvasContent() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nextIdRef = useRef(2);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const addCard = useCallback(
    (kind: CardKind) => {
      const id = String(nextIdRef.current++);
      const offset = nodes.length * 50;
      setNodes((nds) =>
        nds.concat({
          id,
          type: "canvasCard",
          position: { x: 150 + (offset % 400), y: 120 + Math.floor(offset / 400) * 80 },
          data: { label: CARD_LABELS[kind], content: "" },
        })
      );
    },
    [nodes.length, setNodes]
  );

  const handleSidebarAction = useCallback(
    (action: SidebarAction) => {
      switch (action) {
        case "document":
          addCard("document");
          break;
        case "text":
          addCard("text");
          break;
        case "block":
          addCard("block");
          break;
        case "group":
          addCard("group");
          break;
        case "salesforce":
          alert("Salesforce integration — connect your Salesforce account here.");
          break;
        case "run":
          fitView({ duration: 200 });
          alert("Run workflow — execute connected nodes (placeholder).");
          break;
        case "fitView":
          fitView({ duration: 300 });
          break;
        case "settings":
          setSettingsOpen(true);
          break;
      }
    },
    [addCard, fitView]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: "url(#edge-arrow-flush)",
            style: { stroke: "var(--edge-stroke, #007aff)", strokeWidth: 3 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const isValidConnection = useCallback(
    (edge: Connection | Edge) => {
      const src = "sourceHandle" in edge ? edge.sourceHandle : null;
      const tgt = "targetHandle" in edge ? edge.targetHandle : null;
      if (src == null || tgt == null) return false;
      return src === "right" && tgt === "left";
    },
    []
  );

  return (
    <div className="flex h-screen w-screen flex-col bg-[var(--bg-canvas)]">
      <div className="flex flex-1 min-h-0">
        <Sidebar onAction={handleSidebarAction} />

        <div className="flex flex-1 flex-col min-w-0">
          <header
            className="flex h-20 flex-shrink-0 items-center justify-between border-b border-[var(--border-light)] bg-[var(--toolbar-bg)] px-6 shadow-sm"
            style={{ minHeight: 80 }}
          >
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              Ähdus – React Flow
            </h1>
            <span className="text-sm text-[var(--text-secondary)]">
              Connect right → left • Drag to move
            </span>
          </header>

          <div className="flex-1 min-h-0 relative">
            {/* Custom arrow marker: refX=0 so path meets arrow tail with no gap */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <defs>
                <marker
                  id="edge-arrow-flush"
                  markerWidth="10"
                  markerHeight="7"
                  refX="0"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--edge-stroke, #007aff)" />
                </marker>
              </defs>
            </svg>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              isValidConnection={isValidConnection}
              nodeTypes={nodeTypes}
              noDragClassName="nodrag"
              fitView
              className="react-flow-ahdus"
              minZoom={0.2}
              maxZoom={2}
              defaultEdgeOptions={{
                markerEnd: "url(#edge-arrow-flush)",
                style: { stroke: "var(--edge-stroke, #007aff)", strokeWidth: 3 },
              }}
            >
              <Background gap={20} size={1} className="!bg-[var(--bg-canvas)]" />
              <Controls className="!border-[var(--border-light)] !bg-[var(--toolbar-bg)]" />
              <MiniMap
                className="!bg-[var(--bg-secondary)] !border-[var(--border-light)]"
                nodeColor="var(--accent-primary)"
              />
            </ReactFlow>
          </div>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default function CanvasPage() {
  return (
    <ReactFlowProvider>
      <CanvasContent />
    </ReactFlowProvider>
  );
}
