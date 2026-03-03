# 🚨 Emergency Action Planner

AI-powered emergency response planning using Amazon Nova. Get structured, step-by-step safety guidance in critical moments.

![Built with Amazon Nova](https://img.shields.io/badge/Built%20with-Amazon%20Nova-FF9900?style=for-the-badge&logo=amazon-aws)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)

## 🎯 What It Does

Emergency Action Planner analyzes emergency situations and generates:
- **Risk Level Assessment** (LOW/MODERATE/HIGH/CRITICAL)
- **Step-by-Step Action Plans** with priorities and time estimates
- **Calming Guidance** to reduce panic
- **Emergency Resources** and contact information

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- AWS Account with Bedrock access
- Amazon Nova Pro model enabled

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your AWS credentials

# Run server
python -m uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install

# Run development server
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🔧 Configuration

### AWS Credentials

1. Go to AWS Console → Amazon Bedrock
2. Enable model access for **Amazon Nova Pro**
3. Create IAM credentials with `bedrock:InvokeModel` permission
4. Add credentials to `backend/.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
NOVA_MODEL_ID=amazon.nova-pro-v1:0
USE_MOCK_DATA=false
```

### Mock Mode (for demos without AWS)

Set `USE_MOCK_DATA=true` in `.env` to use intelligent mock responses.

## 🧪 Test Nova Connection

```bash
cd backend
python test_nova.py
```

## 📁 Project Structure

```
foresightai/
├── backend/              # FastAPI + Amazon Nova
│   ├── app/
│   │   ├── main.py      # API endpoints
│   │   ├── models.py    # Data schemas
│   │   ├── config.py    # Configuration
│   │   └── services/
│   │       └── nova_service.py  # Nova integration
│   └── requirements.txt
├── frontend/            # Next.js UI
│   ├── src/
│   │   ├── app/
│   │   │   └── page.jsx
│   │   └── components/
│   │       ├── EmergencyInput.jsx
│   │       └── ActionPlan.jsx
│   └── package.json
└── PROJECT_STORY.md     # Hackathon submission story
```

## 🛠️ Built With

- **Amazon Nova Pro** - AI foundation model
- **Amazon Bedrock** - Managed AI service
- **FastAPI** - Python web framework
- **Next.js 14** - React framework
- **Boto3** - AWS SDK for Python

## 🎨 Features

- ✅ Real-time AI analysis using Amazon Nova
- ✅ Quick start templates for common emergencies
- ✅ Contextual emergency responses
- ✅ Priority-based action steps
- ✅ Risk level color coding
- ✅ Share & print action plans
- ✅ Analysis history (last 3)
- ✅ Response time tracking
- ✅ Calming UI design
- ✅ Mock mode for demos
- ✅ Responsive design
- ✅ Print-friendly layouts

See [FEATURES.md](FEATURES.md) for complete feature list.

## 📊 API Endpoints

### POST `/analyze`
Analyze emergency and generate action plan.

**Request:**
```json
{
  "location": "Home, Seattle",
  "situation": "Kitchen fire in oven",
  "photo_description": "Small flames visible"
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

## ⚠️ Disclaimer

This tool provides AI-generated guidance. For life-threatening emergencies, always call 911 or your local emergency services immediately.

## 📝 License

MIT License - See LICENSE file for details

## 🏆 AWS Nova Challenge

Built for the AWS Nova Challenge hackathon. See [PROJECT_STORY.md](PROJECT_STORY.md) for the full development story.

---

**Built with ❤️ and Amazon Nova**
