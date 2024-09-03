import { MaceterosModel } from "../../config/db"
import { IMaceteros} from '../../types/types'
import fs from 'fs';
import path from 'path';
const SERVER_URL = process.env.SERVER_URL;

const uploadMaceterosController = async (maceterosData?: IMaceteros): Promise<object> => {
  try {
    if (!maceterosData) {
      throw new Error('Datos son requeridos');
    }

    let {title,description,category,base,altura,largo,imageUrl} = maceterosData

    if (!title) {
      throw new Error('Datos incompletos: Titulo');}
    if(!description){
      description=''}
    if(!imageUrl){
      throw new Error('Datos incompletos: imagen');}
      if(base === '0' || base === ''){
        base = '20'}
        
    
    
    const maceteroExist = await MaceterosModel.findOne({
      where:{title}
    })
    if(maceteroExist){
      const imageToDelete = imageUrl.split(`${SERVER_URL}`)[1]
      const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
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