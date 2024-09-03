import { MacetasModel } from "../../config/db"
import { IMacetas} from '../../types/types'
import fs from 'fs';
import path from 'path';
const SERVER_URL = process.env.SERVER_URL;

const uploadMacetasController = async (macetasData?: IMacetas): Promise<object> => {
  try {
    if (!macetasData) {
      throw new Error('Datos son requeridos');
    }

    let {title,description,category,base,boca,altura,peso,capacidad,imageUrl} =macetasData

    if (!title) {
      throw new Error('Datos incompletos: title');}
    if(!description){
      description=''}
    if(!imageUrl){
      throw new Error('Datos incompletos: imagen');}
    
    const macetaExist = await MacetasModel.findOne({
      where:{title}
    })
    if(macetaExist){
      const imageToDelete = imageUrl.split(`${SERVER_URL}`)[1]
      const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error ('Maceta Existente');
    }

    const newMaceta = await MacetasModel.create({
      title,
      description,
      category,
      base,
      boca,
      altura,
      peso,
      capacidad,
      imageUrl
    })

    return {ok:true, msg:{newMaceta}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default uploadMacetasController