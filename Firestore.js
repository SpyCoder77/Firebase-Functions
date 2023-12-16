import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot, setDoc, getDoc, query, where, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const db = getFirestore(app);

//Functions

//Get Doc
async function getDocument(collectionId, documentId) {
    const docRef = db.doc(`collections/${collectionId}/documents/${documentId}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }
    return docSnap.data();
  }

  //For this, make sure to use it with await | e.g const documentData = await getDocument("collectionId", "documentId");
  
  //Set Doc
  const setDocument = async (collectionName, docName, data) => {
    if (!collectionName || !docName || !data) throw new Error("Required params missing");
    data = typeof data !== "object" ? JSON.parse(data) : data;
    await setDoc(doc(db, collectionName, docName), data);
    console.log(`Set doc "${docName}" in "${collectionName}"`);
  };
  
  //Usage
  const data = {
    title: "My Document Title",
    content: "This is the content of my document."
  };
  
  await setDocument("cities", "LA", data);
  
  //Delete Doc
  async function deleteDocument(collectionId, documentId) {
    const docRef = db.doc(`collections/${collectionId}/documents/${documentId}`);
    await deleteDoc(docRef);
  }
  
  //Get all docs where ____
  async function getDocsWhere(collectionId, fieldName, fieldValue) {
    const collectionRef = db.collection(`collections/${collectionId}/documents`);
    const query = query(collectionRef, where(fieldName, "==", fieldValue));
    const querySnapshot = await getDocs(query);
  
    const documents = [];
    for (const doc of querySnapshot.docs) {
      documents.push(doc.data());
    }
    return documents;
  }