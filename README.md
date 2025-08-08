
# Hackathon Project: Community Vaccination Tracking System (HC3)

## Problem Statement: HC3 - Community Vaccination Tracking System

### Context
Monitoring vaccination coverage in communities is important for public health. This project addresses the challenge of building a tool to track and visualize vaccination data in a community or organization.

### Challenge
Create a platform that records and displays vaccination status and coverage statistics.

## Core Features
- **Data Collection:** Collect anonymized vaccination data from participants or healthcare records.
- **Coverage Visualization:** Display coverage rates by demographic or location (e.g., maps, charts).
- **Reminders:** Send reminders for due or upcoming vaccines.

## Bonus Features
- **Outbreak Simulation:** Simulate outbreak risk based on coverage rates.
- **Government Data Integration:** Integrate with government APIs for official case counts.

## Project Structure
```
backend/    # Python FastAPI backend, data APIs, and processing
frontend/   # React + Vite frontend, UI components, and pages
model/      # Data science notebooks, scripts, and datasets
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.10+
- pip

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```sh
   python main.py
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Model/Notebook Usage
- Explore the `model/` folder for Jupyter notebooks and data analysis scripts.
- Open `f.ipynb` in Jupyter Lab/Notebook to run or modify data science experiments.

## Data Sources
- GeoJSON files for map visualizations
- CSV files for vaccination and case data

## Team & Credits
Developed by soumyaqqqqq and team during the 2025 hackathon.

## License
This project is for educational and demonstration purposes only.
