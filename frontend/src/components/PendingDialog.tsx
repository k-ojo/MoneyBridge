import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface PendingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PendingDialog = ({ isOpen, onOpenChange }: PendingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Processing Transfer
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Please wait while we process your transfer request...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments for security verification.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PendingDialog;