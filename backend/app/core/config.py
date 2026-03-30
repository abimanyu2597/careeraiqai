from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    openai_api_key: str = ""
    groq_api_key: str = ""
    openai_model: str = "gpt-4.1-mini"
    groq_model: str = "llama-3.3-70b-versatile"
    database_url: str = "sqlite:///./careeriq.db"
    app_name: str = "CareerIQ AI"
    allowed_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
