import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4">
            <Loader2 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Location</h2>
          <p className="text-gray-600 mb-4">
            Processing your coordinates and network information...
          </p>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between items-center">
                <span>Getting coordinates...</span>
                <Check className="text-safe" size={16} />
              </div>
              <div className="flex justify-between items-center">
                <span>Analyzing network...</span>
                <Check className="text-safe" size={16} />
              </div>
              <div className="flex justify-between items-center">
                <span>Loading zone data...</span>
                <Loader2 className="animate-spin text-primary" size={16} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
