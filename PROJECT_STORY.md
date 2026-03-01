# Emergency Action Planner - AWS Nova Challenge Submission

## 🚨 Project Overview

Emergency Action Planner is an AI-powered safety guidance system that helps people navigate critical situations with calm, structured action plans. Built with Amazon Nova, it transforms panic-inducing emergencies into manageable step-by-step responses.

**Live Demo**: [Your deployment URL]  
**GitHub**: [Your repository URL]

---

## 💡 What Inspired This Project

Emergency situations are inherently chaotic. When faced with a fire, medical emergency, or natural disaster, people often freeze or make poor decisions due to panic and information overload. I wanted to create something that could:

1. **Reduce panic** through calm, AI-generated guidance
2. **Provide structure** when chaos reigns
3. **Democratize emergency response knowledge** - making expert-level safety planning accessible to everyone
4. **Leverage AI for good** - using Amazon Nova's reasoning capabilities to analyze situations and generate contextual safety plans

The inspiration came from a simple question: "What if everyone had an emergency response expert in their pocket?" With Amazon Nova's advanced language understanding and reasoning, this became possible.

---

## 🎓 What I Learned

### Technical Learnings

1. **Amazon Nova's Capabilities**
   - Nova Pro's reasoning abilities excel at structured problem-solving
   - Lower temperature settings (0.3) produce more consistent, reliable safety advice
   - The Converse API provides clean, conversational interactions perfect for emergency contexts

2. **Prompt Engineering for Safety**
   - Crafting prompts that balance urgency with calmness
   - Structuring outputs as JSON for reliable parsing
   - Designing prompts that prioritize human safety above all else

3. **Full-Stack Integration**
   - Connecting FastAPI backend with Next.js frontend
   - Managing async operations for real-time AI responses
   - Implementing graceful fallbacks when AI services are unavailable

### Design Learnings

1. **UI/UX for Crisis Situations**
   - Color psychology matters - switched from alarming red to calming purple/blue
   - Information hierarchy is critical - risk level first, then actions
   - Visual clarity over aesthetic complexity in emergency contexts

2. **Simplification is Key**
   - Started with a complex decision simulator
   - Pivoted to focused emergency planner
   - Result: 70% less code, 100% more demo-able

---

## 🛠️ How I Built This Project

### Architecture

```
┌─────────────────┐
│   Next.js UI    │  ← User inputs emergency details
└────────┬────────┘
         │
         ↓ HTTP POST
┌─────────────────┐
│  FastAPI Backend│  ← Processes and validates input
└────────┬────────┘
         │
         ↓ AWS Bedrock API
┌─────────────────┐
│  Amazon Nova    │  ← Analyzes risk, generates action plan
└────────┬────────┘
         │
         ↓ Structured JSON
┌─────────────────┐
│   Action Plan   │  ← Displayed to user with priority levels
└─────────────────┘
```

### Tech Stack

**Backend**
- Python 3.12 with FastAPI
- Amazon Bedrock Runtime (boto3)
- Pydantic for data validation
- Uvicorn ASGI server

**Frontend**
- Next.js 14 (React)
- Pure CSS (no dependencies)
- Client-side state management

**AI**
- Amazon Nova Pro v1:0
- Custom prompt engineering for emergency response
- Fallback mock data for demos

### Key Implementation Details

1. **Smart Prompt Construction**
```python
def _build_emergency_prompt(self, location, situation, photo_description):
    # Structured prompt that guides Nova to:
    # - Assess risk level
    # - Generate prioritized steps
    # - Provide calming guidance
    # - Include emergency resources
```

2. **Risk-Based Response**
   - Keywords trigger appropriate risk levels (fire → HIGH, minor → LOW)
   - Action plans adapt to situation severity
   - Priority tags (CRITICAL/HIGH/MEDIUM) guide user attention

3. **Graceful Degradation**
   - Mock data mode for demos without AWS
   - JSON parsing fallbacks
   - Error handling that never leaves users stranded

### Development Process

1. **Day 1**: Built decision simulator (too complex)
2. **Day 2**: Pivoted to emergency planner (much better!)
3. **Day 3**: Integrated Amazon Nova via Bedrock
4. **Day 4**: Refined UI/UX based on emergency response principles
5. **Day 5**: Added mock mode, testing, documentation

---

## 🚧 Challenges I Faced

### Challenge 1: AWS Bedrock Configuration
**Problem**: Initial 500 errors when calling Nova API  
**Solution**: 
- Implemented proper error handling
- Added mock data mode for development
- Created clear environment variable configuration

### Challenge 2: Prompt Engineering for Safety
**Problem**: Early prompts generated inconsistent or overly technical responses  
**Solution**:
- Lowered temperature to 0.3 for consistency
- Added explicit JSON structure requirements
- Included "calm message" field to reduce panic
- Iterated on prompt structure 10+ times

### Challenge 3: UI Design for Crisis
**Problem**: Initial red background was too alarming  
**Solution**:
- Switched to calming purple/blue gradient
- Used color-coding for risk levels (green → red spectrum)
- Prioritized readability and clear visual hierarchy
- Added calming messages prominently

### Challenge 4: Scope Creep
**Problem**: Started building complex multi-step decision simulator  
**Solution**:
- Pivoted to focused emergency planner
- Removed unnecessary features
- Result: Simpler, more powerful, more demo-able

### Challenge 5: Real-Time Response Expectations
**Problem**: Users expect instant responses in emergencies  
**Solution**:
- Loading states with clear messaging
- Optimized API calls
- Mock mode for instant demos
- Disclaimer to call 911 for life-threatening situations

---

## 🎯 What Makes This Special

1. **AI for Good**: Uses Amazon Nova's intelligence to potentially save lives
2. **Practical Application**: Solves a real problem people face
3. **Accessible**: Simple interface anyone can use under stress
4. **Contextual Intelligence**: Nova adapts responses to specific situations
5. **Responsible AI**: Includes disclaimers and encourages professional help

---

## 🚀 Future Enhancements

- **Image Analysis**: Use Nova's vision capabilities to analyze emergency photos
- **Multi-language Support**: Emergency guidance in user's native language
- **Offline Mode**: Cached common emergency responses
- **Location Services**: Auto-detect location and provide local emergency numbers
- **Voice Interface**: Hands-free operation during emergencies
- **Follow-up Guidance**: Post-emergency recovery steps

---

## 📊 Impact Potential

- **Target Users**: Everyone with a smartphone
- **Use Cases**: Home emergencies, workplace incidents, natural disasters, medical situations
- **Social Impact**: Democratizes emergency response expertise
- **Scalability**: Cloud-native architecture ready for millions of users

---

## 🙏 Acknowledgments

- **AWS** for Amazon Nova and Bedrock platform
- **FastAPI** for excellent Python web framework
- **Next.js** team for amazing React framework
- **Emergency response professionals** whose expertise inspired the action plans

---

## 📝 Technical Details

**Repository Structure**:
```
foresightai/
├── backend/          # FastAPI + Amazon Nova integration
│   ├── app/
│   │   ├── main.py           # API endpoints
│   │   ├── models.py         # Pydantic schemas
│   │   ├── config.py         # Configuration
│   │   └── services/
│   │       └── nova_service.py  # Nova integration
│   └── requirements.txt
└── frontend/         # Next.js UI
    ├── src/
    │   ├── app/
    │   │   ├── page.jsx      # Main app logic
    │   │   └── layout.jsx    # App layout
    │   └── components/
    │       ├── EmergencyInput.jsx   # Input form
    │       └── ActionPlan.jsx       # Results display
    └── package.json
```

**Key Files**:
- `nova_service.py`: Amazon Nova integration with prompt engineering
- `page.jsx`: Main application flow and state management
- `ActionPlan.jsx`: Risk-based UI rendering

---

## 🏆 Why This Project Deserves Recognition

1. **Innovative Use of Nova**: Leverages reasoning capabilities for life-saving guidance
2. **Real-World Impact**: Addresses genuine emergency response needs
3. **Technical Excellence**: Clean architecture, proper error handling, scalable design
4. **User-Centric**: Designed for people under stress, not just tech demos
5. **Responsible AI**: Includes appropriate disclaimers and encourages professional help

---

**Built with ❤️ and Amazon Nova for the AWS Nova Challenge**
