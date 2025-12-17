import { sendBookingConfirmationEmail, sendDepositConfirmationEmail } from '../email';

// Mock Resend
const mockSend = jest.fn();
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

import { Resend } from 'resend';

describe('Email Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendBookingConfirmationEmail', () => {
    const mockBookingData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      placement: 'Arm',
      size: 'Medium',
      style: 'Traditional',
      preferredDates: '2024-01-15',
      budget: '$200-500',
      references: 'Dragon tattoo',
      details: 'Custom dragon design',
    };

    it('should send booking confirmation email successfully', async () => {
      mockSend.mockResolvedValue({ id: 'email-sent' });

      await sendBookingConfirmationEmail(mockBookingData);

      expect(mockSend).toHaveBeenCalledWith({
        from: 'Linus Tattoo Studio <noreply@linustattoostudio.com>',
        to: mockBookingData.email,
        subject: 'Booking Confirmation - Linus Tattoo Studio',
        html: expect.stringContaining('John Doe'),
      });
    });

    it('should handle email sending errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockSend.mockRejectedValue(new Error('Email service error'));

      await expect(sendBookingConfirmationEmail(mockBookingData)).rejects.toThrow('Email service error');

      consoleSpy.mockRestore();
    });
  });

  describe('sendDepositConfirmationEmail', () => {
    const mockDepositData = {
      email: 'john@example.com',
      amount: 100,
      currency: 'usd',
      bookingId: 'booking-123',
    };

    it('should send deposit confirmation email successfully', async () => {
      mockSend.mockResolvedValue({ id: 'email-sent' });

      await sendDepositConfirmationEmail(mockDepositData);

      expect(mockSend).toHaveBeenCalledWith({
        from: 'Linus Tattoo Studio <noreply@linustattoostudio.com>',
        to: mockDepositData.email,
        subject: 'Deposit Confirmation - Linus Tattoo Studio',
        html: expect.stringContaining('$100.00'),
      });
    });

    it('should handle email sending errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockSend.mockRejectedValue(new Error('Email service error'));

      await expect(sendDepositConfirmationEmail(mockDepositData)).rejects.toThrow('Email service error');

      consoleSpy.mockRestore();
    });
  });
});
