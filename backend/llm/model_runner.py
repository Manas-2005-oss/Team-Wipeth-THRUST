from model.engine import run_simulation
from config import BASELINE_INCOME_TAX


class EngineInputs:
    def __init__(self, data):

        # =========================
        # Production shocks
        # =========================
        self.agriProd = data.get("agriProd", 0)
        self.agriSubsidy = data.get("agriSubsidy", 0)

        self.mfgProd = data.get("mfgProd", 0)
        self.mfgSubsidy = data.get("mfgSubsidy", 0)

        self.svcProd = data.get("svcProd", 0)
        self.svcSubsidy = data.get("svcSubsidy", 0)

        # =========================
        # Fiscal policy
        # =========================
        self.incomeTax = data.get("incomeTax", BASELINE_INCOME_TAX)
        self.corporateTax = data.get("corporateTax", BASELINE_INCOME_TAX)

        self.govSpending = data.get("govSpending", None)

        # =========================
        # Labour mobility
        # =========================
        self.laborShift = data.get("laborShift", 0)

        self.fromSector = data.get("fromSector", "agriculture")
        self.toSector = data.get("toSector", "services")

        self.tariffRate = data.get("tariffRate", 0)


def run_model(params):

    engine_inputs = EngineInputs(params)

    # Economist mode uses dataset baseline
    results = run_simulation(engine_inputs, mode="dataset")

    # =========================
    # 🛡 ECONOMIC STABILITY FIX
    # =========================
    policy = results.get("policy", {})

    # GDP cannot be negative
    if policy.get("GDP", 0) < 0:
        policy["GDP"] = 0.1

    # Sector output cannot be negative
    if "sectorOutput" in policy:
        sector = policy["sectorOutput"]

        sector["agriculture"] = max(sector.get("agriculture", 0), 0.01)
        sector["manufacturing"] = max(sector.get("manufacturing", 0), 0.01)
        sector["services"] = max(sector.get("services", 0), 0.01)

    # Exports / Imports cannot be negative
    policy["exports"] = max(policy.get("exports", 0), 0.01)
    policy["imports"] = max(policy.get("imports", 0), 0.01)

    return results