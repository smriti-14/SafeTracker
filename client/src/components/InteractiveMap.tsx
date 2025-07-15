import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Target, MapPin, AlertTriangle, Shield, Navigation2 } from "lucide-react";
import type { UserLocation } from "@/pages/application";
import type { Zone } from "@shared/schema";

interface InteractiveMapProps {
  userLocation: UserLocation;
  zones: Zone[];
  isLoading: boolean;
}

interface HoveredZone {
  zone: Zone;
  distance: number;
  x: number;
  y: number;
}

export default function InteractiveMap({ userLocation, zones, isLoading }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredZone, setHoveredZone] = useState<HoveredZone | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [dynamicZones, setDynamicZones] = useState<Zone[]>([]);

  // Generate dynamic zones based on user location
  const generateDynamicZones = useCallback(() => {
    const newZones: Zone[] = [];
    const baseId = 1000;
    
    // Generate zones around user location
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * 2 * Math.PI;
      const distance = 0.005 + Math.random() * 0.01; // Random distance
      const lat = userLocation.latitude + Math.cos(angle) * distance;
      const lng = userLocation.longitude + Math.sin(angle) * distance;
      
      const isNearbySafe = Math.random() > 0.4; // 60% chance of safe zone
      
      newZones.push({
        id: baseId + i,
        name: isNearbySafe ? 
          `Safe Zone ${String.fromCharCode(65 + i)}` : 
          `Alert Zone ${String.fromCharCode(65 + i)}`,
        type: isNearbySafe ? 'safe' : 'danger',
        latitude: lat,
        longitude: lng,
        radius: 200 + Math.random() * 400,
        description: isNearbySafe ? 
          'Community gathering point with emergency supplies' : 
          'Potential hazard area - exercise caution',
        severity: isNearbySafe ? null : (Math.random() > 0.5 ? 'high' : 'medium'),
        capacity: isNearbySafe ? Math.floor(100 + Math.random() * 500) : null,
        isActive: true,
        lastUpdated: new Date(),
      });
    }
    
    setDynamicZones(newZones);
  }, [userLocation]);

  useEffect(() => {
    generateDynamicZones();
  }, [generateDynamicZones]);

  useEffect(() => {
    drawMap();
  }, [userLocation, zones, dynamicZones, zoom, offset, isLoading]);

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and offset
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#F0F9FF');
    gradient.addColorStop(1, '#E0F2FE');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle grid
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= canvas.width; i += 40) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i <= canvas.height; i += 40) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    if (isLoading) {
      // Show loading indicator
      ctx.fillStyle = '#6B7280';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Loading zones...', canvas.width / 2, canvas.height / 2);
      ctx.restore();
      return;
    }

    // Calculate center point based on user location
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw zones with enhanced styling (both original and dynamic)
    const allZones = [...zones, ...dynamicZones];
    
    allZones.forEach(zone => {
      const zoneX = centerX + (zone.longitude - userLocation.longitude) * 10000;
      const zoneY = centerY - (zone.latitude - userLocation.latitude) * 10000;
      const radius = Math.max(zone.radius / 80, 15); // Scale radius for display

      // Zone circle with gradient and shadow
      ctx.beginPath();
      ctx.arc(zoneX, zoneY, radius, 0, 2 * Math.PI);
      
      // Create gradient for zones
      const zoneGradient = ctx.createRadialGradient(zoneX, zoneY, 0, zoneX, zoneY, radius);
      if (zone.type === 'danger') {
        if (zone.severity === 'high') {
          zoneGradient.addColorStop(0, '#FCA5A5');
          zoneGradient.addColorStop(1, '#DC2626');
        } else {
          zoneGradient.addColorStop(0, '#FBBF24');
          zoneGradient.addColorStop(1, '#F59E0B');
        }
      } else {
        zoneGradient.addColorStop(0, '#86EFAC');
        zoneGradient.addColorStop(1, '#059669');
      }
      
      ctx.fillStyle = zoneGradient;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Zone border with enhanced styling
      ctx.strokeStyle = zone.type === 'danger' ? '#DC2626' : '#059669';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Zone label with background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(zoneX - 60, zoneY - radius - 25, 120, 20);
      
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, zoneX, zoneY - radius - 10);
    });

    // Draw user location with enhanced styling
    // Accuracy circle (behind user marker)
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.max(userLocation.accuracy / 8, 20), 0, 2 * Math.PI);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // User location with pulsing effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, 2 * Math.PI);
    
    // Create gradient for user location
    const userGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    userGradient.addColorStop(0, '#60A5FA');
    userGradient.addColorStop(1, '#1E40AF');
    ctx.fillStyle = userGradient;
    ctx.fill();
    
    // User location border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.stroke();

    // User location label with background
    ctx.fillStyle = 'rgba(30, 64, 175, 0.9)';
    ctx.fillRect(centerX - 50, centerY - 40, 100, 25);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You are here', centerX, centerY - 22);

    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else {
      // Check if hovering over a zone
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const allZones = [...zones, ...dynamicZones];
      
      let foundZone: HoveredZone | null = null;
      
      for (const zone of allZones) {
        const zoneX = centerX + (zone.longitude - userLocation.longitude) * 10000 + offset.x;
        const zoneY = centerY - (zone.latitude - userLocation.latitude) * 10000 + offset.y;
        const radius = Math.max(zone.radius / 80, 15) * zoom;
        
        const distance = Math.sqrt((x - zoneX) ** 2 + (y - zoneY) ** 2);
        
        if (distance <= radius) {
          const realDistance = calculateDistance(
            userLocation.latitude, userLocation.longitude,
            zone.latitude, zone.longitude
          );
          
          foundZone = {
            zone,
            distance: realDistance,
            x: zoneX,
            y: zoneY
          };
          break;
        }
      }
      
      setHoveredZone(foundZone);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (hoveredZone) {
      setSelectedZone(hoveredZone.zone);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleCenterOnUser = () => {
    setOffset({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-200 map-canvas shadow-inner"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      />
      
      {/* Zone hover tooltip */}
      {hoveredZone && (
        <div 
          className="absolute z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-blue-200 max-w-xs"
          style={{
            left: Math.min(mousePosition.x + 10, 600),
            top: Math.max(mousePosition.y - 10, 10),
          }}
        >
          <div className="flex items-center mb-2">
            {hoveredZone.zone.type === 'safe' ? (
              <Shield className="text-green-600 mr-2" size={16} />
            ) : (
              <AlertTriangle className="text-red-600 mr-2" size={16} />
            )}
            <h3 className="font-semibold text-gray-800">{hoveredZone.zone.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{hoveredZone.zone.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Distance: {hoveredZone.distance.toFixed(1)} km</span>
            {hoveredZone.zone.capacity && (
              <span>Capacity: {hoveredZone.zone.capacity}</span>
            )}
          </div>
        </div>
      )}
      
      {/* Selected zone details */}
      {selectedZone && (
        <div className="absolute top-4 left-4 z-20">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {selectedZone.type === 'safe' ? (
                    <Shield className="text-green-600 mr-2" size={20} />
                  ) : (
                    <AlertTriangle className="text-red-600 mr-2" size={20} />
                  )}
                  <h3 className="font-bold text-gray-800">{selectedZone.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedZone(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{selectedZone.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className={`font-medium ${selectedZone.type === 'safe' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedZone.type === 'safe' ? 'Safe Zone' : 'Danger Zone'}
                  </span>
                </div>
                
                {selectedZone.severity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Severity:</span>
                    <span className={`font-medium ${selectedZone.severity === 'high' ? 'text-red-600' : 'text-orange-600'}`}>
                      {selectedZone.severity.charAt(0).toUpperCase() + selectedZone.severity.slice(1)}
                    </span>
                  </div>
                )}
                
                {selectedZone.capacity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-medium text-blue-600">{selectedZone.capacity} people</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Radius:</span>
                  <span className="font-medium text-gray-700">{selectedZone.radius}m</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (selectedZone.type === 'safe') {
                      window.open(`https://maps.google.com?q=${selectedZone.latitude},${selectedZone.longitude}`, '_blank');
                    }
                  }}
                >
                  <Navigation2 className="mr-2" size={14} />
                  {selectedZone.type === 'safe' ? 'Navigate Here' : 'Avoid Area'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute top-6 right-6 space-y-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-blue-200 hover:border-blue-300 rounded-full p-3 transition-all duration-200"
        >
          <Plus size={18} className="text-blue-600" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-blue-200 hover:border-blue-300 rounded-full p-3 transition-all duration-200"
        >
          <Minus size={18} className="text-blue-600" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCenterOnUser}
          className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-blue-200 hover:border-blue-300 rounded-full p-3 transition-all duration-200"
        >
          <Target size={18} className="text-blue-600" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={generateDynamicZones}
          className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white border-blue-200 hover:border-blue-300 rounded-full p-3 transition-all duration-200"
          title="Generate new zone suggestions"
        >
          <MapPin size={18} className="text-purple-600" />
        </Button>
      </div>
      
      {/* Dynamic zone info */}
      <div className="absolute bottom-6 left-6">
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <MapPin className="text-purple-600 mr-2" size={16} />
              <h4 className="font-semibold text-gray-800">Dynamic Zones</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {dynamicZones.length} zones generated around your location
            </p>
            <div className="flex space-x-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {dynamicZones.filter(z => z.type === 'safe').length} Safe
              </span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                {dynamicZones.filter(z => z.type === 'danger').length} Danger
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
