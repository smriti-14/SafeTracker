import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Wifi, Phone, Route, Share } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import ZoneCard from "./ZoneCard";
import type { UserLocation, NetworkInfo } from "@/pages/application";
import type { Zone } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userLocation: UserLocation;
  networkInfo: NetworkInfo | null;
  sessionId: string;
}

export default function Dashboard({ userLocation, networkInfo, sessionId }: DashboardProps) {
  const { toast } = useToast();

  const { data: zones, isLoading, error } = useQuery<Zone[]>({
    queryKey: ['/api/zones/nearby', userLocation.latitude, userLocation.longitude],
    queryFn: async () => {
      const response = await fetch(
        `/api/zones/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius=10000`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch zones');
      }
      return response.json();
    },
  });

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
    window.open('tel:911', '_self');
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Status</h3>
              <div className={`${statusBgColor} text-white rounded-full p-2`}>
                <Shield className="text-lg" />
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${statusColor} mb-2`}>
                {currentStatus}
              </div>
              <p className="text-gray-600">
                {isInDangerZone 
                  ? "You are in a danger zone. Please move to safety." 
                  : "Your current location is in a safe zone"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Location</h3>
              <div className="bg-primary text-white rounded-full p-2">
                <MapPin className="text-lg" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Coordinates</div>
              <div className="font-mono text-sm">
                {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Accuracy: ±{userLocation.accuracy.toFixed(0)}m
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Network Info</h3>
              <div className="bg-accent text-white rounded-full p-2">
                <Wifi className="text-lg" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">
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
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Zone Map</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-safe rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Safe Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-warning rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Caution Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-danger rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Danger Zone</span>
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
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleEmergencyCall}
              className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              <Phone className="mr-2" size={16} />
              Call 911
            </Button>
            <Button 
              onClick={handleFindSafeRoute}
              className="bg-warning hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              <Route className="mr-2" size={16} />
              Find Safe Route
            </Button>
            <Button 
              onClick={handleShareLocation}
              className="bg-accent hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              <Share className="mr-2" size={16} />
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
