import { MaceterosModel } from "../../config/db"
import { IMaceteros} from '../../types/types'

const uploadMaceterosController = async (maceterosData?: IMaceteros): Promise<object> => {
  try {
    if (!maceterosData) {
      throw new Error('Datos son requeridos');
    }

    let {title,description,category,base,altura,largo,imageUrl} = maceterosData

    if (!title) {
      throw new Error('Datos incompletos: title');}
    if(!description){
      description=''}
    if(!imageUrl){
      throw new Error('Datos incompletos: imagen');}
    
    const maceteroExist = await MaceterosModel.findOne({
      where:{title}
    })
    if(maceteroExist){
      throw new Error ('Macetero Existente');
    }

    const newMacetero = await MaceterosModel.create({
      title,
      description,
      category,
      base,
      altura,
      largo,
      imageUrl
    })

    return {ok:true, msg:{newMacetero}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default uploadMaceterosController