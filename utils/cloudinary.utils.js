import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from '../config/env.js';

const options = {
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
};

cloudinary.config(options);

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = 'blogify/image';
    let allowedFormats = ['jpg', 'png', 'jpeg', 'webp', 'gif'];
    let transformation = [{ width: 800, height: 600, crop: 'limit' }];

    if (file.mimetype.startsWith('video/')) {
      folder = 'blogify/video';
      allowedFormats = ['mp4', 'webm', 'ogg'];
      transformation = [{ width: 1280, height: 720, crop: 'limit' }];
    } else if (file.mimetype.startsWith('audio/')) {
      folder = 'blogify/audio';
      allowedFormats = ['mp3', 'wav', 'ogg'];
      transformation = undefined;
    }

    return {
      folder,
      allowed_formats: allowedFormats,
      transformation,
      resource_type: file.mimetype.startsWith('video/')
        ? 'video'
        : file.mimetype.startsWith('audio/')
          ? 'video'
          : 'image',
    };
  },
});

export { cloudinary, storage };
