import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "lucide-react";

interface LocationPermissionProps {
  onRequestLocation: () => void;
}

export default function LocationPermission({ onRequestLocation }: LocationPermissionProps) {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Navigation className="text-primary text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Access Required</h2>
          <p className="text-gray-600 mb-6">
            To provide you with accurate danger zone and safe zone information, we need access to your current location.
          </p>
          <Button 
            onClick={onRequestLocation}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full mb-4"
          >
            <Navigation className="mr-2" size={16} />
            Allow Location Access
          </Button>
          <p className="text-sm text-gray-500">
            Your location data is processed securely and never stored permanently.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
