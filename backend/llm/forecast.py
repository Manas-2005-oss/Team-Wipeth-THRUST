def forecast_gdp(baseline_gdp, policy_gdp, years=5):
    """
    GDP projection using baseline economic growth + fading policy shock.
    """

    # Long-run baseline growth (India average)
    baseline_growth = 0.06

    # Initial policy impact
    policy_effect = (policy_gdp - baseline_gdp) / baseline_gdp

    projections = []
    current_gdp = policy_gdp

    for i in range(1, years + 1):

        # Policy effect gradually fades
        adjusted_policy_effect = policy_effect * (0.7 ** (i - 1))

        # Total growth rate
        growth_rate = baseline_growth + adjusted_policy_effect

        # Limit unrealistic growth
        growth_rate = max(-0.03, min(growth_rate, 0.12))

        current_gdp = current_gdp * (1 + growth_rate)

        projections.append({
            "year": f"Year{i}",
            "gdp": round(current_gdp, 2)
        })

    return projections