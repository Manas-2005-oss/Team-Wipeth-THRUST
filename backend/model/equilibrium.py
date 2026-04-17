from config import BASELINE_GDP, BASELINE_INFLATION


def compute_inflation(GDP, deficit, wage,
                      mode="baseline",
                      baseline_gdp=None,
                      baseline_inflation=None,
                      baseline_wage=600):

    """
    Inflation model based on macroeconomic drivers:

    1️⃣ Demand-pull inflation (GDP growth)
    2️⃣ Fiscal pressure (deficit)
    3️⃣ Wage-push inflation (labor costs)

    User Mode → baseline constants
    Economist Mode → dataset baselines
    """

    # =========================
    # 1️⃣ SELECT BASELINES
    # =========================
    if mode == "dataset":

        base_gdp = baseline_gdp
        base_inflation = baseline_inflation
        base_wage = baseline_wage

    else:

        base_gdp = BASELINE_GDP
        base_inflation = BASELINE_INFLATION
        base_wage = baseline_wage

    # =========================
    # 2️⃣ GDP DEMAND PRESSURE
    # =========================
    delta_gdp_pct = ((GDP - base_gdp) / base_gdp) * 100

    # =========================
    # 3️⃣ FISCAL PRESSURE
    # =========================
    deficit_ratio = deficit / GDP if GDP != 0 else 0

    # =========================
    # 4️⃣ WAGE PRESSURE
    # =========================
    wage_pressure = (wage - base_wage) / base_wage

    # =========================
    # 5️⃣ INFLATION EQUATION
    # =========================
    inflation = (
        base_inflation
        + 0.3 * delta_gdp_pct
        + 0.5 * deficit_ratio
        + 0.4 * wage_pressure
    )

    # Clamp realistic bounds
    inflation = max(2, min(15, inflation))

    return round(inflation, 2)