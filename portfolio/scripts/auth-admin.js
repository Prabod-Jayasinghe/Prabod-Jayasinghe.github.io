/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } = require('firebase/auth');

// Helper: Parse .env.local manually to load Firebase Config
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf-8');
  envFile.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let val = parts.slice(1).join('=').trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("❌ Firebase config missing. Please check portfolio/.env.local file.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const action = process.argv[2]; // 'reset' or 'create'
const email = process.argv[3] || 'shanprabodh@icloud.com';
const password = process.argv[4];

if (action === 'reset') {
  console.log(`Sending password reset email to: ${email}...`);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("✅ Success! Password reset email has been sent. Please check your inbox/spam folder.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error sending password reset email:", error.message);
      process.exit(1);
    });
} else if (action === 'create') {
  if (!password) {
    console.error("❌ Error: Password is required to create a new user. Usage: node scripts/auth-admin.js create <email> <password>");
    process.exit(1);
  }
  console.log(`Creating new user account: ${email}...`);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`✅ Success! User registered successfully. Email: ${userCredential.user.email}`);
      process.exit(0);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`ℹ️ Account '${email}' already exists. If you forgot the password, run:`);
        console.log(`   node scripts/auth-admin.js reset ${email}`);
      } else {
        console.error("❌ Error registering user:", error.message);
      }
      process.exit(1);
    });
} else {
  console.log("Usage instructions:");
  console.log("  To send a password reset email:");
  console.log("    node scripts/auth-admin.js reset <email>");
  console.log("  To register a new admin account:");
  console.log("    node scripts/auth-admin.js create <email> <password>");
  process.exit(0);
}
