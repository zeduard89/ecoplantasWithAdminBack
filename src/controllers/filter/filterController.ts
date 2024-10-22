import { PlantasModel, MacetasModel, MaceterosModel } from "../../config/db";
import { IFilter, IPlantas, IMacetas, IMaceteros } from "../../types/types";

const filterController = async (filterData: IFilter): Promise<object> => {
  try {
    let filterArray: object[] = [];
    let emptyCatalogo = false;
    const { search, plantas, macetas, maceteros, filtrado } = filterData;


    // Los inputs con valores FALSE ---------------------------------
    if(plantas === false && macetas === false && maceteros === false ){

        const plantasArray = await PlantasModel.findAll();
        filterArray = [...filterArray, ...plantasArray];

        const macetasArray = await MacetasModel.findAll();
        filterArray = [...filterArray, ...macetasArray];

        const maceterosArray = await MaceterosModel.findAll();
        filterArray = [...filterArray, ...maceterosArray];

      // Filtrar resultados basado en el parámetro 'search'
      if (search) {
        // Eliminar espacios de la cadena de búsqueda
        const searchTerm = search.replace(/\s+/g, '').toLowerCase();

        filterArray = filterArray.filter((item) => {
          // Obtener el título y la descripción, eliminando espacios
          const title = (item as IPlantas | IMacetas | IMaceteros).title?.replace(/\s+/g, '').toLowerCase() || '';
          const description = (item as IPlantas | IMacetas | IMaceteros).description?.replace(/\s+/g, '').toLowerCase() || '';

          // Verificar si la cadena de búsqueda está presente en el título o la descripción
          return title.includes(searchTerm) || description.includes(searchTerm);
        });
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
      if(filterArray.length > 0){
        emptyCatalogo = true
      }
      return {filterArray,emptyCatalogo}
    }

    // Al menos un input con valor TRUE------------------------
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
    if(filterArray.length > 0){
      emptyCatalogo = true
    }
    return { filterArray, emptyCatalogo };

  } catch (error) {
    const errorMessage = (error as Error).message;
    return { errorMessage };
  }
}

export default filterController;
