import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, MapPin, Shield, Lock } from "lucide-react";

interface LocationPermissionProps {
  onRequestLocation: () => void;
}

export default function LocationPermission({ onRequestLocation }: LocationPermissionProps) {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Navigation className="text-white text-3xl" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Location Access Required
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            To provide you with accurate danger zone and safe zone information using advanced geolocation technology, we need access to your current location.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="text-blue-500" size={20} />
              <span className="text-sm">Precise location tracking</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Shield className="text-green-500" size={20} />
              <span className="text-sm">Real-time safety alerts</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Lock className="text-purple-500" size={20} />
              <span className="text-sm">Secure & private</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Navigation className="text-orange-500" size={20} />
              <span className="text-sm">Emergency navigation</span>
            </div>
          </div>
          
          <Button 
            onClick={onRequestLocation}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg w-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Navigation className="mr-3" size={20} />
            Allow Location Access
          </Button>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700 flex items-center justify-center">
              <Lock className="mr-2" size={16} />
              Your location data is processed securely and never stored permanently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
