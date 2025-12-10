import { Trash2, Download, Upload, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { NodePalette } from './NodePalette';
import { SimulationPanel } from './SimulationPanel';
import { useWorkflow } from '@/context/WorkflowContext';
import { toast } from '@/hooks/use-toast';

export function Sidebar() {
  const { nodes, edges, clearWorkflow } = useWorkflow();

  const handleExport = () => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Workflow exported',
      description: 'Your workflow has been downloaded as JSON.',
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const workflow = JSON.parse(content);
          // For now, just show a toast - full import would require context method
          toast({
            title: 'Import feature',
            description: 'Workflow import is available in the full version.',
          });
        } catch {
          toast({
            title: 'Import failed',
            description: 'Invalid workflow file format.',
            variant: 'destructive',
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="w-64 bg-sidebar flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-foreground">
          HR Workflow
        </h1>
        <p className="text-xs text-sidebar-foreground/60 mt-0.5">
          Designer Module
        </p>
      </div>

      {/* Node Palette */}
      <ScrollArea className="flex-1 p-4">
        <NodePalette />

        <Separator className="my-6 bg-sidebar-border" />

        {/* Workflow Stats */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-1">
            Current Workflow
          </h3>
          <div className="p-3 bg-sidebar-accent/50 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-foreground/80">Nodes</span>
              <span className="font-medium text-sidebar-foreground">{nodes.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-foreground/80">Connections</span>
              <span className="font-medium text-sidebar-foreground">{edges.length}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-sidebar-border" />

        {/* Actions */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-1">
            Actions
          </h3>
          <div className="space-y-2">
            <SimulationPanel />
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              Import JSON
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground hover:text-destructive hover:border-destructive/50"
              onClick={clearWorkflow}
              disabled={nodes.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Clear Canvas
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
          <Info className="w-3.5 h-3.5" />
          <span>Drag nodes to canvas</span>
        </div>
      </div>
    </div>
  );
}
