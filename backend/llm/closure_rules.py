from config import INVESTMENT_SHARE, EXPORT_SHARE, IMPORT_SHARE, SAVINGS_SHARE


def apply_closure(results, closure="government"):

    policy = results["policy"]
    GDP = policy["GDP"]
    deficit = policy["deficit"]

    closure_info = {}

    # ======================
    # Government Closure
    # ======================
    if closure == "government":

        if deficit > 0:
            policy["govAdjustment"] = round(deficit * 0.5, 2)
        else:
            policy["govAdjustment"] = 0

        closure_info = {
            "fiscal_closure": "Government deficit adjusts"
        }

    # ======================
    # Savings–Investment Closure
    # ======================
    elif closure == "savings":

        investment = GDP * INVESTMENT_SHARE
        savings = GDP * SAVINGS_SHARE

        gap = investment - savings

        policy["investmentAdjustment"] = round(gap, 2)

        closure_info = {
            "fiscal_closure": "Savings–Investment balance adjusts"
        }

    # ======================
    # External Closure
    # ======================
    elif closure == "external":

        exports = GDP * EXPORT_SHARE
        imports = GDP * IMPORT_SHARE

        trade_gap = imports - exports

        policy["importAdjustment"] = round(trade_gap, 2)

        closure_info = {
            "external_closure": "Trade balance adjusts through imports"
        }

    # Save closure info for frontend
    results["closure_rules"] = closure_info

    return results