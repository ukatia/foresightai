# Emergency Action Planner Frontend

Next.js frontend for AI-powered emergency response planning.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## User Flow

1. **Enter Emergency Details**
   - Location (where you are)
   - Situation description
   - Optional photo context

2. **Get Action Plan**
   - Risk level assessment
   - Step-by-step safety instructions
   - Calm, reassuring guidance
   - Emergency resources

## Features

- Clean, focused UI for emergency situations
- Color-coded risk levels (LOW/MODERATE/HIGH/CRITICAL)
- Priority-based action steps
- Calming messages to reduce panic
- Emergency contact resources

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
