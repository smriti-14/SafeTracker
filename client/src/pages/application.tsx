import { useState, useEffect } from "react";
import { Shield, ArrowLeft, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import LocationPermission from "@/components/LocationPermission";
import LoadingState from "@/components/LoadingState";
import Dashboard from "@/components/Dashboard";
import { getCurrentLocation } from "@/lib/geolocation";
import { getNetworkInfo } from "@/lib/network";
import { useToast } from "@/hooks/use-toast";
import type { Zone } from "@shared/schema";

export type ApplicationState = 'permission' | 'loading' | 'dashboard' | 'error';

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

// Mock zones data for frontend-only version
const mockZones: Zone[] = [
  {
    id: 1,
    name: "Flood Zone - Yamuna River",
    type: "danger",
    latitude: 28.6139,
    longitude: 77.2090,
    radius: 1500,
    description: "Heavy monsoon rainfall causing river flooding",
    severity: "high",
    capacity: null,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 2,
    name: "Landslide Risk - Himachal Hills",
    type: "danger",
    latitude: 28.6448,
    longitude: 77.2167,
    radius: 800,
    description: "Unstable slope due to recent rainfall",
    severity: "medium",
    capacity: null,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 3,
    name: "Community Center - Central Delhi",
    type: "safe",
    latitude: 28.6129,
    longitude: 77.2295,
    radius: 300,
    description: "Emergency shelter with medical supplies",
    severity: null,
    capacity: 500,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 4,
    name: "Raj Ghat Park",
    type: "safe",
    latitude: 28.6417,
    longitude: 77.2486,
    radius: 600,
    description: "Large open space, safe from flooding",
    severity: null,
    capacity: 1500,
    isActive: true,
    lastUpdated: new Date(),
  },
];

export default function Application() {
  const [, setLocation] = useLocation();
  const [state, setState] = useState<ApplicationState>('permission');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const { toast } = useToast();

  useEffect(() => {
    // Get network info immediately
    const netInfo = getNetworkInfo();
    setNetworkInfo(netInfo);
  }, []);

  const handleRequestLocation = async () => {
    setState('loading');
    
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState('dashboard');
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location Error",
        description: "Failed to get your location. Please try again.",
        variant: "destructive",
      });
      setState('error');
    }
  };

  const handleGoBack = () => {
    setLocation('/');
  };

  const renderContent = () => {
    switch (state) {
      case 'permission':
        return <LocationPermission onRequestLocation={handleRequestLocation} />;
      case 'loading':
        return <LoadingState />;
      case 'dashboard':
        return userLocation ? (
          <Dashboard 
            userLocation={userLocation} 
            networkInfo={networkInfo} 
            sessionId={sessionId}
            zones={mockZones}
          />
        ) : null;
      case 'error':
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-danger bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-danger text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Access Failed</h2>
              <p className="text-gray-600 mb-6">
                We couldn't access your location. Please check your browser permissions and try again.
              </p>
              <Button 
                onClick={handleRequestLocation}
                className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full mb-4"
              >
                Try Again
              </Button>
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="w-full"
              >
                Go Back
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Application Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl mr-4">
                <Shield className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">SafeZone</h1>
            </div>
            <div className="flex items-center space-x-6">
              {/* Network status indicator */}
              {networkInfo && (
                <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-sm text-gray-600">Network:</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {networkInfo.effectiveType || '4G'}
                  </span>
                  <Wifi className="text-blue-500" size={16} />
                </div>
              )}
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-6"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
