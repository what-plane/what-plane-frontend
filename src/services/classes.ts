import axios from "axios";

export interface ClassNamesData {
  class_names: Array<string>;
}

const fetchClasses = async (): Promise<ClassNamesData> => {
  let wpClassNames: ClassNamesData;

  // Get sasKey, container, etc.. from API
  try {
    const response = await axios.get<ClassNamesData>(
      "http://localhost:5000/classes/whatplane"
    );
    wpClassNames = response.data;
  } catch (e) {
    throw new Error(e);
  }
  return wpClassNames;
};

export default fetchClasses;
