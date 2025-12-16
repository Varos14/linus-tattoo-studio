import jwt from 'jsonwebtoken';

export interface StudentTokenData {
  studentId: string;
  firstName: string;
  lastName: string;
  classApplying: string;
  studentType: string;
  parentEmail: string;
  studentEmail?: string;
  parentPhone: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateStudentToken(data: StudentTokenData): string {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyStudentToken(token: string): StudentTokenData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as StudentTokenData;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
