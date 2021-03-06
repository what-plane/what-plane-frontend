import axios from "axios";

export interface PredictData {
  predictions: Array<Prediction>;
  predictor: string;
  topk: string;
}

export interface Prediction {
  class_name: string;
  class_prob: number;
  class_status?: string;
}

export const fetchPrediction = async (uuid: string): Promise<PredictData> => {
  let data: PredictData = await axios
    .get<PredictData>(
      `https://whatplane-docker.azurewebsites.net/predict/${uuid}`
    )
    .then((response) => {
      return response.data;
    });

  data = {
    ...data,
    predictions: data.predictions.map((pred) => {
      return {
        ...pred,
        class_prob: pred.class_prob * 100,
        class_status: calcClassStatus(pred.class_prob),
      };
    }),
  };

  return data;
};

const calcClassStatus = (classProb: number): string => {
  let predictionStatus: string;

  if (classProb > 0.8) {
    predictionStatus = "status-ok";
  } else if (classProb > 0.6) {
    predictionStatus = "status-warning";
  } else {
    predictionStatus = "status-error";
  }
  return predictionStatus;
};
