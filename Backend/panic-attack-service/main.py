from fastapi import FastAPI
from pydantic import BaseModel

from hrv_utils import calculate_hrv_metrics
from model_utils import get_prediction
from tensor_utils import map_to_tensor
from typing import List

class InputData(BaseModel):
  beats: List[float]

app = FastAPI()

@app.post("/api/panic-attack/predict")
async def predict(input_data: InputData):
  input_values = calculate_hrv_metrics(input_data.beats)

  input_tensor = map_to_tensor(input_values)

  return { "isPanicDisorder": get_prediction(input_tensor) }
