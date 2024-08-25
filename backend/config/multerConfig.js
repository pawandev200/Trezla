import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const folderName = file.fieldname === 'logo' ? 'agency_logos' : 'agency_portfolio';
        return {
            folder: folderName,
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: `${file.originalname.split('.')[0]}_${Date.now()}`
        };
    }
});

const upload = multer({ storage });

export default upload;

