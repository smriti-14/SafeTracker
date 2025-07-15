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
      
      // Save user location to backend
      await fetch('/api/user-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          latitude: location.latitude,
          longitude: location.longitude,
          networkType: networkInfo?.effectiveType || 'unknown',
          networkSpeed: networkInfo?.downlink || 0,
        }),
      });
      
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
    <div className="min-h-screen bg-gray-50">
      {/* Application Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="text-primary text-2xl mr-3" />
              <h1 className="text-xl font-bold text-gray-900">SafeZone</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Network status indicator */}
              {networkInfo && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Network:</span>
                  <span className="text-sm font-medium text-safe">
                    {networkInfo.effectiveType || '4G'}
                  </span>
                  <Wifi className="text-safe" size={16} />
                </div>
              )}
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="text-gray-600 hover:text-primary"
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
