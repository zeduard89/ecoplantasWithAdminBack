import { AdminModel } from "../../config/db"
import { IAdmin} from '../../types/types'
import bcryptjs from 'bcryptjs'

const createAdmin = async (adminData?: IAdmin): Promise<object> => {
  try {
    if (!adminData) {
      throw new Error('Admin data is required');
    }

    const {userName,password,lastName,email} = adminData

    if (!userName) {
      throw new Error('Datos incompletos: userName');}
    if(!password){
      throw new Error('Datos incompletos: password');}
    if(!lastName){
      throw new Error('Datos incompletos: lastName');}
    if(!email){
      throw new Error('Datos incompletos: email');}
    
    const adminExist = await AdminModel.findOne({
      where:{email}
    })
    if(adminExist){
      throw new Error ('Admin Existente');
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    await AdminModel.create({
      userName,
      password: hashedPassword,
      lastName,
      email
    });

    return {ok:true, msg:'Creacion exitosa'};

    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default createAdmin