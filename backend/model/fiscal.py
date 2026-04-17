from config import BASELINE_GDP, BASELINE_SPENDING, BASELINE_INCOME_TAX


def apply_fiscal(GDP_raw, inputs,
                 mode="baseline",
                 baseline_gdp=None,
                 baseline_spending=None,
                 baseline_tax=None):

    # =========================
    # 1️⃣ SELECT BASELINES
    # =========================
    if mode == "dataset":
        base_gdp = baseline_gdp
        base_spending = baseline_spending
        base_tax = baseline_tax
    else:
        base_gdp = BASELINE_GDP
        base_spending = BASELINE_SPENDING
        base_tax = BASELINE_INCOME_TAX


    # =========================
    # 2️⃣ TAX DISTORTION EFFECT
    # =========================
    tax_change = (inputs.incomeTax - base_tax) / base_tax
    # prevent extreme fiscal shocks
    tax_change = max(min(tax_change, 0.5), -0.5)

    # smaller realistic distortion
    tax_impact = 1 - 0.08 * tax_change

    GDP_tax = GDP_raw * tax_impact


    # =========================
    # 3️⃣ GOVERNMENT SPENDING EFFECT
    # =========================
    gov_spending = inputs.govSpending if inputs.govSpending is not None else base_spending

    spending_ratio = gov_spending / base_gdp if base_gdp != 0 else 0

    multiplier = 1 + 0.01 * spending_ratio

    GDP_final = GDP_tax * multiplier


    # 🛡️ SAFETY: GDP cannot be negative
    if GDP_final < 0:
        GDP_final = 0.1


    # =========================
    # 4️⃣ TAX REVENUE
    # =========================
    tax_revenue = (inputs.incomeTax / 100) * 0.3 * GDP_final

    # 🛡️ SAFETY: revenue cannot be negative
    if tax_revenue < 0:
        tax_revenue = 0


    # =========================
    # 5️⃣ DEFICIT
    # =========================
    deficit = gov_spending - tax_revenue


    return GDP_final, deficit