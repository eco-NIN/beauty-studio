from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["ok"]


app = FastAPI(title="Beauty Studio API", version="0.1.0")


@app.get("/api/health", tags=["system"])
def get_health() -> HealthResponse:
    return HealthResponse(status="ok")
