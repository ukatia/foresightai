from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    aws_region: str = "us-east-1"
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    nova_model_id: str = "us.amazon.nova-sonic-v2:0"
    use_mock_data: bool = False  # Set to False to use real AWS Nova
    
    class Config:
        env_file = ".env"

settings = Settings()
