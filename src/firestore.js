import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, deleteDoc, updateDoc, setDoc, doc, writeBatch } from 'firebase/firestore';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";

import updatedTelegramArr from './messages';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// initialize Firebase Authentication
export const auth = getAuth(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

// Functions for interacting with the Firestore database go here

// Update existing firestore doc

let docRef;

//const tradesRef = collection(db, 'trades');

/*const batch = writeBatch(db);
updatedTelegramArr.slice (0, 299).forEach(trade => {
  const tradeId = trade.id;
  const tradeRef = doc(db, 'trades', tradeId);
  batch.set(tradeRef, trade);
});
batch.commit()
.then(() => {
  console.log('Trades added to the collection successfully.');
})
.catch(error => {
  console.error('Error adding trades to the collection: ', error);
});*/

export const updateTradeHappened = async (tile) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "trades", tile.id);
  try {
    // Use the updateDoc function to update the "tradeHappened" field in the Firestore document
    await updateDoc(docRef, { tradeHappened: !tile.tradeHappened });
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const updateMyTarget = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to create / update myTarget in Firestore document
    await updateDoc(docRef, { myTarget: trade.myTarget})
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateScore = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to create / update 'win' in Firestore document
    await updateDoc(docRef, {
       score: trade.score,
       endDate: trade.endDate
      })
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateStartDate = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to update 'startDate' in Firestore document
    await updateDoc(docRef, { startDate: trade.startDate })
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateEndDate = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to update 'endDate' in Firestore document
    await updateDoc(docRef, { endDate: trade.endDate })
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateBought = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to create / update 'win' in Firestore document
    await updateDoc(docRef, { bought: trade.bought})
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateSold = async (trade) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "my trades", trade.id);

  try {
    // Use the updateDoc function to create / update 'win' in Firestore document
    await updateDoc(docRef, { sold: trade.sold})
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const updateTargetHits = async (tile) => {
  // Create a reference to the Firestore document for the trade tile with the given id
  docRef = doc(db, "trades", tile.id);

  try {
    // update individual targets
    await updateDoc(docRef, { 
      target1: { value: Number(tile.target1.value), hit: tile.target1.hit },
      target2: { value: Number(tile.target2.value), hit: tile.target2.hit },
      target3: { value: Number(tile.target3.value), hit: tile.target3.hit },
      target4: { value: Number(tile.target4.value), hit: tile.target4.hit },
      target5: { value: Number(tile.target5.value), hit: tile.target5.hit },
      target6: { value: Number(tile.target6.value), hit: tile.target6.hit },
    });    
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
  
// Add a new trade tile to the Firestore database for either of the collections
 
export const addTradeTile = async (tile, collectionName) => {
  // Determine the collection name
  let col = collectionName === 'my trades' ? 'my trades' : 'trades';

  // Determine the tile ID
  let tileId = collectionName === 'my trades' ? `${tile.id}-user1` : tile.id;

  // add parameters to 'my trades' tile
  let tileToAdd = collectionName === 'my trades' ? {
    ...tile,
    id: `${tile.id}-user1`,
    myTarget: 1,
    score: 'in trade',
    bought: tile.buy,
    sold: 0,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: "",
    } : tile;

  docRef = doc(db, col, tileId);
  try {
      await setDoc(docRef, tileToAdd);
      console.log(`Document written with ID: ${docRef.id} in ${col} collection`);        
  } catch(ex) {
      console.log(ex); 
  }
}



// Delete tile from firestore
  
export const deleteTradeTile = async (tileId, collectionName) => {
  // Determine the collection name
  let col = collectionName === 'my trades' ? 'my trades' : 'trades';

  const docRef = doc(db, col, tileId);
  try {
    await deleteDoc(docRef)
    console.log("Entire Document has been deleted successfully.");
  } catch(ex) {
    console.log(ex); 
  }
} 

export { db };
