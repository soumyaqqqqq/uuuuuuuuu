
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from fastapi.responses import JSONResponse
import csv

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Set your threshold here
THRESHOLD = 50

@app.get("/geojson/wards")
def get_geojson():
    with open("data/india.geojson", "r", encoding="utf-8") as f:
        gj = json.load(f)
    return gj

@app.get("/outbreak/wards")
def get_outbreak():
    # State centroid coordinates (approximate)
    state_coords = {
        "Andaman & Nicobar Islands": {"lat": 11.7401, "lng": 92.6586},
        "Andhra Pradesh": {"lat": 15.9129, "lng": 79.7400},
        "Arunachal Pradesh": {"lat": 28.2180, "lng": 94.7278},
        "Assam": {"lat": 26.2006, "lng": 92.9376},
        "Bihar": {"lat": 25.0961, "lng": 85.3131},
        "Chandigarh": {"lat": 30.7333, "lng": 76.7794},
        "Chhattisgarh": {"lat": 21.2787, "lng": 81.8661},
        "Dadra & Nagar Haveli": {"lat": 20.1809, "lng": 73.0169},
        "Daman & Diu": {"lat": 20.4283, "lng": 72.8397},
        "Delhi": {"lat": 28.7041, "lng": 77.1025},
        "Goa": {"lat": 15.2993, "lng": 74.1240},
        "Gujarat": {"lat": 22.2587, "lng": 71.1924},
        "Haryana": {"lat": 29.0588, "lng": 76.0856},
        "Himachal Pradesh": {"lat": 31.1048, "lng": 77.1734},
        "Jammu & Kashmir": {"lat": 33.7782, "lng": 76.5762},
        "Jharkhand": {"lat": 23.6102, "lng": 85.2799},
        "Karnataka": {"lat": 15.3173, "lng": 75.7139},
        "Kerala": {"lat": 10.8505, "lng": 76.2711},
        "Ladakh": {"lat": 34.1526, "lng": 77.5771},
        "Lakshadweep": {"lat": 10.5667, "lng": 72.6417},
        "Madhya Pradesh": {"lat": 22.9734, "lng": 78.6569},
        "Maharashtra": {"lat": 19.7515, "lng": 75.7139},
        "Manipur": {"lat": 24.6637, "lng": 93.9063},
        "Meghalaya": {"lat": 25.4670, "lng": 91.3662},
        "Mizoram": {"lat": 23.1645, "lng": 92.9376},
        "Nagaland": {"lat": 26.1584, "lng": 94.5624},
        "Odisha": {"lat": 20.9517, "lng": 85.0985},
        "Puducherry": {"lat": 11.9416, "lng": 79.8083},
        "Punjab": {"lat": 31.1471, "lng": 75.3412},
        "Rajasthan": {"lat": 27.0238, "lng": 74.2179},
        "Sikkim": {"lat": 27.5330, "lng": 88.5122},
        "Tamil Nadu": {"lat": 13.0827, "lng": 80.2707},
        "Telangana": {"lat": 18.1124, "lng": 79.0193},
        "Tripura": {"lat": 23.9408, "lng": 91.9882},
        "Uttar Pradesh": {"lat": 26.8467, "lng": 80.9462},
        "Uttarakhand": {"lat": 30.0668, "lng": 79.0193},
        "West Bengal": {"lat": 22.9868, "lng": 87.8550},
    }

    data = {}
    with open("data/RS_Session_254_AU_2484_2.csv", newline='', encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            state = row["State/UT"].strip()
            if state in state_coords:
                try:
                    vaccinated = int(row["Total Achievement - Total Doses Administered"].replace(",", ""))
                except Exception:
                    vaccinated = None
                coords = state_coords[state]
                data[state] = {
                    "vaccinated": vaccinated,
                    "lat": coords["lat"],
                    "lng": coords["lng"]
                }
    return JSONResponse(content=data)
