import torch
import numpy as np
import pickle

def map_to_tensor(data):
  with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

  scaled_data = scaler.transform(np.array(list(data.values())).reshape(1, -1))

  return torch.tensor(scaled_data).float()