import { Router, Request, Response } from "express"
import { IFilterResponse } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import filterController from "../controllers/filter/filterController"
import getAllController from '../controllers/filter/getAllController'

const router = Router()

router.post("/filter",verifyToken, async (req: Request, res: Response) => {
  try {
      const filterData = req.body;
      const result: IFilterResponse = await filterController(filterData)
      
      if(result.errorMessage){
        res.status(400).send(result);
        return
      }
        res.status(200).json(result.filterArray);
    } catch (error) {
      const errorMessage =
        (error as Error).message
      res.status(400).send(errorMessage)
    }
  })

router.get("/getAll", async (_req: Request, res: Response) => {
  try {
      const result : IFilterResponse = await getAllController()
      if(result.errorMessage){
        res.status(400).send(result);
        return
      }
      res.status(200).json(result);
    } catch (error) {
      const errorMessage =
        (error as Error).message
      res.status(400).send(errorMessage)
    }
  })

export { router }