import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Wifi, Phone, Route, Share, Navigation } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import ZoneCard from "./ZoneCard";
import type { UserLocation, NetworkInfo } from "@/pages/application";
import type { Zone } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userLocation: UserLocation;
  networkInfo: NetworkInfo | null;
  sessionId: string;
  zones: Zone[];
}

export default function Dashboard({ userLocation, networkInfo, sessionId, zones }: DashboardProps) {
  const { toast } = useToast();
  const isLoading = false;
  const error = null;

  const dangerZones = zones?.filter(zone => zone.type === 'danger') || [];
  const safeZones = zones?.filter(zone => zone.type === 'safe') || [];
  
  const isInDangerZone = dangerZones.some(zone => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      zone.latitude,
      zone.longitude
    );
    return distance <= zone.radius;
  });

  const currentStatus = isInDangerZone ? 'DANGER' : 'SAFE';
  const statusColor = isInDangerZone ? 'text-danger' : 'text-safe';
  const statusBgColor = isInDangerZone ? 'bg-danger' : 'bg-safe';

  const handleEmergencyCall = () => {
    window.open('tel:100', '_self');
  };

  const handleFindSafeRoute = () => {
    const nearestSafeZone = safeZones[0];
    if (nearestSafeZone) {
      const url = `https://maps.google.com/maps?daddr=${nearestSafeZone.latitude},${nearestSafeZone.longitude}`;
      window.open(url, '_blank');
    } else {
      toast({
        title: "No Safe Zone Found",
        description: "No safe zones found in your area. Please contact emergency services.",
        variant: "destructive",
      });
    }
  };

  const handleShareLocation = () => {
    const shareData = {
      title: 'SafeZone Location',
      text: `I'm at ${userLocation.latitude}, ${userLocation.longitude}. Status: ${currentStatus}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.text);
      toast({
        title: "Location Copied",
        description: "Your location has been copied to clipboard.",
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-danger">Error loading zone data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Current Status</h3>
              <div className={`${statusBgColor} text-white rounded-2xl p-3 shadow-lg`}>
                <Shield className="text-xl" />
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${statusColor} mb-3`}>
                {currentStatus}
              </div>
              <p className="text-gray-600 text-lg">
                {isInDangerZone 
                  ? "You are in a danger zone. Please move to safety." 
                  : "Your current location is in a safe zone"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Location</h3>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-3 shadow-lg">
                <MapPin className="text-xl" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Coordinates</div>
              <div className="font-mono text-lg font-semibold text-gray-900">
                {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
              </div>
              <div className="text-sm text-gray-500 mt-3 bg-gray-100 rounded-full px-3 py-1">
                Accuracy: ±{userLocation.accuracy.toFixed(0)}m
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Network Info</h3>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-3 shadow-lg">
                <Wifi className="text-xl" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-3">
                {networkInfo?.effectiveType || '4G'}
              </div>
              <div className="text-sm text-gray-600">
                {networkInfo?.downlink ? `${networkInfo.downlink} Mbps` : 'N/A'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">Interactive Zone Map</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-green-50 px-3 py-2 rounded-full">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-sm font-medium text-green-700">Safe Zone</span>
              </div>
              <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-sm font-medium text-yellow-700">Caution Zone</span>
              </div>
              <div className="flex items-center bg-red-50 px-3 py-2 rounded-full">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2 shadow-sm"></div>
                <span className="text-sm font-medium text-red-700">Danger Zone</span>
              </div>
            </div>
          </div>
          
          <InteractiveMap 
            userLocation={userLocation}
            zones={zones || []}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Zone Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZoneCard 
          title="Nearby Danger Zones"
          zones={dangerZones}
          userLocation={userLocation}
          type="danger"
        />
        <ZoneCard 
          title="Nearby Safe Zones"
          zones={safeZones}
          userLocation={userLocation}
          type="safe"
        />
      </div>

      {/* Emergency Actions */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-red-50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Emergency Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button 
              onClick={handleEmergencyCall}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-3" size={20} />
              Call 100
            </Button>
            <Button 
              onClick={handleFindSafeRoute}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Navigation className="mr-3" size={20} />
              Find Safe Route
            </Button>
            <Button 
              onClick={handleShareLocation}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Share className="mr-3" size={20} />
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
