from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import SimulationInput
from model.engine import run_simulation
from pydantic import BaseModel
from model.equilibrium_wrapper import solve_equilibrium
from model.policy_ai import generate_policy_advice, policy_score
from model.scenario_manager import save_scenario, get_scenarios
from model.policy_ai import get_chat_response
from llm.routes import router as llm_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "CGE Backend Running with Equilibrium Solver"}


# ===============================
# 📦 CHAT REQUEST SCHEMA
# ===============================
class ChatRequest(BaseModel):
    query: str
    result: dict = {}


# =========================
# 🔹 MAIN SIMULATION ROUTE
# =========================
@app.post("/simulate")
def simulate(input_data: SimulationInput):

    # Solve equilibrium using baseline mode (User Dashboard)
    result = solve_equilibrium(
        lambda inputs: run_simulation(inputs, mode="baseline"),
        input_data
    )

    result["ai_advice"] = generate_policy_advice(result)

    # Policy Score
    result["policy_score"] = policy_score(result)

    return result


# =========================
#  SAVE SCENARIO
# =========================
@app.post("/save_scenario/{scenario_name}")
def save_scenario_api(scenario_name: str, input_data: SimulationInput):

    result = solve_equilibrium(
        lambda inputs: run_simulation(inputs, mode="baseline"),
        input_data
    )

    result["ai_advice"] = generate_policy_advice(result)
    result["policy_score"] = policy_score(result)

    save_scenario(scenario_name, result)

    return {
        "message": f"Scenario '{scenario_name}' saved successfully.",
        "policy_score": result["policy_score"]
    }


# =========================
#  COMPARE SCENARIOS
# =========================
@app.get("/compare")
def compare_scenarios():
    scenarios = get_scenarios()

    comparison = []

    for name, data in scenarios.items():
        comparison.append({
            "scenario": name,
            "GDP": data["policy"]["GDP"],
            "Inflation": data["policy"]["inflation"],
            "Unemployment": data["policy"]["unemployment"],
            "Wage": data["policy"]["wage"],
            "Deficit": data["policy"]["deficit"],
            "PolicyScore": data.get("policy_score", 0)
        })

    # Sort by best score
    comparison.sort(key=lambda x: x["PolicyScore"], reverse=True)

    #  DETECT BEST POLICY
    best_policy = comparison[0]["scenario"] if comparison else None

    return {
        "best_policy": best_policy,
        "ranking": comparison
    }


# ===============================
# 📦 CHAT REQUEST SCHEMA
# ===============================
class ChatRequest(BaseModel):
    query: str
    result: dict = {}


# =========================
#  CHATBOT
# =========================
@app.post("/chat")
def chat(req: ChatRequest):
    answer = get_chat_response(req.query, req.result)
    return {"answer": answer}


# =========================
#  LLM ROUTES (Economist Mode)
# =========================
app.include_router(llm_router)