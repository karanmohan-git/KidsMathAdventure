import { pgTable, text, serial, integer, boolean, date, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for future progress tracking
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatarColor: text("avatar_color").notNull(),
});

// Progress tracking for each module
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  module: text("module").notNull(), // 'python', 'algebra', 'geometry'
  level: integer("level").notNull().default(1),
  lessonsCompleted: integer("lessons_completed").notNull().default(0),
  exercisesCompleted: integer("exercises_completed").notNull().default(0),
  lastActivity: date("last_activity").notNull(),
  customData: json("custom_data").notNull(), // Specific data for each module
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatarColor: true,
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  module: true,
  level: true,
  lessonsCompleted: true,
  exercisesCompleted: true,
  lastActivity: true,
  customData: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progress.$inferSelect;
