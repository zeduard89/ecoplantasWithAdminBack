import { Router, Request, Response } from "express"
import { IAdmin, IErrrorMessage } from "../types/types"
import adminLoginController from "../controllers/admin/adminLoginController"
import createAdmin from "../controllers/admin/createAdmin"
import { verifyToken } from '../middlewares/jwt.middleware'

const router = Router()


router.post("/adminLogin", async (req: Request, res: Response) => {
  try {
    const adminData: IAdmin | undefined = req.body;
    
    const adminToken: IErrrorMessage = await adminLoginController(adminData)
    if(adminToken.errorMessage){
      res.status(400).json(adminToken);
      return;
    }
    res.status(200).json(adminToken)

  } catch (error) {
    const errorMessage =
      (error as Error).message
    res.status(400).send(errorMessage)
  }
})

router.post("/adminCreate",verifyToken, async (req: Request, res: Response) => {
    
  try {
        const adminData: IAdmin | undefined = req.body;

        const adminCreated: IErrrorMessage = await createAdmin(adminData)
        
        if(adminCreated.errorMessage){
          res.status(400).json(adminCreated);
          return;
        }
        res.status(200).json(adminCreated);
        

    } catch (error) {
      const errorMessage =
        (error as Error).message
      res.status(400).send(errorMessage)
    }
  })



export { router }