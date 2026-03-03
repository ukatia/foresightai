"""Test emergency analysis with real Nova"""
import requests
import json

API_URL = "http://localhost:8000"

def test_emergency_analysis():
    print("Testing Emergency Analysis with Amazon Nova...\n")
    
    # Test scenario
    emergency = {
        "location": "Home Kitchen",
        "situation": "Small fire started in the oven while cooking. Flames are visible but contained to the oven area.",
        "photo_description": None
    }
    
    print(f"📍 Location: {emergency['location']}")
    print(f"⚠️  Situation: {emergency['situation']}\n")
    print("Sending to Nova for analysis...\n")
    
    try:
        response = requests.post(
            f"{API_URL}/analyze",
            json=emergency,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            
            print("✅ Nova Analysis Complete!\n")
            print("=" * 60)
            print(f"🚨 RISK LEVEL: {result['risk_level']}")
            print("=" * 60)
            print(f"\n📋 Risk Summary:")
            print(f"   {result['risk_summary']}\n")
            
            print(f"💙 Calm Message:")
            print(f"   {result['calm_message']}\n")
            
            print(f"📝 Action Plan ({len(result['action_plan'])} steps):")
            for step in result['action_plan']:
                priority_emoji = "🔴" if step['priority'] == "CRITICAL" else "🟠" if step['priority'] == "HIGH" else "🟡"
                print(f"\n   {step['step_number']}. [{priority_emoji} {step['priority']}] {step['action']}")
                print(f"      ⏱️  {step['time_estimate']}")
            
            print(f"\n📞 Emergency Resources:")
            for resource in result['additional_resources']:
                print(f"   • {resource}")
            
            print("\n" + "=" * 60)
            print("🎉 Test Successful! Nova is working perfectly!")
            print("=" * 60)
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    test_emergency_analysis()
