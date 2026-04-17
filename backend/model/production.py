from config import BASE_OUTPUTS



def compute_production(inputs):

    # =============================
    # 1️ BASE SECTOR PRODUCTION
    # =============================
    Y_A = BASE_OUTPUTS["agriculture"] * (1 + inputs.agriProd / 100) * (1 + inputs.agriSubsidy / 100)
    Y_M = BASE_OUTPUTS["manufacturing"] * (1 + inputs.mfgProd / 100) * (1 + inputs.mfgSubsidy / 100)
    Y_S = BASE_OUTPUTS["services"] * (1 + inputs.svcProd / 100) * (1 + inputs.svcSubsidy / 100)

    # =============================
    # 2️ LABOR SHIFT PRODUCTIVITY SHOCK
    # =============================
    shift = inputs.laborShift / 100
    from_sector = getattr(inputs, "fromSector", "agriculture")
    to_sector = getattr(inputs, "toSector", "manufacturing")

    # Source sector loses productivity
    if from_sector == "agriculture":
        Y_A *= (1 - 1.5 * shift)
    elif from_sector == "manufacturing":
        Y_M *= (1 - 1.5 * shift)
    elif from_sector == "services":
        Y_S *= (1 - 1.5 * shift)

    # Destination sector gains productivity
    if to_sector == "agriculture":
        Y_A *= (1 + 2 * shift)
    elif to_sector == "manufacturing":
        Y_M *= (1 + 2 * shift)
    elif to_sector == "services":
        Y_S *= (1 + 2 * shift)

    # =============================
    # 3️ INTERSECTOR RIPPLE MATRIX
    # =============================
    A = [
        [0.00, 0.05, 0.03],   # Agriculture depends on M & S
        [0.10, 0.00, 0.08],   # Manufacturing depends on A & S
        [0.05, 0.12, 0.00],   # Services depend on A & M
    ]

    ripple_A = A[0][1] * Y_M + A[0][2] * Y_S
    ripple_M = A[1][0] * Y_A + A[1][2] * Y_S
    ripple_S = A[2][0] * Y_A + A[2][1] * Y_M

    Y_A += ripple_A
    Y_M += ripple_M
    Y_S += ripple_S

    # =============================
    # 4️ FINAL GDP
    # =============================
    GDP_raw = Y_A + Y_M + Y_S

    return {
        "agriculture": Y_A,
        "manufacturing": Y_M,
        "services": Y_S,
        "gdp_raw": GDP_raw
    }
