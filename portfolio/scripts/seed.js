/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase config missing in environment. Please ensure .env.local is populated.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
if (!fs.existsSync(dbPath)) {
  console.error("db.json not found!");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function seed() {
  console.log("Seeding Firestore with db.json data...");
  try {
    const docRef = doc(db, "portfolio", "data");
    await setDoc(docRef, data);
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
