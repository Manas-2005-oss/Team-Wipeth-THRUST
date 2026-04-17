def build_context(simulation_data, sam_data, closure_rules, pdf_chunks):
    return {
        "simulation": simulation_data,
        "sam": sam_data,
        "closure": closure_rules,
        "pdf": pdf_chunks
    }

def build_prompt(query, context):
    return f"""
You are an AI economic assistant.

Use:
- CGE model logic
- Simulation results
- SAM structure
- Uploaded documents

Context:
{context}

Question:
{query}

Answer clearly.
"""