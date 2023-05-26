import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

// Helper function to upload an image buffer to Cloudinary
async function uploadToCloudinary(imageBuffer, filename) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        imageBuffer,
        {
          public_id: `thumbnails/${filename}`,
          folder: 'your_folder_name', // Optional folder name in Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }