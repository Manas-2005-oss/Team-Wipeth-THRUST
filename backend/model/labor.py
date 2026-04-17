from config import BASELINE_GDP, BASELINE_UNEMPLOYMENT

def compute_labor(GDP, sector_output, labor_shift,
                  from_sector="agriculture",
                  to_sector="services",
                  mode="baseline",
                  baseline_gdp=None,
                  baseline_unemployment=None,
                  baseline_wage=600):
    """
    Computes unemployment, wage and sector labor allocation.

    User Mode  → uses baseline constants
    Economist Mode → uses dataset baseline values

    Economic logic:
    - Okun's Law for unemployment
    - Wage Phillips-type relationship
    - Output-proportional labor allocation
    """

    # =========================
    # 1️⃣ SELECT BASELINES
    # =========================
    if mode == "dataset":

        base_gdp = baseline_gdp
        base_unemp = baseline_unemployment
        base_wage = baseline_wage

    else:

        base_gdp = BASELINE_GDP
        base_unemp = BASELINE_UNEMPLOYMENT
        base_wage = baseline_wage


    # =========================
    # 2️⃣ OKUN'S LAW
    # =========================
    delta_gdp_pct = ((GDP - base_gdp) / base_gdp) * 100

    unemployment = base_unemp - 0.3 * delta_gdp_pct

    unemployment = max(1.5, min(15, unemployment))


    # =========================
    # 3️⃣ WAGE DYNAMICS
    # =========================
    gdp_effect = 0.05 * delta_gdp_pct / 100

    labor_effect = 0.03 * (base_unemp - unemployment)

    wage_multiplier = 1 + gdp_effect + labor_effect

    wage = base_wage * wage_multiplier

    wage = max(400, min(1200, wage))


    # =========================
    # 4️⃣ BASE LABOR SHARES
    # =========================
    total_output = sum(sector_output.values())

    labor_shares = {
        k: v / total_output for k, v in sector_output.items()
    }


    # =========================
    # 5️⃣ FLEXIBLE LABOR SHIFT
    # =========================
    shift = labor_shift / 100

    if from_sector in labor_shares and to_sector in labor_shares:

        labor_shares[to_sector] += shift
        labor_shares[from_sector] -= shift


    # Prevent negative shares
    for k in labor_shares:
        labor_shares[k] = max(0, labor_shares[k])


    # Re-normalize
    total = sum(labor_shares.values())

    labor_shares = {
        k: v / total for k, v in labor_shares.items()
    }


    return round(unemployment, 2), labor_shares, round(wage, 2)