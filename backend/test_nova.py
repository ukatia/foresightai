"""Test script to verify Amazon Nova access"""
import boto3
import json
from app.config import settings

def test_nova_connection():
    print("Testing Amazon Nova connection...")
    print(f"Region: {settings.aws_region}")
    print(f"Model ID: {settings.nova_model_id}")
    print(f"Mock Mode: {settings.use_mock_data}")
    
    if settings.use_mock_data:
        print("\n⚠️  Mock mode is enabled. Set USE_MOCK_DATA=false to test real Nova.")
        return
    
    try:
        client = boto3.client(
            'bedrock-runtime',
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key
        )
        
        print("\n✅ Boto3 client created successfully")
        
        # Test simple prompt
        response = client.converse(
            modelId=settings.nova_model_id,
            messages=[
                {
                    "role": "user",
                    "content": [{"text": "Say 'Hello' if you can hear me."}]
                }
            ],
            inferenceConfig={
                "temperature": 0.3,
                "maxTokens": 50
            }
        )
        
        result = response['output']['message']['content'][0]['text']
        print(f"\n✅ Nova responded: {result}")
        print("\n🎉 Amazon Nova is working correctly!")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("\nPossible issues:")
        print("1. Model access not enabled in Bedrock console")
        print("2. Invalid AWS credentials")
        print("3. Insufficient IAM permissions")
        print("4. Wrong region or model ID")
        print("\nTo fix:")
        print("- Go to AWS Console → Bedrock → Model access")
        print("- Enable 'Amazon Nova Pro' model")
        print("- Verify IAM permissions for bedrock:InvokeModel")

if __name__ == "__main__":
    test_nova_connection()
