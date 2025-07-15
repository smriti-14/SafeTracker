import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, Clock, Users, MapPin } from "lucide-react";
import type { Zone } from "@shared/schema";
import type { UserLocation } from "@/pages/application";

interface ZoneCardProps {
  title: string;
  zones: Zone[];
  userLocation: UserLocation;
  type: 'danger' | 'safe';
}

export default function ZoneCard({ title, zones, userLocation, type }: ZoneCardProps) {
  const Icon = type === 'danger' ? AlertTriangle : Shield;
  const iconColor = type === 'danger' ? 'text-danger' : 'text-safe';
  const bgColor = type === 'danger' ? 'bg-danger' : 'bg-safe';
  const borderColor = type === 'danger' ? 'border-danger' : 'border-safe';
  const bgOpacity = type === 'danger' ? 'bg-red-50' : 'bg-green-50';

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${Math.round(distance)}m away`;
    } else {
      return `${(distance / 1000).toFixed(1)}km away`;
    }
  };

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className={`${bgColor} text-white rounded-full p-2`}>
            <Icon className="text-sm" />
          </div>
        </div>
        
        <div className="space-y-3">
          {zones.length === 0 ? (
            <div className="text-center py-8">
              <Icon className={`mx-auto mb-4 ${iconColor}`} size={48} />
              <p className="text-gray-500">
                No {type === 'danger' ? 'danger' : 'safe'} zones found in your area
              </p>
            </div>
          ) : (
            zones.map((zone) => {
              const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                zone.latitude,
                zone.longitude
              );

              return (
                <div key={zone.id} className={`border ${borderColor} border-opacity-20 rounded-lg p-4 ${bgOpacity}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${iconColor}`}>{zone.name}</span>
                    <span className="text-sm text-gray-600">{formatDistance(distance)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="mr-1" size={12} />
                      <span>Updated {getTimeAgo(new Date(zone.lastUpdated))}</span>
                    </div>
                    {type === 'safe' && zone.capacity && (
                      <div className="flex items-center">
                        <Users className="mr-1" size={12} />
                        <span>Capacity: {zone.capacity}</span>
                      </div>
                    )}
                    {type === 'danger' && zone.severity && (
                      <div className="flex items-center">
                        <AlertTriangle className="mr-1" size={12} />
                        <span className="capitalize">{zone.severity} risk</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
