const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket('rental-time');

function uploadFile(file, name) {
  return new Promise((resolve, reject) => {
    // console.log('圖片源 => ', file);
    const blob = bucket.file(name);
    const blobStream = blob.createWriteStream({
      contentType: file.mimetype,
      predefinedAcl: 'publicRead',
    });

    blobStream.on('error', (err) => reject(err));

    blobStream.on('finish', () => {
      const uploadedFile = bucket.file(blob.name);
      uploadedFile.getMetadata().then((data) => {
        const metadata = data[0];
        // console.log('metadata => ', metadata);
        return resolve(metadata.mediaLink);
      });
    });
    blobStream.end(file.buffer);
  });
}

module.exports = uploadFile;
