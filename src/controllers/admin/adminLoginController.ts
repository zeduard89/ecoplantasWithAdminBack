import { IAdmin } from "../../types/types";
import { AdminModel } from "../../config/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const adminLoginController = async (adminData?: IAdmin): Promise<object> => {
  try {
    const secretKey = process.env.JWT_SECRET;


    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    if (!adminData?.email) {
      throw new Error('Datos incompletos: email');
    }
    if (!adminData?.password) {
      throw new Error('Datos incompletos: password');
    }

    const admin = await AdminModel.findOne({
      where: {
        email: adminData.email
      }
    });

    if (!admin) {
      throw new Error("Email no registrado");
    }

    // Compara la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(adminData.password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Password Incorrecto");
    }

    const token = jwt.sign(
      { tokenEmail: admin.email },
      secretKey,
      { expiresIn: '6h' }
    );

    return { ok: true, token };

  } catch (error) {
    const errorMessage = (error as Error).message;
    return { errorMessage };
  }
}

export default adminLoginController;