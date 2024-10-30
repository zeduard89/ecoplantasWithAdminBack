import { Router, Request, Response} from "express"
import { IErrrorMessage } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import { upload } from '../middlewares/storage'
import { validateDimensions } from "../middlewares/sharpImages"
import uploadPlantasController from "../controllers/upload/uploadPlantasController"
import updatePlantasController from "../controllers/update/updatePlantasController"
import getAllPlantsController from "../controllers/getAll/getAllPlantsController"
import getPlantByIdController from '../controllers/getById/getPlantByIdController'
import deletePlantaByIdController from '../controllers/deleteById/deletePlantByIdController'

import path from 'path';
import fs from 'fs';
import { PlantasModel } from "../config/db"

const router = Router()

const SERVER_URL = process.env.SERVER_URL;



router.post("/uploadPlant",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {
      const plantData = req.body;

      plantData.imageUrl = `${SERVER_URL}/${plantData.category}/${req.file?.filename}`
      const result: IErrrorMessage = await uploadPlantasController(plantData)
        
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

router.put("/updatePlant",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {

    const plantData = req.body;

    // Si existe una planta con el mismo título y no es la misma, borrar la imagen anterior y devolver un error
    const plantExist = await PlantasModel.findOne({
        where: {
          title: plantData.title,
        },
      });

    // console.log(plantData.id)
    console.log(plantExist?.dataValues.id)
    if (plantExist && plantExist.id !== Number(plantData.id)) {
    if (plantExist && Number(plantExist?.dataValues.id) !== Number(plantData.id)) {
            const imageToDelete = `/${plantData.category}/${req.file?.filename}`
            const filePath = path.resolve(__dirname, '..', 'storage'+imageToDelete);
            if(fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        return res.status(400).json({ errorMessage: 'Título existente' });
      }

    // Gestion de imagen si el titulo no existe
    if(!req.file || req.file === undefined){
      plantData.imageUrl = req.body.oldImageUrl
    }else{
      plantData.imageUrl = `${SERVER_URL}/${plantData.category}/${req.file?.filename}`
      // Como existe una imagen en File, Borro la imagen anterior
      const imageToDelete = req.body.oldImageUrl.split(`${SERVER_URL}`)[1]
      // __dirname , me posiciona en la carpeta "routes"
      const filePath = path.resolve(__dirname, '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    const result: IErrrorMessage = await updatePlantasController(plantData )

    if(result.errorMessage){
      res.status(400).json(result);
      return
      }
       return res.status(200).json(result);

      
      
    } catch (error) {
      const errorMessage =
      (error as Error).message
    return res.status(400).send(errorMessage)
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

  router.delete("/deletePlantabyId/:id",verifyToken, async (req: Request, res: Response) => {
    try {
        const plantaId: number = parseInt(req.params.id)
  
        const result: IErrrorMessage = await deletePlantaByIdController(plantaId)
            
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