import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const agreementResponses = pgTable("agreement_responses", {
  id: serial("id").primaryKey(),
  archetype: text("archetype").notNull(),
  agreed: boolean("agreed").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAgreementSchema = createInsertSchema(agreementResponses).pick({
  archetype: true,
  agreed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAgreement = z.infer<typeof insertAgreementSchema>;
export type AgreementResponse = typeof agreementResponses.$inferSelect;
