import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin SDK only if credentials are available
let adminDb: admin.firestore.Firestore | null = null;

if (!admin.apps.length) {
  try {
    let credential: admin.credential.Credential | undefined;

    // Try to read service account from file
    try {
      const serviceAccountPath = path.join(process.cwd(), 'src/lib/firebase-service-account.json');
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      credential = admin.credential.cert(serviceAccount);
    } catch (fileError) {
      console.warn('Service account file not found, trying environment variable');
    }

    // Fallback to environment variable
    if (!credential) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (serviceAccountKey) {
        const serviceAccount = JSON.parse(serviceAccountKey);
        credential = admin.credential.cert(serviceAccount);
      }
    }

    // If we have credentials, initialize
    if (credential) {
      admin.initializeApp({
        credential,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
      adminDb = admin.firestore();
    } else {
      console.warn('No Firebase Admin credentials available, Firestore will not be used');
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

export { adminDb };
