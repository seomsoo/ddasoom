import torch
from torch import nn

class PanicDisorderLogisticRegressionModel(nn.Module):
  def __init__(self):
    super().__init__()
    self.logistic_stack = nn.Sequential(
        nn.Linear(4, 1),
        nn.Sigmoid()
    )

  def forward(self, data):
    return self.logistic_stack(data)

def get_prediction(data):
  with torch.no_grad():
    model = PanicDisorderLogisticRegressionModel()
    model.load_state_dict(torch.load("panic_disorder_model.pt"))
    model.eval()

    output = model(data)
    prediction = output.item() > 0.5

    return True if int(prediction) == 1 else False