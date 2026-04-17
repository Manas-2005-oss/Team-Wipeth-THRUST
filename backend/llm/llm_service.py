from llm.policy_parser import parse_policy
from llm.policy_mapper import map_policy_to_model
from llm.model_runner import run_model
from llm.forecast import forecast_gdp
from llm.closure_rules import apply_closure


def interpret_and_run(text, closure="savings"):

    # 1️⃣ Parse Policy
    policies = parse_policy(text)

    params = {}

    # 2️⃣ Convert each policy
    for policy in policies:

        if "change" not in policy:
            policy["change"] = 0

        if policy["change"] > 1:
            policy["change"] = policy["change"] / 100

        mapped = map_policy_to_model(policy)

        # 🔧 FIX: Merge parameters instead of overwriting
        for key, value in mapped.items():

            if key not in params:
                params[key] = value

            else:
                # combine numeric policies
                if isinstance(value, (int, float)) and isinstance(params[key], (int, float)):
                    params[key] += value
                else:
                    params[key] = value

    # 3️⃣ Run Simulation
    results = run_model(params)

    baseline_gdp = results["baseline"]["GDP"]
    policy_gdp = results["policy"]["GDP"]

    # 4️⃣ Forecast GDP
    forecast = forecast_gdp(baseline_gdp, policy_gdp)

    # 5️⃣ Apply Closure Rule
    results = apply_closure(results, closure)

    # 6️⃣ Define Closure Rule Description
    if closure == "savings":
        closure_rules = {
            "fiscal_closure": "Savings–Investment balance adjusts",
            "labor_closure": "Wages adjust to clear labor market",
            "external_closure": "Trade balance adjusts via imports"
        }

    elif closure == "government":
        closure_rules = {
            "fiscal_closure": "Government deficit adjusts",
            "labor_closure": "Wages adjust to clear labor market",
            "external_closure": "Trade balance adjusts via imports"
        }

    elif closure == "external":
        closure_rules = {
            "fiscal_closure": "Government budget fixed",
            "labor_closure": "Wages adjust",
            "external_closure": "Exchange rate adjusts"
        }

    else:
        closure_rules = {}

    # 7️⃣ Return API Response
    return {
        "policy_interpretation": policies,
        "simulation_results": results,
        "gdp_forecast": forecast,
        "sector_output": results["policy"]["sectorOutput"],
        "sam_matrix": results["SAM"],
        "closure_rules": closure_rules
    }