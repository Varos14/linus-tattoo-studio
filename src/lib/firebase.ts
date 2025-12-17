import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Type definitions
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  placement: string;
  size: string;
  style?: string;
  preferredDates?: string;
  budget?: string;
  references?: string;
  uploads?: string[];
  details: string;
  createdAt: Date;
}

export interface Deposit {
  id: string;
  sessionId: string;
  email?: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  mode?: string;
  paymentIntentId?: string;
  metadata?: any;
  bookingId?: string;
  createdAt: Date;
}

// Utility functions for timestamp conversion
export const timestampToDate = (timestamp: any): Date => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

export const dateToTimestamp = (date: Date) => {
  return date;
};
