import { Router, Request, Response } from "express"
import { IErrrorMessage } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import { upload } from '../middlewares/storage'
import { validateDimensions } from "../middlewares/sharpImages"
import uploadMacetaController from "../controllers/upload/uploadMacetasController"
import updateMacetaController from "../controllers/update/updateMacetaController"
import getAllMacetasController from "../controllers/getAll/getAllMacetasController"
import getMacetaByIdController from "../controllers/getById/getMacetaByIdController"
import deleteMacetaByIdController from "../controllers/deleteById/deleteMacetaByIdController"

import path from 'path';
import fs from 'fs';
import { MacetasModel } from "../config/db"


const router = Router()

const SERVER_URL = process.env.SERVER_URL;



router.post("/uploadMaceta",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {
      const macetaData = req.body;

      macetaData.imageUrl = `${SERVER_URL}/${macetaData.category}/${req.file?.filename}`
       
      const result: IErrrorMessage = await uploadMacetaController(macetaData)
        
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

router.put("/updateMaceta",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {

    const macetaData = req.body;

    // Si existe una planta con el mismo título y no es la misma, borrar la imagen anterior y devolver un error
    const plantExist = await MacetasModel.findOne({
      where: {
        title: macetaData.title,
      },
    });

  if (plantExist && plantExist.id !== Number(macetaData.id)) {
          const imageToDelete = `/${macetaData.category}/${req.file?.filename}`
          const filePath = path.resolve(__dirname, '..', 'storage'+imageToDelete);
          console.log(filePath)
          if(fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
          }
      return res.status(400).json({ errorMessage: 'Título existente' });
    }


    if(!req.file || req.file === undefined){
      macetaData.imageUrl = req.body.oldImageUrl
    }else{
      macetaData.imageUrl = `${SERVER_URL}/${macetaData.category}/${req.file?.filename}`
      // Borro la imagen anterior
      const imageToDelete = req.body.oldImageUrl.split(`${SERVER_URL}`)[1]
      const filePath = path.resolve(__dirname, '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  
    const result: IErrrorMessage = await updateMacetaController(macetaData )
          
    if(result.errorMessage){
      return res.status(400).json(result);
    }
      return res.status(200).json(result);
      
    } catch (error) {
      const errorMessage =
      (error as Error).message
      return res.status(400).send(errorMessage)
    }
  }) 

router.get("/getAllMacetas",verifyToken, async (_req: Request, res: Response) => {
  try {
      const result: IErrrorMessage = await getAllMacetasController()
          
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

router.get("/getMaceta/:id",verifyToken, async (req: Request, res: Response) => {
  try {
      const MacetaId: number = parseInt(req.params.id)

      const result: IErrrorMessage = await getMacetaByIdController(MacetaId)
          
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

  router.delete("/deleteMacetaById/:id",verifyToken, async (req: Request, res: Response) => {
    try {
        const MacetaId: number = parseInt(req.params.id)
  
        const result: IErrrorMessage = await deleteMacetaByIdController(MacetaId)
            
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