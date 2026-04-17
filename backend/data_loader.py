import pandas as pd
import json
import os


def load_macro():
    """
    Load macroeconomic dataset for economist dashboard
    """
    df = pd.read_csv("data/india_macro_data.csv")

    # clean column names
    df.columns = df.columns.str.strip()

    return df


def load_sector_shares():
    """
    Load sector share dataset for production model
    (Used only in economist mode)
    """

    path = os.path.join("data", "sector_share.json")

    with open(path, "r") as f:
        data = json.load(f)

    # convert percent → decimal
    shares = {
        "agriculture": data["agriculture"]["share_percent"] / 100,
        "manufacturing": data["industry"]["share_percent"] / 100,
        "services": data["services"]["share_percent"] / 100
    }

    return shares