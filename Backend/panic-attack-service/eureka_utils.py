import uuid

import py_eureka_client.eureka_client as eureka_client
import requests

EUREKA_SERVER = "http://service-discovery:8761/eureka"
APP_NAME = "panic-attack-service"
INSTANCE_ID = f"{APP_NAME}:{str(uuid.uuid4()).replace('-', '')}"


async def register_with_eureka(port):
    await eureka_client.init_async(
            eureka_server=EUREKA_SERVER,
            app_name=APP_NAME,
            instance_id=INSTANCE_ID,
            instance_host=APP_NAME,
            instance_port=port
    )


def deregister_from_eureka():
    requests.delete(f"{EUREKA_SERVER}/apps/{APP_NAME}/{INSTANCE_ID}")
