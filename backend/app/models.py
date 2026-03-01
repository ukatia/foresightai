from pydantic import BaseModel, Field
from typing import List, Optional

class EmergencyInput(BaseModel):
    location: str = Field(..., description="Where the emergency is happening")
    situation: str = Field(..., description="Description of the emergency situation")
    photo_description: Optional[str] = Field(None, description="Description of uploaded photo if any")

class ActionStep(BaseModel):
    step_number: int
    action: str
    priority: str  # "CRITICAL", "HIGH", "MEDIUM"
    time_estimate: str

class EmergencyResponse(BaseModel):
    risk_level: str  # "LOW", "MODERATE", "HIGH", "CRITICAL"
    risk_summary: str
    action_plan: List[ActionStep]
    calm_message: str
    additional_resources: List[str]
