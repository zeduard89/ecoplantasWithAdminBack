import { PlantasModel, MacetasModel, MaceterosModel } from "../../config/db";

const getAllController = async (): Promise<object> => {
  try {
    let filterArray: object[] = [];

    const plantasArray = await PlantasModel.findAll();
    filterArray = [...filterArray, ...plantasArray];
    
    const macetasArray = await MacetasModel.findAll();
    filterArray = [...filterArray, ...macetasArray];

    const maceterosArray = await MaceterosModel.findAll();
    filterArray = [...filterArray, ...maceterosArray];

    return { filterArray };

  } catch (error) {
    const errorMessage = (error as Error).message;
    return { errorMessage };
  }
}

export default getAllController;