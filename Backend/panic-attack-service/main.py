import os
import subprocess
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

from eureka_utils import register_with_eureka, deregister_from_eureka
from hrv_utils import calculate_hrv_metrics
from model_utils import get_prediction
from random_port_utils import get_random_port
from tensor_utils import map_to_tensor


@asynccontextmanager
async def lifespan(app: FastAPI):
    await register_with_eureka(int(os.getenv("RANDOM_PORT")))
    yield
    await deregister_from_eureka()


app = FastAPI(lifespan=lifespan)


class InputData(BaseModel):
    beats: List[float]


@app.post("/api/panic-attack/predict")
async def predict(input_data: InputData):
    input_values = calculate_hrv_metrics(input_data.beats)

    input_tensor = map_to_tensor(input_values)

    return {"isPanicAttack": get_prediction(input_tensor)}


if __name__ == "__main__":
    random_port = get_random_port()

    env = os.environ.copy()
    env["RANDOM_PORT"] = str(random_port)

    subprocess.run(
            [
                "uvicorn",
                "main:app",
                "--host", "panic-attack-service",
                "--port", str(random_port)
            ],
            env=env
    )
