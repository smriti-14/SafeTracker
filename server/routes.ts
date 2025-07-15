import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserLocationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all zones
  app.get("/api/zones", async (req, res) => {
    try {
      const zones = await storage.getAllZones();
      res.json(zones);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch zones" });
    }
  });

  // Get zones by location
  app.get("/api/zones/nearby", async (req, res) => {
    try {
      const { latitude, longitude, radius } = req.query;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
      }

      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);
      const searchRadius = radius ? parseFloat(radius as string) : 10000; // Default 10km

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: "Invalid latitude or longitude" });
      }

      const zones = await storage.getZonesByLocation(lat, lon, searchRadius);
      res.json(zones);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch nearby zones" });
    }
  });

  // Save user location
  app.post("/api/user-location", async (req, res) => {
    try {
      const validatedData = insertUserLocationSchema.parse(req.body);
      const userLocation = await storage.saveUserLocation(validatedData);
      res.json(userLocation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to save user location" });
      }
    }
  });

  // Get user location
  app.get("/api/user-location/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const userLocation = await storage.getUserLocation(sessionId);
      
      if (!userLocation) {
        return res.status(404).json({ error: "User location not found" });
      }

      res.json(userLocation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user location" });
    }
  });

  // Create new zone (for admin purposes)
  app.post("/api/zones", async (req, res) => {
    try {
      const zone = await storage.createZone(req.body);
      res.json(zone);
    } catch (error) {
      res.status(500).json({ error: "Failed to create zone" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
