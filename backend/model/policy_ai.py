from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()

def generate_policy_advice(result):
    """
    Generates AI-style macroeconomic interpretation
    based on policy simulation results.
    """

    policy = result["policy"]
    baseline = result["baseline"]

    advice = [] 

    # ===============================
    #  Growth Analysis
    # ===============================
    if policy["GDP"] > baseline["GDP"]:
        advice.append("Policy stimulates economic growth.")
    elif policy["GDP"] < baseline["GDP"]:
        advice.append("Policy reduces overall economic output.")

    # ===============================
    #  Labor Market Analysis
    # ===============================
    if policy["unemployment"] < baseline["unemployment"]:
        advice.append("Labor market conditions improve.")
    elif policy["unemployment"] > baseline["unemployment"]:
        advice.append("Unemployment increases under this policy.")

    # ===============================
    #  Inflation Risk
    # ===============================
    if policy["inflation"] > 12:
        advice.append("High inflation risk detected. Consider tightening fiscal expansion.")
    elif policy["inflation"] > baseline["inflation"]:
        advice.append("Moderate inflationary pressure observed.")

    # ===============================
    # Fiscal Sustainability
    # ===============================
    if policy["deficit"] > 0:
        advice.append("Government deficit increases. Long-term sustainability may be affected.")
    elif policy["deficit"] < 0:
        advice.append("Fiscal surplus improves government balance.")

    # ===============================
    #  Sectoral Dominance Insight
    # ===============================
    sector_output = policy["sectorOutput"]

    dominant_sector = max(sector_output, key=sector_output.get)
    advice.append(f"{dominant_sector.capitalize()} sector drives the majority of output.")

    if not advice:
        advice.append("Policy impact appears neutral across macro indicators.")

    return advice


# ============================================
# 📊 POLICY SCORE FUNCTION
# Used to rank policies for hackathon demo
# ============================================
def policy_score(result):

    policy = result["policy"]
    baseline = result["baseline"]

    # GDP growth %
    growth = ((policy["GDP"] - baseline["GDP"]) / baseline["GDP"]) * 100

    # Start from neutral base
    score = 50

    score += growth * 0.5          # reward growth
    score -= policy["inflation"] * 0.7
    score -= policy["unemployment"] * 1
    score -= abs(policy["deficit"]) * 0.05

    # Clamp between 0 and 100
    score = max(0, min(100, score))

    return round(score, 2)



# ===============================
# 🤖 CHATBOT (ADD BELOW THIS LINE)
# ===============================
 
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def call_grok(prompt):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI Policy Assistant for economics and CGE models. Give short, precise answers (2-3 lines max). Avoid long explanations. Be clear and accurate."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI Error: {str(e)}"
# =========================
# 🧠 CHAT FUNCTION AFTER
# =========================
def get_chat_response(query, result=None):

    context_text = ""

    if result:
        policy = result.get("policy", {})
        baseline = result.get("baseline", {})

        context_text = f"""
GDP: {baseline.get("GDP",0)} → {policy.get("GDP",0)}
Inflation: {policy.get("inflation",0)}
Unemployment: {policy.get("unemployment",0)}
Deficit: {policy.get("deficit",0)}
"""

    prompt = f"""
You are an AI Policy Assistant for economics and CGE models.

Answer clearly and simply.

{context_text}

User Question:
{query}

Answer:
"""

    return call_grok(prompt)