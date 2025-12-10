# HR Workflow Designer Module

A professional, production-quality visual workflow designer for creating and testing HR processes. Built with React, TypeScript, and React Flow.

![HR Workflow Designer](https://lovable.dev/opengraph-image-p98pqg.png)

## Features

### Core Functionality
- **Visual Canvas**: Drag-and-drop workflow design with React Flow
- **Custom Nodes**: 5 specialized node types for HR workflows
- **Real-time Editing**: Click any node to configure its properties
- **Workflow Validation**: Validates workflow structure before testing
- **Simulation Engine**: Test your workflow with mock execution

### Node Types

| Node | Purpose | Configuration |
|------|---------|---------------|
| **Start** | Entry point of workflow | Title, metadata key-value pairs |
| **Task** | Manual work items | Title, description, assignee, due date, custom fields |
| **Approval** | Requires sign-off | Approver role (Manager/HRBP/Director), auto-approve threshold |
| **Automated** | System actions | Action selection from API, dynamic parameters |
| **End** | Workflow completion | End message, summary toggle |

## Project Structure

```
src/
├── api/
│   └── mockApi.ts           # Mock API for automations & simulation
├── components/
│   ├── NodeConfigPanel.tsx  # Right panel for editing nodes
│   ├── NodePalette.tsx      # Draggable node items
│   ├── Sidebar.tsx          # Left sidebar with actions
│   ├── SimulationPanel.tsx  # Workflow testing dialog
│   └── WorkflowCanvas.tsx   # React Flow canvas
├── context/
│   └── WorkflowContext.tsx  # Global workflow state management
├── forms/
│   ├── StartNodeForm.tsx    # Start node configuration
│   ├── TaskNodeForm.tsx     # Task node configuration
│   ├── ApprovalNodeForm.tsx # Approval node configuration
│   ├── AutomatedNodeForm.tsx# Automated step configuration
│   └── EndNodeForm.tsx      # End node configuration
├── hooks/
│   ├── useAutomations.ts    # Fetch automation actions
│   └── useSimulation.ts     # Run workflow simulation
├── nodes/
│   ├── StartNode.tsx        # Start node component
│   ├── TaskNode.tsx         # Task node component
│   ├── ApprovalNode.tsx     # Approval node component
│   ├── AutomatedNode.tsx    # Automated node component
│   └── EndNode.tsx          # End node component
├── types/
│   └── workflow.ts          # TypeScript definitions
└── pages/
    └── Index.tsx            # Main application page
```

## Design Decisions

### Architecture
- **Context-based State**: Single WorkflowContext provides all workflow state and actions
- **Modular Components**: Each node type has its own component and form
- **Type Safety**: Full TypeScript with strict typing for all workflow data
- **Separation of Concerns**: API, UI, and state logic are cleanly separated

### UI/UX
- **Professional Aesthetic**: Enterprise-grade design with clear visual hierarchy
- **Color-coded Nodes**: Each node type has a distinct color for quick identification
- **Responsive Layout**: Three-column layout with sidebar, canvas, and config panel
- **Accessibility**: Proper labels, focus states, and keyboard navigation

### Mock API
- `GET /automations` - Returns available automation actions with parameters
- `POST /simulate` - Accepts workflow JSON and returns execution log

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Drag nodes** from the left sidebar onto the canvas
2. **Connect nodes** by dragging from output handle to input handle
3. **Click a node** to configure its properties in the right panel
4. **Test workflow** using the "Test Workflow" button
5. **Export/Import** workflows as JSON files

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **@xyflow/react** - Flow diagram library
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Query** - Data fetching
- **Zod** - Schema validation
