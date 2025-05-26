
import { Lock } from "lucide-react";

export const SecurityFeatures = () => {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <Lock className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-green-800">
            Your data is protected
          </p>
          <p className="text-xs text-green-700 mt-1">
            Your credentials are encrypted and never stored in plain text. We use the same security standards as major banks.
          </p>
        </div>
      </div>
    </div>
  );
};
