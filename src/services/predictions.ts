import axios from "axios";

const filenameRegex: string = "(?<=/)[^/?#]+(?=[^/]*$)";

const fetchPrediction = async (blobURL: string) => {
  console.log(blobURL);
  const filename = blobURL.match(filenameRegex) || [];
  const data = await axios
    .get(`https://whatplane-docker.azurewebsites.net/predict/${filename}`)
    .then((response) => {
      return response.data;
    });

  console.log(data);
  return {
    class_name: data.predictions[0].class_name,
    class_prob: data.predictions[0].class_prob,
  };
};

export default fetchPrediction;
