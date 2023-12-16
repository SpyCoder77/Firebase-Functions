import { getStorage, ref, uploadBytes, getDownloadURL, list, listAll, deleteObject, getMetadata } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js';
const storage = getStorage(app);
const storageRef = ref(storage);

async function uploadFile(file) {
    try {
      const fileRef = ref(storageRef, file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      console.log('File uploaded successfully');
      console.log('Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async function deleteFile(filePath) {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async function getFileData(filePath) {
    try {
      const fileRef = ref(storage, filePath);
      const [downloadURL, metadata] = await Promise.all([
        getDownloadURL(fileRef),
        getMetadata(fileRef),
      ]);
  
      return { downloadURL, metadata };
    } catch (error) {
      console.error('Error retrieving file data:', error);
      return null;
    }
  }

  async function listAllStorage(path) {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      const files = result.items;
      const directories = result.prefixes;
  
      console.log('Files:');
      files.forEach((fileRef) => {
        console.log('File:', fileRef.name);
      });
  
      console.log('Directories:');
      directories.forEach((directoryRef) => {
        console.log('Directory:', directoryRef.name);
      });
    } catch (error) {
      console.error('Error listing files and directories:', error);
    }
  }