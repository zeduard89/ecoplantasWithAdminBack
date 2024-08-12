import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import sharp from 'sharp';

// Middleware que valida el tamano de la imagen
export const validateDimensions = (req: Request, res: Response, next: NextFunction) : void => {
    
    let maxWidth: number;
    let maxHeight: number;
    const file = req.file as Express.Multer.File;

    // Si no se carga imagen y no existe URL de imagen anterior Tira Error
    if (!file && !req.body.oldImageUrl) {
      res.status(400).send({errorMessage:'No se cargo una Imagen'});
      return 
    }else if (req.body.oldImageUrl){
      return next();
    }

    switch (req.body.category) {
        case 'plantas':
            maxWidth = 1500;
            maxHeight = 1500;
            break;
        case 'macetas':
            maxWidth = 1500;
            maxHeight = 1500;
            break;
        case 'maceteros':
            maxWidth = 1600;
            maxHeight = 1700;
            break;
        default:
            return
    }
  
    // Use sharp to get image dimensions
    sharp(file.path)
      .metadata()
      .then(metadata => {
        if (metadata.width && metadata.height) {
          if (metadata.width > maxWidth || metadata.height > maxHeight) {
            // Elimina el archivo si las dimensiones son inválidas
            fs.unlinkSync(file.path);
            return res.status(400).send({errorMessage:'Las dimensiones de la imagen son demasiado grandes'});
          } else {
           return next();
          }
        } else {
          return res.status(400).send({errorMessage:'No se pudieron determinar las dimensiones de la imagen'});
        }
      })
      .catch(err => {
        fs.unlinkSync(file.path); // Limpia en caso de error
        console.error('Error procesando la imagen:', err);
        return res.status(500).send('Error procesando la imagen.');
      });
};
