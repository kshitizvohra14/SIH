import json
from fastapi import FastAPI

app = FastAPI()
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

with open("breed.json", "r", encoding="utf-8") as f:
    breed_data = json.load(f)

@app.get("/breed-info-india/{breed_name}")
async def breed_info_india(breed_name: str):
    key = breed_name.replace(" ", "_")
    if key in breed_data:
        return breed_data[key]
    return {"breed": breed_name, "info": "No data found"}
