import { Router, Request, Response } from "express"
import { IErrrorMessage } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import { upload } from '../middlewares/storage'
import { validateDimensions } from "../middlewares/sharpImages"
import uploadMacetaController from "../controllers/upload/uploadMacetasController"
import updateMacetaController from "../controllers/update/updateMacetaController"
import getAllMacetasController from "../controllers/getAll/getAllMacetasController"
import getMacetaByIdController from "../controllers/getById/getMacetaByIdController"

import path from 'path';
import fs from 'fs';

const router = Router()

const SERVER_URL = process.env.SERVER_URL;



router.post("/uploadMaceta",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {
      const macetaData = req.body;

      macetaData.imageUrl = `${SERVER_URL}/${req.file?.fieldname}/${req.file?.filename}`
       
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

    if(!req.file || req.file === undefined){
      macetaData.imageUrl = req.body.oldImageUrl
    }else{
      macetaData.imageUrl = `${SERVER_URL}/${req.file?.fieldname}/${req.file?.filename}`
      
      // Borro la imagen anterior
      const imageToDelete = macetaData.imageUrl.split(`${SERVER_URL}`)[1]
      const filePath = path.resolve(__dirname, '..', '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  
    const result: IErrrorMessage = await updateMacetaController(macetaData )
          
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


export { router }