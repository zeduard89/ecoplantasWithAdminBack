import { PlantasModel, MacetasModel, MaceterosModel } from "../../config/db";
import { IFilter, IPlantas, IMacetas, IMaceteros } from "../../types/types";

const filterController = async (filterData: IFilter): Promise<object> => {
  try {
    let filterArray: object[] = [];
    const { search, plantas, macetas, maceteros, filtrado } = filterData;

    if (plantas) {
      const plantasArray = await PlantasModel.findAll();
      filterArray = [...filterArray, ...plantasArray];
    }

    if (macetas) {
      const macetasArray = await MacetasModel.findAll();
      filterArray = [...filterArray, ...macetasArray];
    }

    if (maceteros) {
      const maceterosArray = await MaceterosModel.findAll();
      filterArray = [...filterArray, ...maceterosArray];
    }

    // Filtrar resultados basado en el parámetro 'search'
    if (search) {
      filterArray = filterArray.filter((item) => 
        (item as IPlantas | IMacetas | IMaceteros).title?.includes(search) || 
        (item as IPlantas | IMacetas | IMaceteros).description?.includes(search)
      );
    }

    // Ordenar los resultados según el parámetro 'filtrado'
    if (filtrado) {
      if (filtrado === 'asc') {
        filterArray.sort((a, b) => (a as IPlantas | IMacetas | IMaceteros).title.localeCompare((b as IPlantas | IMacetas | IMaceteros).title));
      } else if (filtrado === 'desc') {
        filterArray.sort((a, b) => (b as IPlantas | IMacetas | IMaceteros).title.localeCompare((a as IPlantas | IMacetas | IMaceteros).title));
      } else if (filtrado === 'lastMonth') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filterArray = filterArray.filter((item) => (item as IPlantas | IMacetas | IMaceteros).createdAt && new Date() > oneMonthAgo);
      } else if (filtrado === 'lastYear') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        filterArray = filterArray.filter((item) => (item as IPlantas | IMacetas | IMaceteros).createdAt && new Date() > oneYearAgo);
      }
    }

    return { filterArray };

  } catch (error) {
    const errorMessage = (error as Error).message;
    return { errorMessage };
  }
}

export default filterController;
