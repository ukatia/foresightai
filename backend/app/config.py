from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # AWS Configuration
    aws_region: str = "us-east-1"
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    
    # Amazon Nova Configuration
    nova_model_id: str = "amazon.nova-pro-v1:0"
    nova_temperature: float = 0.3  # Low for consistent safety advice
    nova_max_tokens: int = 2000
    nova_top_p: float = 0.9
    
    # Application Configuration
    use_mock_data: bool = False  # Set to False to use real AWS Nova
    
    class Config:
        env_file = ".env"

settings = Settings()
