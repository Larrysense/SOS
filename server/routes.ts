import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { storage } from "./storage";
import { insertAgreementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Record agreement response
  app.post("/api/agreement", async (req: Request, res: Response) => {
    try {
      const validatedData = insertAgreementSchema.parse(req.body);
      const response = await storage.recordAgreement(validatedData);
      res.json(response);
    } catch (error) {
      console.error("Error recording agreement:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Admin-only route to get agreement statistics
  app.get("/api/admin/stats", async (req: Request, res: Response) => {
    try {
      // Simple admin check - in production you'd want proper authentication
      const adminKey = req.headers.authorization;
      if (adminKey !== "Bearer admin-key-2024") {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const stats = await storage.getAgreementStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Session data endpoint (optional, for analytics or backup)
  app.post('/api/session', (req, res) => {
    const { sessionData } = req.body;
    
    // In a real implementation, you might want to store this data
    // For now, we'll just acknowledge receipt
    console.log('Session completed:', {
      totalTime: sessionData.totalTime,
      answersCount: sessionData.answers?.length || 0,
      initialChoice: sessionData.initialChoice
    });

    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
