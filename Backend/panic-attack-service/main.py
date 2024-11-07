import socket
import subprocess
import uuid
from contextlib import asynccontextmanager
from typing import List

import requests
from fastapi import FastAPI
from pydantic import BaseModel

from hrv_utils import calculate_hrv_metrics
from model_utils import get_prediction
from tensor_utils import map_to_tensor


def get_random_port():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.bind(('', 0))
        port = sock.getsockname()[1]
    finally:
        sock.close()
    return port


random_port = get_random_port()

if __name__ == "__main__":
    subprocess.run(["uvicorn", "main:app", "--port", str(random_port)])


@asynccontextmanager
async def lifespan(app: FastAPI):
    register_with_eureka()
    yield
    deregister_from_eureka()


app = FastAPI(lifespan=lifespan)

EUREKA_SERVER = "http://service-discovery:8761/eureka"
APP_NAME = "panic-attack-service"
INSTANCE_ID = f"{APP_NAME}:{str(uuid.uuid4()).replace('-', '')}"


# Eureka에 등록하기 위한 함수
def register_with_eureka():
    data = {
        "instance": {
            "instanceId": INSTANCE_ID,
            "hostName": socket.gethostname(),
            "app": APP_NAME.upper(),
            "ipAddr": socket.gethostbyname(socket.gethostname()),
            "status": "UP",
            "port": {"$": random_port, "@enabled": "true"},
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            }
        }
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(
            f"{EUREKA_SERVER}/apps/{APP_NAME}", json=data, headers=headers
    )
    return response.status_code


def deregister_from_eureka():
    requests.delete(f"{EUREKA_SERVER}/apps/{APP_NAME}/{INSTANCE_ID}")


class InputData(BaseModel):
    beats: List[float]


@app.post("/api/panic-attack/predict")
async def predict(input_data: InputData):
    input_values = calculate_hrv_metrics(input_data.beats)

    input_tensor = map_to_tensor(input_values)

    return {"isPanicDisorder": get_prediction(input_tensor)}
