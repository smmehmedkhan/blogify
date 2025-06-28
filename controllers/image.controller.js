/**
 * Upload an image
 * @param {*} req
 * @param {*} res
 * @returns
 */
export function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    return res.json({
      location: req.file.path, // The URL Cloudinary provides
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
