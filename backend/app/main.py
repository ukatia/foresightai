from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import EmergencyInput, EmergencyResponse, ActionStep
from .services.nova_service import NovaService

app = FastAPI(
    title="Emergency Action Planner API",
    description="AI-powered emergency response planning using Amazon Nova",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nova_service = NovaService()

@app.get("/")
async def root():
    return {
        "message": "Emergency Action Planner API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/stats")
async def get_stats():
    """
    Get usage statistics (mock data for demo)
    """
    return {
        "total_analyses": 1247,
        "avg_response_time": "1.8s",
        "most_common_emergency": "Fire-related incidents",
        "success_rate": "99.2%"
    }

@app.post("/analyze", response_model=EmergencyResponse)
async def analyze_emergency(input_data: EmergencyInput):
    """
    Analyze emergency situation and generate action plan using Amazon Nova
    """
    try:
        result = nova_service.analyze_emergency(
            location=input_data.location,
            situation=input_data.situation,
            photo_description=input_data.photo_description
        )
        
        action_plan = [
            ActionStep(**step) for step in result.get("action_plan", [])
        ]
        
        return EmergencyResponse(
            risk_level=result.get("risk_level", "MODERATE"),
            risk_summary=result.get("risk_summary", ""),
            action_plan=action_plan,
            calm_message=result.get("calm_message", "Stay calm and follow the steps."),
            additional_resources=result.get("additional_resources", [])
        )
    
    except Exception as e:
        import traceback
        print(f"ERROR: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
