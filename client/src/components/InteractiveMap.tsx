import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Target } from "lucide-react";
import type { UserLocation } from "@/pages/application";
import type { Zone } from "@shared/schema";

interface InteractiveMapProps {
  userLocation: UserLocation;
  zones: Zone[];
  isLoading: boolean;
}

export default function InteractiveMap({ userLocation, zones, isLoading }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    drawMap();
  }, [userLocation, zones, zoom, offset, isLoading]);

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

    // Draw zones with enhanced styling
    zones.forEach(zone => {
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      />
      
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
      </div>
    </div>
  );
}
