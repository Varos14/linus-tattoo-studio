import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  startAt,
  endAt,
} from 'firebase/firestore';
import { db, Booking, Deposit, timestampToDate, dateToTimestamp } from './firebase';

// Collections
const BOOKINGS_COLLECTION = 'bookings';
const DEPOSITS_COLLECTION = 'deposits';

// Booking operations
export const createBooking = async (data: Omit<Booking, 'id' | 'createdAt'>): Promise<string> => {
  // Filter out undefined values to prevent Firebase errors
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== undefined)
  );
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...cleanData,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getBooking = async (id: string): Promise<Booking | null> => {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: timestampToDate(data.createdAt),
    } as Booking;
  }
  return null;
};

export const getBookings = async (options: {
  where?: { field: string; op: any; value: any }[];
  orderBy?: { field: string; direction: 'asc' | 'desc' };
  limit?: number;
  search?: string;
  dateRange?: { from?: Date; to?: Date };
}): Promise<Booking[]> => {
  const { where: whereClauses, orderBy: orderByClause, limit: limitClause, search, dateRange } = options;

  let q = collection(db, BOOKINGS_COLLECTION);
  const constraints: QueryConstraint[] = [];

  // Add where clauses
  if (whereClauses) {
    whereClauses.forEach(({ field, op, value }) => {
      constraints.push(where(field, op, value));
    });
  }

  // Add date range filter
  if (dateRange) {
    if (dateRange.from) {
      constraints.push(where('createdAt', '>=', Timestamp.fromDate(dateRange.from)));
    }
    if (dateRange.to) {
      constraints.push(where('createdAt', '<=', Timestamp.fromDate(dateRange.to)));
    }
  }

  // Add search functionality (simple text search on name, email, placement, size)
  if (search) {
    // Firestore doesn't have full-text search, so we'll do client-side filtering
    // For production, consider using Algolia or Elasticsearch
  }

  // Add order by
  if (orderByClause) {
    constraints.push(orderBy(orderByClause.field, orderByClause.direction));
  } else {
    constraints.push(orderBy('createdAt', 'desc'));
  }

  // Add limit
  if (limitClause) {
    constraints.push(limit(limitClause));
  }

  const querySnapshot = await getDocs(query(q, ...constraints));
  let bookings = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
  } as Booking));

  // Client-side search if needed
  if (search) {
    const searchLower = search.toLowerCase();
    bookings = bookings.filter(booking =>
      booking.name.toLowerCase().includes(searchLower) ||
      booking.email.toLowerCase().includes(searchLower) ||
      booking.placement.toLowerCase().includes(searchLower) ||
      booking.size.toLowerCase().includes(searchLower)
    );
  }

  return bookings;
};

// Deposit operations
export const createDeposit = async (data: Omit<Deposit, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, DEPOSITS_COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateDeposit = async (id: string, data: Partial<Deposit>): Promise<void> => {
  const docRef = doc(db, DEPOSITS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    ...(data.createdAt && { createdAt: Timestamp.fromDate(data.createdAt) }),
  });
};

export const getDeposit = async (id: string): Promise<Deposit | null> => {
  const docRef = doc(db, DEPOSITS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: timestampToDate(data.createdAt),
    } as Deposit;
  }
  return null;
};

export const getDepositBySessionId = async (sessionId: string): Promise<Deposit | null> => {
  const q = query(collection(db, DEPOSITS_COLLECTION), where('sessionId', '==', sessionId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: timestampToDate(data.createdAt),
    } as Deposit;
  }
  return null;
};

export const getDeposits = async (options: {
  where?: { field: string; op: any; value: any }[];
  orderBy?: { field: string; direction: 'asc' | 'desc' };
  limit?: number;
  search?: string;
  dateRange?: { from?: Date; to?: Date };
  includeBooking?: boolean;
}): Promise<(Deposit & { booking?: Booking })[]> => {
  const { where: whereClauses, orderBy: orderByClause, limit: limitClause, search, dateRange, includeBooking } = options;

  let q = collection(db, DEPOSITS_COLLECTION);
  const constraints: QueryConstraint[] = [];

  // Add where clauses
  if (whereClauses) {
    whereClauses.forEach(({ field, op, value }) => {
      constraints.push(where(field, op, value));
    });
  }

  // Add date range filter
  if (dateRange) {
    if (dateRange.from) {
      constraints.push(where('createdAt', '>=', Timestamp.fromDate(dateRange.from)));
    }
    if (dateRange.to) {
      constraints.push(where('createdAt', '<=', Timestamp.fromDate(dateRange.to)));
    }
  }

  // Add order by
  if (orderByClause) {
    constraints.push(orderBy(orderByClause.field, orderByClause.direction));
  } else {
    constraints.push(orderBy('createdAt', 'desc'));
  }

  // Add limit
  if (limitClause) {
    constraints.push(limit(limitClause));
  }

  const querySnapshot = await getDocs(query(q, ...constraints));
  let deposits = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: timestampToDate(doc.data().createdAt),
  } as Deposit));

  // Client-side search if needed
  if (search) {
    const searchLower = search.toLowerCase();
    deposits = deposits.filter(deposit =>
      (deposit.email && deposit.email.toLowerCase().includes(searchLower)) ||
      deposit.sessionId.toLowerCase().includes(searchLower)
    );
  }

  // Include booking data if requested
  if (includeBooking) {
    const depositsWithBookings = await Promise.all(
      deposits.map(async (deposit) => {
        if (deposit.bookingId) {
          const booking = await getBooking(deposit.bookingId);
          return { ...deposit, booking: booking ?? undefined };
        }
        return { ...deposit, booking: undefined };
      })
    );
    return depositsWithBookings;
  }

  return deposits;
};
