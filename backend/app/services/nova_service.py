import boto3
import json
import logging
from typing import Dict, Any
from ..config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NovaService:
    """
    Service for interacting with Amazon Nova via AWS Bedrock.
    
    This service handles emergency situation analysis using Nova Pro's
    reasoning capabilities to generate structured, actionable safety plans.
    """
    
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
            logger.info(f"Nova service initialized with model: {self.model_id}")
        else:
            logger.info("Nova service initialized in MOCK mode")
    
    def analyze_emergency(self, location: str, situation: str, photo_description: str = None) -> Dict[str, Any]:
        """
        Analyze emergency and generate action plan using Amazon Nova.
        
        Args:
            location: Where the emergency is happening
            situation: Description of the emergency
            photo_description: Optional visual context
            
        Returns:
            Dict containing risk_level, risk_summary, action_plan, calm_message, and resources
        """
        
        # Use mock data for demo if enabled
        if self.use_mock:
            logger.info("Using mock data for emergency analysis")
            return self._generate_mock_response(location, situation, photo_description)
        
        logger.info(f"Analyzing emergency: {situation[:50]}... at {location}")
        
        try:
            prompt = self._build_emergency_prompt(location, situation, photo_description)
            
            # Nova-specific configuration for emergency response
            request_body = {
                "messages": [
                    {
                        "role": "user",
                        "content": [{"text": prompt}]
                    }
                ],
                "inferenceConfig": {
                    "temperature": settings.nova_temperature,  # Low temperature for consistent, reliable safety advice
                    "maxTokens": settings.nova_max_tokens,     # Sufficient for detailed action plans
                    "topP": settings.nova_top_p,               # Focus on most likely tokens for accuracy
                }
            }
            
            # Call Amazon Nova via Bedrock Converse API
            response = self.client.converse(
                modelId=self.model_id,
                messages=request_body["messages"],
                inferenceConfig=request_body["inferenceConfig"]
            )
            
            # Log usage metrics
            usage = response.get('usage', {})
            logger.info(f"Nova response - Input tokens: {usage.get('inputTokens', 0)}, "
                       f"Output tokens: {usage.get('outputTokens', 0)}")
            
            return self._parse_emergency_response(response)
            
        except Exception as e:
            logger.error(f"Nova API error: {str(e)}")
            # Fallback to mock data if Nova fails
            logger.warning("Falling back to mock data due to API error")
            return self._generate_mock_response(location, situation, photo_description)
    
    def _build_emergency_prompt(self, location: str, situation: str, photo_description: str = None) -> str:
        """
        Build optimized prompt for Nova's reasoning capabilities.
        
        This prompt is engineered to:
        1. Leverage Nova's structured reasoning
        2. Ensure consistent JSON output
        3. Prioritize safety and accuracy
        4. Include calming psychological guidance
        """
        prompt = f"""You are an expert emergency response analyst with training in crisis management, first aid, and disaster response. Analyze this emergency situation and provide a structured safety plan.

EMERGENCY DETAILS:
Location: {location}
Situation: {situation}"""
        
        if photo_description:
            prompt += f"\nVisual Context: {photo_description}"
        
        prompt += """

ANALYSIS REQUIREMENTS:
1. Assess the risk level (LOW, MODERATE, HIGH, or CRITICAL)
2. Provide a brief risk summary (2-3 sentences)
3. Generate 5-8 prioritized action steps with:
   - Clear, specific actions
   - Priority level (CRITICAL, HIGH, or MEDIUM)
   - Time estimate (Immediate, 30 seconds, 1-2 minutes, etc.)
4. Include a calming, reassuring message
5. List relevant emergency resources and contact numbers

SAFETY PRINCIPLES:
- Prioritize immediate life safety
- Provide clear, actionable steps
- Use calm, professional language
- Include time-sensitive actions first
- Consider the specific location and context

OUTPUT FORMAT (strict JSON):
{
  "risk_level": "HIGH",
  "risk_summary": "Clear 2-3 sentence assessment of the situation and immediate concerns",
  "action_plan": [
    {
      "step_number": 1,
      "action": "Specific action to take",
      "priority": "CRITICAL",
      "time_estimate": "Immediate"
    }
  ],
  "calm_message": "Reassuring message to reduce panic and build confidence",
  "additional_resources": [
    "911 - Emergency Services",
    "Relevant emergency contact with number"
  ]
}

Provide ONLY the JSON response, no additional text."""
        
        return prompt
    
    def _parse_emergency_response(self, response: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract and parse Nova's emergency response with robust error handling.
        """
        try:
            content = response['output']['message']['content'][0]['text']
            
            # Extract JSON from response (handles cases where Nova adds explanation)
            start = content.find('{')
            end = content.rfind('}') + 1
            
            if start == -1 or end == 0:
                raise ValueError("No JSON found in response")
            
            json_str = content[start:end]
            parsed = json.loads(json_str)
            
            # Validate required fields
            required_fields = ['risk_level', 'risk_summary', 'action_plan', 'calm_message', 'additional_resources']
            for field in required_fields:
                if field not in parsed:
                    raise ValueError(f"Missing required field: {field}")
            
            logger.info(f"Successfully parsed Nova response with {len(parsed['action_plan'])} action steps")
            return parsed
            
        except (json.JSONDecodeError, ValueError, KeyError) as e:
            logger.error(f"Failed to parse Nova response: {str(e)}")
            # Return safe fallback response
            return {
                "risk_level": "MODERATE",
                "risk_summary": "Unable to fully analyze the situation. Please contact emergency services if the situation is serious.",
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
                    },
                    {
                        "step_number": 3,
                        "action": "Move to a safe location if current position is unsafe",
                        "priority": "HIGH",
                        "time_estimate": "1-2 minutes"
                    }
                ],
                "calm_message": "Stay calm. Help is available. Follow these steps carefully and call 911 if needed.",
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
