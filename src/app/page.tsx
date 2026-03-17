"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  MarkerType,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CanvasCardNode from "@/components/CanvasCardNode";

const nodeTypes = { canvasCard: CanvasCardNode };

const initialNodes: Node[] = [
  {
    id: "1",
    type: "canvasCard",
    position: { x: 100, y: 100 },
    data: { label: "Sticky / Input" },
  },
  {
    id: "2",
    type: "canvasCard",
    position: { x: 420, y: 100 },
    data: { label: "AI Action" },
  },
  {
    id: "3",
    type: "canvasCard",
    position: { x: 260, y: 280 },
    data: { label: "Another card" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandleId: "right",
    targetHandleId: "left",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--edge-stroke, #007aff)", strokeWidth: 3 },
  },
];

export default function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { stroke: "var(--edge-stroke, #007aff)", strokeWidth: 3 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const isValidConnection = useCallback((connection: Connection) => {
    if (!connection.sourceHandle || !connection.targetHandle) return false;
    return connection.sourceHandle === "right" && connection.targetHandle === "left";
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col bg-[var(--bg-canvas)]">
      {/* Top toolbar - Ahdus style */}
      <header
        className="flex h-20 flex-shrink-0 items-center justify-between border-b border-[var(--border-light)] bg-[var(--toolbar-bg)] px-6 shadow-sm"
        style={{ minHeight: 80 }}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Ähdus – React Flow
          </h1>
        </div>
        <div className="text-sm text-[var(--text-secondary)]">
          Connect right → left • Drag to move
        </div>
      </header>

      {/* React Flow canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-ahdus"
          minZoom={0.2}
          maxZoom={2}
          defaultEdgeOptions={{
            markerEnd: { type: MarkerType.ArrowClosed },
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
  );
}
