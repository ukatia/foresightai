# Emergency Action Planner Backend

AI-powered emergency response planning using Amazon Nova.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure AWS credentials:
```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

3. Run the server:
```bash
python -m uvicorn app.main:app --reload
```

## API Endpoints

### POST /analyze
Analyze emergency situation and generate action plan.

**Request:**
```json
{
  "location": "Home, Seattle",
  "situation": "Kitchen fire in oven",
  "photo_description": "Small flames visible in oven"
}
```

**Response:**
```json
{
  "risk_level": "HIGH",
  "risk_summary": "Active fire requires immediate action...",
  "action_plan": [
    {
      "step_number": 1,
      "action": "Turn off oven immediately",
      "priority": "CRITICAL",
      "time_estimate": "Immediate"
    }
  ],
  "calm_message": "Stay calm. Follow these steps carefully.",
  "additional_resources": ["911", "Fire Department"]
}
```
