import re

def parse_policy(text):

    text = text.lower()

    policies = []

    # split multiple policies
    segments = re.split(r'and|,', text)

    for seg in segments:

        # extract percentage
        percent_match = re.search(r'(\d+(\.\d+)?)\s*%', seg)

        if percent_match:
            change_value = float(percent_match.group(1)) / 100
        else:
            change_value = 0

        # detect direction
        if any(word in seg for word in ["decrease","reduce","cut","lower"]):
            change_value = -abs(change_value)

        elif any(word in seg for word in ["increase","raise","boost","expand"]):
            change_value = abs(change_value)

        # detect policy type
        if "tariff" in seg:
            policies.append({
                "policy_type": "tariff",
                "change": change_value
            })

        elif "subsidy" in seg:
            policies.append({
                "policy_type": "subsidy",
                "change": change_value
            })

        elif "spending" in seg or "government spending" in seg:
            policies.append({
                "policy_type": "spending",
                "change": change_value
            })

        elif "labor" in seg and "shift" in seg:
            policies.append({
                "policy_type": "labor_shift",
                "change": change_value
            })

        elif "tax" in seg:
            policies.append({
                "policy_type": "tax",
                "change": change_value
            })

    if not policies:
        return [{
            "policy_type": "none",
            "change": 0
        }]

    return policies