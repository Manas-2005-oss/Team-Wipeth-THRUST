from fastapi import APIRouter
from pydantic import BaseModel
from llm.llm_service import interpret_and_run

router = APIRouter()

class PolicyRequest(BaseModel):
    policy: str
    closure: str = "savings"

@router.post("/simulate-policy")
def simulate(data: PolicyRequest):
    result = interpret_and_run(data.policy, data.closure)
    return result