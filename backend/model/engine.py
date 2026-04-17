from model.production import compute_production
from model.fiscal import apply_fiscal
from model.labor import compute_labor
from model.equilibrium import compute_inflation
from model.sam import build_sam
from model.trade import apply_trade

from config import BASELINE_GDP, BASELINE_UNEMPLOYMENT, BASELINE_INFLATION
from config import BASELINE_INCOME_TAX
from data_loader import load_macro

BASELINE_WAGE = 600


def run_simulation(inputs, mode="baseline"):

    # ==========================
    # 1️⃣ BASELINE ECONOMY
    # ==========================
    if mode == "dataset":

        macro = load_macro()
        macro.columns = macro.columns.str.strip()

        latest = macro.sort_values("year").iloc[-1]

        gdp_value = float(latest["gdp"])
        inflation_value = float(latest["inflation"])
        unemployment_value = float(latest["unemployment"])

        dataset_wage = gdp_value * 150

        baseline = {
            "GDP": gdp_value,
            "unemployment": unemployment_value,
            "inflation": inflation_value,
            "deficit": 0,
            "wage": dataset_wage
        }

    else:

        baseline = {
            "GDP": BASELINE_GDP,
            "unemployment": BASELINE_UNEMPLOYMENT,
            "inflation": BASELINE_INFLATION,
            "deficit": 0,
            "wage": BASELINE_WAGE
        }

    # ==========================
    # 2️⃣ PRODUCTION
    # ==========================
    production = compute_production(inputs)
    gdp_raw = production["gdp_raw"]

    # ==========================
    # 3️⃣ SCALE ECONOMY
    # ==========================
    if mode == "dataset" and gdp_raw != 0:

        economy_scale = baseline["GDP"] / gdp_raw

        # Allow policy-driven growth from subsidies
        growth_factor = 1 + (
            getattr(inputs, "mfgSubsidy", 0) +
            getattr(inputs, "agriSubsidy", 0) +
            getattr(inputs, "svcSubsidy", 0)
        ) / 40 

        economy_scale = economy_scale * growth_factor

        adjusted_output = {
            "agriculture": max(production["agriculture"] * economy_scale, 0.1),
            "manufacturing": max(production["manufacturing"] * economy_scale, 0.1),
            "services": max(production["services"] * economy_scale, 0.5)
        }

        # -----------------------------------
        # TAX IMPACT ON SECTOR OUTPUTS
        # -----------------------------------
        tax_shock = (inputs.incomeTax - BASELINE_INCOME_TAX) / BASELINE_INCOME_TAX

        if tax_shock != 0:

            adjusted_output["services"] *= (1 - 0.12 * tax_shock)
            adjusted_output["manufacturing"] *= (1 - 0.10 * tax_shock)
            adjusted_output["agriculture"] *= (1 - 0.08 * tax_shock)

        # -----------------------------------
        # NORMALIZE SECTOR SHARES
        # Prevent unrealistic sector collapse
        # -----------------------------------
        total_output = sum(adjusted_output.values())

        if total_output > 0:

            agri_share = adjusted_output["agriculture"] / total_output
            mfg_share = adjusted_output["manufacturing"] / total_output
            svc_share = adjusted_output["services"] / total_output

            # enforce minimum realistic service economy
            if svc_share < 0.40:

                adjusted_output["services"] = total_output * 0.55
                adjusted_output["manufacturing"] = total_output * 0.27
                adjusted_output["agriculture"] = total_output * 0.18

    else:

        adjusted_output = {
            "agriculture": production["agriculture"],
            "manufacturing": production["manufacturing"],
            "services": production["services"]
        }

    # ==========================
    # 4️⃣ GDP FROM SECTORS
    # ==========================
    scaled_gdp = sum(adjusted_output.values())

    # ==========================
    # 5️⃣ FISCAL POLICY
    # ==========================
    GDP, deficit = apply_fiscal(
        scaled_gdp,
        inputs,
        mode=mode,
        baseline_gdp=baseline["GDP"],
        baseline_spending=baseline["GDP"] * 0.20,
        baseline_tax=BASELINE_INCOME_TAX
    )

    # ==========================
    # 6️⃣ TRADE SECTOR
    # ==========================
    GDP, exports, imports, trade_balance = apply_trade(GDP, inputs)

    # 🛡️ SAFETY: prevent extreme economic collapse
    if mode == "dataset":
        if GDP < 0.7 * baseline["GDP"]:
            GDP = 0.7 * baseline["GDP"]

    # ==========================
    # 7️⃣ LABOR MARKET
    # ==========================
    unemployment, labor_shares, wage = compute_labor(
        GDP,
        adjusted_output,
        inputs.laborShift,
        from_sector=getattr(inputs, "fromSector", "agriculture"),
        to_sector=getattr(inputs, "toSector", "services"),
        mode=mode,
        baseline_gdp=baseline["GDP"],
        baseline_unemployment=baseline["unemployment"],
        baseline_wage=baseline["wage"],
    )

    # prevent unrealistic unemployment spikes
    unemployment = max(min(unemployment, 12), 2)

    # ==========================
    # 8️⃣ INFLATION
    # ==========================
    inflation = compute_inflation(
        GDP,
        deficit,
        wage,
        mode=mode,
        baseline_gdp=baseline["GDP"],
        baseline_inflation=baseline["inflation"],
        baseline_wage=baseline["wage"]
    )
    inflation = max(min(inflation, 10), 1)

    # ==========================
    # 9️⃣ SAM MATRIX
    # ==========================
    sam = build_sam(adjusted_output, labor_shares, wage)

    # --------------------------
    # Fiscal components for chart
    # --------------------------
    tax_revenue = (inputs.incomeTax / 100) * 0.3 * GDP

    gov_spending = inputs.govSpending if inputs.govSpending is not None else baseline["GDP"] * 0.20

    # ==========================
    # 🔟 POLICY RESULTS
    # ==========================
    policy = {
        "GDP": round(GDP, 2),
        "unemployment": round(unemployment, 2),
        "inflation": round(inflation, 2),
        "deficit": round(deficit, 2),
        "wage": round(wage, 2),

        "taxRevenue": round(tax_revenue, 2),
        "govSpending": round(gov_spending, 2),

        "exports": round(exports, 2),
        "imports": round(imports, 2),
        "tradeBalance": round(trade_balance, 2),

        "sectorOutput": {
            "agriculture": round(adjusted_output["agriculture"], 4),
            "manufacturing": round(adjusted_output["manufacturing"], 4),
            "services": round(adjusted_output["services"], 4),
        },

        "laborShare": labor_shares
    }

    # ==========================
    # 1️⃣1️⃣ ECONOMIC CHANGES
    # ==========================
    changes = {
        "gdp_change": round(((policy["GDP"] - baseline["GDP"]) / baseline["GDP"]) * 100, 2),
        "unemployment_change": round(policy["unemployment"] - baseline["unemployment"], 2),
        "inflation_change": round(policy["inflation"] - baseline["inflation"], 2),
        "deficit_change": round(policy["deficit"] - baseline["deficit"], 2),
        "wage_change": round(((policy["wage"] - baseline["wage"]) / baseline["wage"]) * 100, 2)
    }

    return {
        "baseline": baseline,
        "policy": policy,
        "changes": changes,
        "SAM": sam,
        "sam_matrix": sam,
        "sector_output": policy["sectorOutput"]
    }