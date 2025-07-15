import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2, MapPin, Wifi, Shield } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-12 text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="text-blue-600 text-2xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Analyzing Your Location</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Processing your coordinates and network information using advanced APIs...
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center">
                  <MapPin className="text-blue-500 mr-3" size={20} />
                  <span className="font-medium text-gray-700">Getting coordinates...</span>
                </div>
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={16} />
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Wifi className="text-purple-500 mr-3" size={20} />
                  <span className="font-medium text-gray-700">Analyzing network...</span>
                </div>
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={16} />
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Shield className="text-orange-500 mr-3" size={20} />
                  <span className="font-medium text-gray-700">Loading zone data...</span>
                </div>
                <div className="bg-blue-100 rounded-full p-1">
                  <Loader2 className="animate-spin text-blue-600" size={16} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            This may take a few moments depending on your network speed
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
