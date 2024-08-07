import { Router, Request, Response } from "express"
import { IErrrorMessage } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import { upload } from '../middlewares/storage'
import { validateDimensions } from "../middlewares/sharpImages"
import uploadPlantasController from "../controllers/upload/uploadPlantasController"
import updatePlantasController from "../controllers/update/updatePlantasController"
import getAllPlantsController from "../controllers/getAll/getAllPlantsController"
import getPlantByIdController from '../controllers/getById/getPlantByIdController'

const router = Router()

const SERVER_URL = process.env.SERVER_URL;



router.post("/uploadPlant",verifyToken, upload.single('plantaImage'), validateDimensions, async (req: Request, res: Response) => {
  try {
      const plantData = req.body;

      const imageUrl = `${SERVER_URL}/${req.file?.fieldname}/${req.file?.filename}`
      plantData.imageUrl = imageUrl
      const result: IErrrorMessage = await uploadPlantasController(plantData)
        
      if(result.errorMessage){
        res.status(400).send(result);
        return
      }
      res.status(200).json(true);
    } catch (error) {
      const errorMessage =
        (error as Error).message
      res.status(400).send(errorMessage)
    }
  })

router.put("/updatePlant",verifyToken, upload.single('plantaImage'), validateDimensions, async (req: Request, res: Response) => {
  try {

    const plantData = req.body;
  
    plantData.imageUrl = `${SERVER_URL}/${req.file?.fieldname}/${req.file?.filename}`
    const result: IErrrorMessage = await updatePlantasController(plantData )
          
    if(result.errorMessage){
      res.status(400).json(result);
      return
      }
      res.status(200).json(true);
      
    } catch (error) {
      const errorMessage =
      (error as Error).message
    res.status(400).send(errorMessage)
    }
  })    

router.get("/getAllPlants",verifyToken, async (_req: Request, res: Response) => {
  try {
      const result: IErrrorMessage = await getAllPlantsController()
          
    if(result.errorMessage){
      res.status(400).json(result);
      return
      }
      res.status(200).json(result);
      
    } catch (error) {
      const errorMessage =
      (error as Error).message
    res.status(400).send(errorMessage)
    }
  })

router.get("/getPlant/:id",verifyToken, async (req: Request, res: Response) => {
  try {
      const plantId: number = parseInt(req.params.id)

      const result: IErrrorMessage = await getPlantByIdController(plantId)
          
    if(result.errorMessage){
      res.status(400).json(result);
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