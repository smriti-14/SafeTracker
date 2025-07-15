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

    // Draw background
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i <= canvas.height; i += 50) {
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

    // Draw zones
    zones.forEach(zone => {
      const zoneX = centerX + (zone.longitude - userLocation.longitude) * 10000;
      const zoneY = centerY - (zone.latitude - userLocation.latitude) * 10000;
      const radius = Math.max(zone.radius / 100, 10); // Scale radius for display

      // Zone circle
      ctx.beginPath();
      ctx.arc(zoneX, zoneY, radius, 0, 2 * Math.PI);
      
      if (zone.type === 'danger') {
        ctx.fillStyle = zone.severity === 'high' ? '#DC2626' : '#EF4444';
      } else {
        ctx.fillStyle = '#059669';
      }
      
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Zone border
      ctx.strokeStyle = zone.type === 'danger' ? '#DC2626' : '#059669';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Zone label
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, zoneX, zoneY - radius - 5);
    });

    // Draw user location
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = '#1E40AF';
    ctx.fill();
    
    // User location border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    // User location label
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You are here', centerX, centerY - 20);

    // Accuracy circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, userLocation.accuracy / 10, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

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
        className="w-full h-96 bg-gray-100 rounded-lg border map-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomIn}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <Plus size={16} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomOut}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <Minus size={16} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCenterOnUser}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <Target size={16} />
        </Button>
      </div>
    </div>
  );
}
