import requests
import sys
import json

# ✅ Get pest name from command-line argument
pest_name = sys.argv[1] if len(sys.argv) > 1 else ""

# ✅ API URL
url = "https://datasets-server.huggingface.co/rows?dataset=Kinsleykinsley%2FEco_friendly_pest_solutions&config=default&split=train&offset=0&length=100"

# ✅ Fetch dataset
response = requests.get(url)
data = response.json()

# ✅ Extract pest solutions
def get_pest_solution(pest_name):
    for entry in data["rows"]:
        row_data = entry["row"]  # This is a dictionary

        # ✅ Check if 'Pest' key matches the input pest
        if row_data.get("Pest", "").lower() == pest_name.lower():
            return row_data.get("Eco_friendly_solutions", "No solution found.")

    return "No solution found."

# ✅ Find solution for input pest
solution = get_pest_solution(pest_name)

# ✅ Print result as JSON for Node.js
print(json.dumps({"solution": solution}))
