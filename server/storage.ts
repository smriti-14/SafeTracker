import { zones, userLocations, type Zone, type InsertZone, type UserLocation, type InsertUserLocation } from "@shared/schema";

export interface IStorage {
  // Zone operations
  getAllZones(): Promise<Zone[]>;
  getZonesByLocation(latitude: number, longitude: number, radius: number): Promise<Zone[]>;
  createZone(zone: InsertZone): Promise<Zone>;
  updateZone(id: number, zone: Partial<InsertZone>): Promise<Zone | undefined>;
  deleteZone(id: number): Promise<boolean>;
  
  // User location operations
  saveUserLocation(location: InsertUserLocation): Promise<UserLocation>;
  getUserLocation(sessionId: string): Promise<UserLocation | undefined>;
}

export class MemStorage implements IStorage {
  private zones: Map<number, Zone>;
  private userLocations: Map<string, UserLocation>;
  private currentZoneId: number;
  private currentLocationId: number;

  constructor() {
    this.zones = new Map();
    this.userLocations = new Map();
    this.currentZoneId = 1;
    this.currentLocationId = 1;
    
    // Initialize with some sample zones
    this.initializeSampleZones();
  }

  private initializeSampleZones() {
    // Sample danger zones
    const dangerZones: InsertZone[] = [
      {
        name: "Flood Zone - Mission District",
        type: "danger",
        latitude: 37.7599,
        longitude: -122.4148,
        radius: 1000,
        description: "Heavy rainfall causing street flooding",
        severity: "high",
        isActive: true,
      },
      {
        name: "Landslide Risk - Twin Peaks",
        type: "danger",
        latitude: 37.7544,
        longitude: -122.4477,
        radius: 800,
        description: "Unstable slope due to recent rainfall",
        severity: "medium",
        isActive: true,
      },
      {
        name: "Earthquake Risk Zone - Financial District",
        type: "danger",
        latitude: 37.7946,
        longitude: -122.4045,
        radius: 1200,
        description: "Building damage from recent seismic activity",
        severity: "high",
        isActive: true,
      },
    ];

    // Sample safe zones
    const safeZones: InsertZone[] = [
      {
        name: "Community Center - SOMA",
        type: "safe",
        latitude: 37.7849,
        longitude: -122.4094,
        radius: 200,
        description: "Emergency shelter with supplies",
        capacity: 200,
        isActive: true,
      },
      {
        name: "Golden Gate Park",
        type: "safe",
        latitude: 37.7694,
        longitude: -122.4862,
        radius: 500,
        description: "Large open space, safe from flooding",
        capacity: 1000,
        isActive: true,
      },
      {
        name: "Marina Green",
        type: "safe",
        latitude: 37.8053,
        longitude: -122.4423,
        radius: 300,
        description: "Open area evacuation point",
        capacity: 500,
        isActive: true,
      },
    ];

    // Add all zones
    [...dangerZones, ...safeZones].forEach(zone => {
      const newZone: Zone = {
        ...zone,
        id: this.currentZoneId++,
        lastUpdated: new Date(),
      };
      this.zones.set(newZone.id, newZone);
    });
  }

  async getAllZones(): Promise<Zone[]> {
    return Array.from(this.zones.values()).filter(zone => zone.isActive);
  }

  async getZonesByLocation(latitude: number, longitude: number, radius: number): Promise<Zone[]> {
    const zones = Array.from(this.zones.values()).filter(zone => zone.isActive);
    
    return zones.filter(zone => {
      const distance = this.calculateDistance(latitude, longitude, zone.latitude, zone.longitude);
      return distance <= radius;
    });
  }

  async createZone(insertZone: InsertZone): Promise<Zone> {
    const zone: Zone = {
      ...insertZone,
      id: this.currentZoneId++,
      lastUpdated: new Date(),
    };
    this.zones.set(zone.id, zone);
    return zone;
  }

  async updateZone(id: number, updateData: Partial<InsertZone>): Promise<Zone | undefined> {
    const zone = this.zones.get(id);
    if (!zone) return undefined;

    const updatedZone: Zone = {
      ...zone,
      ...updateData,
      lastUpdated: new Date(),
    };
    this.zones.set(id, updatedZone);
    return updatedZone;
  }

  async deleteZone(id: number): Promise<boolean> {
    return this.zones.delete(id);
  }

  async saveUserLocation(location: InsertUserLocation): Promise<UserLocation> {
    const userLocation: UserLocation = {
      ...location,
      id: this.currentLocationId++,
      timestamp: new Date(),
    };
    this.userLocations.set(location.sessionId, userLocation);
    return userLocation;
  }

  async getUserLocation(sessionId: string): Promise<UserLocation | undefined> {
    return this.userLocations.get(sessionId);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }
}

export const storage = new MemStorage();
