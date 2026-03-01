import boto3
import json
from typing import Dict, Any
from ..config import settings

class NovaService:
    def __init__(self):
        self.use_mock = settings.use_mock_data
        if not self.use_mock:
            self.client = boto3.client(
                'bedrock-runtime',
                region_name=settings.aws_region,
                aws_access_key_id=settings.aws_access_key_id,
                aws_secret_access_key=settings.aws_secret_access_key
            )
            self.model_id = settings.nova_model_id
    
    def analyze_emergency(self, location: str, situation: str, photo_description: str = None) -> Dict[str, Any]:
        """Analyze emergency and generate action plan using Amazon Nova"""
        
        # Use mock data for demo if enabled
        if self.use_mock:
            return self._generate_mock_response(location, situation, photo_description)
        
        prompt = self._build_emergency_prompt(location, situation, photo_description)
        
        request_body = {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}]
                }
            ],
            "inferenceConfig": {
                "temperature": 0.3,  # Lower for more consistent safety advice
                "maxTokens": 2000
            }
        }
        
        response = self.client.converse(
            modelId=self.model_id,
            messages=request_body["messages"],
            inferenceConfig=request_body["inferenceConfig"]
        )
        
        return self._parse_emergency_response(response)
    
    def _build_emergency_prompt(self, location: str, situation: str, photo_description: str = None) -> str:
        """Build emergency analysis prompt"""
        prompt = f"""You are an emergency response expert. Analyze this situation and provide a clear, actionable safety plan.

LOCATION: {location}
SITUATION: {situation}
"""
        if photo_description:
            prompt += f"VISUAL CONTEXT: {photo_description}\n"
        
        prompt += """
Provide:
1. Risk level assessment (LOW/MODERATE/HIGH/CRITICAL)
2. Brief risk summary (2-3 sentences)
3. Step-by-step action plan (5-8 steps with priority and time estimates)
4. Calm, reassuring message
5. Additional resources (emergency numbers, websites)

Format as JSON:
{
  "risk_level": "HIGH",
  "risk_summary": "Brief assessment of the situation",
  "action_plan": [
    {
      "step_number": 1,
      "action": "Clear, specific action to take",
      "priority": "CRITICAL",
      "time_estimate": "Immediate"
    }
  ],
  "calm_message": "Reassuring message to keep person calm",
  "additional_resources": ["911", "Red Cross hotline", "etc"]
}
"""
        return prompt
    
    def _parse_emergency_response(self, response: Dict[str, Any]) -> Dict[str, Any]:
        """Extract and parse Nova's emergency response"""
        content = response['output']['message']['content'][0]['text']
        
        try:
            start = content.find('{')
            end = content.rfind('}') + 1
            json_str = content[start:end]
            return json.loads(json_str)
        except (json.JSONDecodeError, ValueError):
            # Fallback response
            return {
                "risk_level": "MODERATE",
                "risk_summary": "Unable to fully analyze. Please contact emergency services if needed.",
                "action_plan": [
                    {
                        "step_number": 1,
                        "action": "Assess immediate danger to yourself and others",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 2,
                        "action": "Call emergency services (911) if situation is life-threatening",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    }
                ],
                "calm_message": "Stay calm. Help is available. Follow the steps carefully.",
                "additional_resources": ["911 - Emergency Services", "Red Cross: 1-800-RED-CROSS"]
            }
    
    def _generate_mock_response(self, location: str, situation: str, photo_description: str = None) -> Dict[str, Any]:
        """Generate realistic mock response for demo purposes"""
        
        # Determine risk level based on keywords
        situation_lower = situation.lower()
        risk_level = "MODERATE"
        
        if any(word in situation_lower for word in ["fire", "bleeding", "unconscious", "chest pain", "severe"]):
            risk_level = "HIGH"
        elif any(word in situation_lower for word in ["life-threatening", "critical", "emergency"]):
            risk_level = "CRITICAL"
        elif any(word in situation_lower for word in ["minor", "small", "slight"]):
            risk_level = "LOW"
        
        # Generate contextual action plan
        if "fire" in situation_lower:
            return {
                "risk_level": "HIGH",
                "risk_summary": f"Active fire situation at {location}. Immediate action required to ensure safety and prevent spread.",
                "action_plan": [
                    {
                        "step_number": 1,
                        "action": "Alert everyone in the building immediately",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 2,
                        "action": "Call 911 and report the fire with your exact location",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 3,
                        "action": "If safe, turn off gas/electricity sources near the fire",
                        "priority": "HIGH",
                        "time_estimate": "30 seconds"
                    },
                    {
                        "step_number": 4,
                        "action": "Use fire extinguisher only if fire is small and contained",
                        "priority": "HIGH",
                        "time_estimate": "1-2 minutes"
                    },
                    {
                        "step_number": 5,
                        "action": "Evacuate immediately if fire spreads or smoke increases",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 6,
                        "action": "Close doors behind you to slow fire spread",
                        "priority": "MEDIUM",
                        "time_estimate": "5 seconds"
                    },
                    {
                        "step_number": 7,
                        "action": "Meet at designated safe location outside",
                        "priority": "HIGH",
                        "time_estimate": "2-3 minutes"
                    }
                ],
                "calm_message": "You're taking the right steps by seeking guidance. Stay calm, act quickly, and prioritize your safety above all else. Help is on the way.",
                "additional_resources": [
                    "911 - Emergency Services",
                    "Fire Department Non-Emergency: Check local number",
                    "Red Cross: 1-800-RED-CROSS"
                ]
            }
        
        elif "medical" in situation_lower or "injury" in situation_lower or "bleeding" in situation_lower:
            return {
                "risk_level": "HIGH",
                "risk_summary": f"Medical emergency at {location}. Quick response needed to stabilize the situation.",
                "action_plan": [
                    {
                        "step_number": 1,
                        "action": "Call 911 immediately and describe the medical situation",
                        "priority": "CRITICAL",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 2,
                        "action": "Keep the person calm and still",
                        "priority": "CRITICAL",
                        "time_estimate": "Ongoing"
                    },
                    {
                        "step_number": 3,
                        "action": "Apply direct pressure to any bleeding wounds with clean cloth",
                        "priority": "HIGH",
                        "time_estimate": "Immediate"
                    },
                    {
                        "step_number": 4,
                        "action": "Do not move the person unless immediate danger present",
                        "priority": "HIGH",
                        "time_estimate": "Ongoing"
                    },
                    {
                        "step_number": 5,
                        "action": "Monitor breathing and consciousness until help arrives",
                        "priority": "CRITICAL",
                        "time_estimate": "Ongoing"
                    }
                ],
                "calm_message": "Medical help is on the way. Your quick action can make a real difference. Stay focused and follow these steps carefully.",
                "additional_resources": [
                    "911 - Emergency Medical Services",
                    "Poison Control: 1-800-222-1222",
                    "Crisis Text Line: Text HOME to 741741"
                ]
            }
        
        # Generic emergency response
        return {
            "risk_level": risk_level,
            "risk_summary": f"Emergency situation reported at {location}. Following a structured response plan will help manage the situation effectively.",
            "action_plan": [
                {
                    "step_number": 1,
                    "action": "Assess immediate danger to yourself and others",
                    "priority": "CRITICAL",
                    "time_estimate": "30 seconds"
                },
                {
                    "step_number": 2,
                    "action": "Call emergency services (911) if situation is serious",
                    "priority": "HIGH",
                    "time_estimate": "Immediate"
                },
                {
                    "step_number": 3,
                    "action": "Move to a safe location if current position is unsafe",
                    "priority": "HIGH",
                    "time_estimate": "1-2 minutes"
                },
                {
                    "step_number": 4,
                    "action": "Alert others nearby about the situation",
                    "priority": "MEDIUM",
                    "time_estimate": "1 minute"
                },
                {
                    "step_number": 5,
                    "action": "Document the situation with photos/notes if safe to do so",
                    "priority": "MEDIUM",
                    "time_estimate": "2-3 minutes"
                },
                {
                    "step_number": 6,
                    "action": "Wait for professional help and follow their instructions",
                    "priority": "HIGH",
                    "time_estimate": "Ongoing"
                }
            ],
            "calm_message": "You're doing the right thing by planning your response. Take a deep breath, follow these steps, and remember that help is available.",
            "additional_resources": [
                "911 - Emergency Services",
                "Local Police Non-Emergency: Check your area",
                "Red Cross: 1-800-RED-CROSS",
                "Crisis Text Line: Text HOME to 741741"
            ]
        }
