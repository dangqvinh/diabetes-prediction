# Load model
import joblib
reg = joblib.load("xgboost_diabetes_model.joblib")

input_features = [
    'HighBP', 
    'HighChol', 
    'BMI', 
    'Stroke', 
    'PhysActivity'
]

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Diabetes Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],      # Cho phép tất cả method (POST, GET, ...)
    allow_headers=["*"],      # Cho phép tất cả header
)

@app.get("/")
async def health():
    return {"status": "ok"}

class DiabetesInput(BaseModel):
    HighBP: float
    HighChol: float
    BMI: float
    Stroke: float
    PhysActivity: float

@app.post("/predict")
async def predict_diabetes(input_data: DiabetesInput):
    try:
        input_dict = input_data.dict()
        X = [[input_dict[feature] for feature in input_features]]

        # Dự đoán xác suất
        proba = reg.predict_proba(X)[0]
        prob_no_diabetes = float(proba[0])
        prob_diabetes = float(proba[1])

        # Nhãn dự đoán
        prediction = int(prob_diabetes >= 0.5)

        return {
            "diabetes_risk": bool(prediction),
            "probability": {
                "no_diabetes": round(prob_no_diabetes * 100, 2),
                "diabetes": round(prob_diabetes * 100, 2)
            }
        }

    except Exception as e:
        return {"error": str(e)}
