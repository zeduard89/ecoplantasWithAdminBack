import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import multer, { StorageEngine } from 'multer';


// Define storage configuration for multer
const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const category = req.body.category 
    // Direccion de carpeta para almacenar la img + control si existe
    const imagesPath = path.resolve(__dirname, `../storage/${category}`);
    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }
    cb(null, imagesPath);
  },
  filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`);
  }
});

// Export the multer upload instance
export const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit for file size
});


