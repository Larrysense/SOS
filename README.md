# Sense of Self (SOS) - Interactive Journey

An immersive philosophical exploration inspired by Kafka's "A Report to an Academy" and Dostoevsky's "Dream of a Ridiculous Man." This interactive website guides users through a psychological questionnaire to discover their existential archetype.

## Features

- **Interactive Questionnaire**: 19 carefully crafted philosophical questions
- **Dynamic Archetypes**: Six unique personality types based on literary analysis
- **Gothic Aesthetic**: Custom typography and atmospheric design
- **Response Analytics**: Admin dashboard for tracking user interactions
- **Responsive Design**: Optimized for all devices

## Archetypes

### Kafka-Inspired
- **The Repressed Performer**: Trapped between authenticity and expectation
- **The Mimic Who Forgot**: Lost in imitation, seeking original self
- **The Escaped Still Caged**: Physically free but mentally imprisoned

### Dostoevsky-Inspired  
- **The Ridiculous Believer**: Finding meaning through perceived absurdity
- **The Wounded Prophet**: Bearing truth through personal suffering
- **The Dreamer Who Returned**: Bringing idealism back to reality

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Gothic theme
- **Backend**: Express.js with RESTful API
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite for fast development and optimization

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and logic
│   │   └── components/  # Reusable UI components
├── server/              # Backend Express application
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database operations
│   └── db.ts           # Database configuration
├── shared/              # Shared types and schemas
└── attached_assets/     # Static images and media
```

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```
4. Push database schema: `npm run db:push`
5. Start development server: `npm run dev`

## Admin Access

Navigate to `/admin` and use the admin key to view response analytics and user engagement metrics.

## Deployment

This application is configured for deployment on modern platforms like Vercel, with PostgreSQL hosting on services like Neon or PlanetScale.

## License

MIT License - See LICENSE file for details.

---

*"The system has recorded your journey..."*