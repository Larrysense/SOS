import { users, agreementResponses, type User, type InsertUser, type InsertAgreement, type AgreementResponse } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  recordAgreement(agreement: InsertAgreement): Promise<AgreementResponse>;
  getAgreementStats(): Promise<{ archetype: string; yesCount: number; noCount: number; }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async recordAgreement(agreement: InsertAgreement): Promise<AgreementResponse> {
    const [response] = await db
      .insert(agreementResponses)
      .values(agreement)
      .returning();
    return response;
  }

  async getAgreementStats(): Promise<{ archetype: string; yesCount: number; noCount: number; }[]> {
    const stats = await db
      .select({
        archetype: agreementResponses.archetype,
        yesCount: sql<number>`count(case when ${agreementResponses.agreed} = true then 1 end)`,
        noCount: sql<number>`count(case when ${agreementResponses.agreed} = false then 1 end)`,
      })
      .from(agreementResponses)
      .groupBy(agreementResponses.archetype);
    
    return stats;
  }
}

export const storage = new DatabaseStorage();
