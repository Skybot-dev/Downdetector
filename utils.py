import json
import os

def get_config():
    if "config.json" not in os.listdir():
        return None
    with open("config.json", "r") as fp:
        return json.load(fp)