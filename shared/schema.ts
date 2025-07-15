import { pgTable, text, serial, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const zones = pgTable("zones", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'danger' or 'safe'
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  radius: real("radius").notNull(), // in meters
  description: text("description"),
  severity: text("severity"), // 'low', 'medium', 'high' for danger zones
  capacity: real("capacity"), // for safe zones
  isActive: boolean("is_active").default(true),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const userLocations = pgTable("user_locations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  networkType: text("network_type"),
  networkSpeed: real("network_speed"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertZoneSchema = createInsertSchema(zones).omit({
  id: true,
  lastUpdated: true,
});

export const insertUserLocationSchema = createInsertSchema(userLocations).omit({
  id: true,
  timestamp: true,
});

export type InsertZone = z.infer<typeof insertZoneSchema>;
export type Zone = typeof zones.$inferSelect;
export type InsertUserLocation = z.infer<typeof insertUserLocationSchema>;
export type UserLocation = typeof userLocations.$inferSelect;
