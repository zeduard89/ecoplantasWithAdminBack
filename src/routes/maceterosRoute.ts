import { Router, Request, Response } from "express"
import { IErrrorMessage } from "../types/types"
import { verifyToken } from '../middlewares/jwt.middleware'
import { upload } from '../middlewares/storage'
import { validateDimensions } from "../middlewares/sharpImages"
import uploadMaceterosController from "../controllers/upload/uploadMaceterosController"
import updateMaceterosController from "../controllers/update/updateMaceterosController"
import getAllMaceterosController from "../controllers/getAll/getAllMaceterosController"
import getMaceteroByIdController from "../controllers/getById/getMaceteroByIdController"
import deleteMaceteroByIdController from '../controllers/deleteById/deleteMaceteroByIdController'

import path from 'path';
import fs from 'fs';

const router = Router()

const SERVER_URL = process.env.SERVER_URL;



router.post("/uploadMacetero",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {
      const maceterosData = req.body;
      
      maceterosData.imageUrl = `${SERVER_URL}/${maceterosData.category}/${req.file?.filename}`
      const result: IErrrorMessage = await uploadMaceterosController(maceterosData)
        
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
  
router.put("/updateMacetero",verifyToken, upload.single('image'), validateDimensions, async (req: Request, res: Response) => {
  try {
  
    const maceteroData = req.body;
    
    if(!req.file || req.file === undefined){
      maceteroData.imageUrl = req.body.oldImageUrl
    }else{
      maceteroData.imageUrl = `${SERVER_URL}/${maceteroData.category}/${req.file?.filename}`
      
      // Como existe una imagen en File, Borro la imagen anterior
      const imageToDelete = req.body.oldImageUrl.split(`${SERVER_URL}`)[1]
      const filePath = path.resolve(__dirname, '..', 'storage'+imageToDelete);
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const result: IErrrorMessage = await updateMaceterosController(maceteroData )
            
    if(result.errorMessage){
      res.status(400).json(result);
      return
    }
    res.status(200).json(true);
      
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(400).send(errorMessage)
  }
})  

router.get("/getAllMaceteros",verifyToken, async (_req: Request, res: Response) => {
  try {
      const result: IErrrorMessage = await getAllMaceterosController()
          
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

router.get("/getMacetero/:id",verifyToken, async (req: Request, res: Response) => {
  try {
      const maceteroId: number = parseInt(req.params.id)

      const result: IErrrorMessage = await getMaceteroByIdController(maceteroId)
          
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

  router.delete("/deleteMaceteroById/:id",verifyToken, async (req: Request, res: Response) => {
    try {
        const maceteroId: number = parseInt(req.params.id)
  
        const result: IErrrorMessage = await deleteMaceteroByIdController(maceteroId)
        
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