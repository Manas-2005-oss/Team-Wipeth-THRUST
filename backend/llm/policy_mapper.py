from config import BASELINE_INCOME_TAX


def map_policy_to_model(policy):

    params = {
        "incomeTax": BASELINE_INCOME_TAX,
        "corporateTax": BASELINE_INCOME_TAX,
        "laborShift": 0,
        "fromSector": "agriculture",
        "toSector": "services",
        "tariffRate": 0
    }

    change = policy.get("change", 0)

    # =========================
    # TAX POLICY
    # =========================
    if policy["policy_type"] == "tax":

        params["incomeTax"] = BASELINE_INCOME_TAX * (1 + change)
        params["corporateTax"] = BASELINE_INCOME_TAX * (1 + change)

    # =========================
    # SUBSIDY POLICY
    # =========================
    elif policy["policy_type"] == "subsidy":

        sector = policy.get("sector", "manufacturing")

        if sector == "manufacturing":
            params["mfgSubsidy"] = change * 100

        elif sector == "agriculture":
            params["agriSubsidy"] = change * 100

        elif sector == "services":
            params["svcSubsidy"] = change * 100

    # =========================
    # LABOR SHIFT POLICY
    # =========================
    elif policy["policy_type"] == "labor_shift":

        params["laborShift"] = change * 100

    # =========================
    # TARIFF POLICY
    # =========================
    elif policy["policy_type"] == "tariff":

        params["tariffRate"] = change

    return params