import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
