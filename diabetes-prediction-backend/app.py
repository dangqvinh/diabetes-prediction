# Load model
import joblib
reg = joblib.load("xgboost_diabetes_model.joblib")

input_features = [
    'HighBP', 
    'HighChol', 
    'BMI', 
    'Stroke', 
    'PhysActivity', 
    'HeartDiseaseorAttack', 
    'GenHlth', 
    'PhysHlth', 
    'Income', 
    'Education', 
    'Age', 
    'DiffWalk', 
    'CholCheck', 
    'HvyAlcoholConsump', 
    'MentHlth'
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
    HeartDiseaseorAttack: float
    GenHlth: float
    PhysHlth: float
    Income: float
    Education: float
    Age: float
    DiffWalk: float
    CholCheck: float
    HvyAlcoholConsump: float
    MentHlth: float

@app.post("/predict")
async def predict_diabetes(input_data: DiabetesInput):
    try:
        input_dict = input_data.dict()
        input = [input_dict[feature] for feature in input_features]
        prediction = reg.predict([input])
        diabetes_risk = bool(prediction[0])
        return {
            "diabetes_risk": diabetes_risk
        }
    except Exception as e:
        return {"error": str(e)}