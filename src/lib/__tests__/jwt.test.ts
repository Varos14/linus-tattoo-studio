import { generateStudentToken, verifyStudentToken, StudentTokenData } from '../jwt';

// Mock jwt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

import jwt from 'jsonwebtoken';

const mockSign = jwt.sign as jest.MockedFunction<typeof jwt.sign>;
const mockVerify = jwt.verify as jest.MockedFunction<typeof jwt.verify>;

describe('JWT Utilities', () => {
  const mockTokenData: StudentTokenData = {
    studentId: '123',
    firstName: 'John',
    lastName: 'Doe',
    classApplying: 'Grade 10',
    studentType: 'Regular',
    parentEmail: 'parent@example.com',
    studentEmail: 'student@example.com',
    parentPhone: '+1234567890',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateStudentToken', () => {
    it('should generate a token with correct parameters', () => {
      const mockToken = 'mock.jwt.token';
      mockSign.mockReturnValue(mockToken as any);

      const result = generateStudentToken(mockTokenData);

      expect(mockSign).toHaveBeenCalledWith(mockTokenData, expect.any(String), {
        expiresIn: '24h'
      });
      expect(result).toBe(mockToken);
    });
  });

  describe('verifyStudentToken', () => {
    it('should verify and return decoded token data', () => {
      const mockToken = 'valid.jwt.token';
      mockVerify.mockReturnValue(mockTokenData as any);

      const result = verifyStudentToken(mockToken);

      expect(mockVerify).toHaveBeenCalledWith(mockToken, expect.any(String));
      expect(result).toEqual(mockTokenData);
    });

    it('should return null for invalid tokens', () => {
      const mockToken = 'invalid.jwt.token';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockVerify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = verifyStudentToken(mockToken);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('JWT verification failed:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});
