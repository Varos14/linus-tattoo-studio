import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb8iEF6rD3AE0VSxvAhbYyUe1RP8DKNPA",
  authDomain: "linus-tatoo-studio.firebaseapp.com",
  projectId: "linus-tatoo-studio",
  storageBucket: "linus-tatoo-studio.firebasestorage.app",
  messagingSenderId: "769818796854",
  appId: "1:769818796854:web:3fa7595339185fbaf6c997",
  measurementId: "G-J5S3NM3T3Y"
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
