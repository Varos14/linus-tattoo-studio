# Fix Pesapal Authentication Error

## Issue
Console error: "Deposit error: Error: Payment processing failed: Failed to authenticate with payment gateway" at handleDeposit in booking page.

## Root Cause
The error occurs in `src/lib/pesapal.ts` when attempting to authenticate with Pesapal API. This happens when:
1. PESAPAL_CONSUMER_KEY or PESAPAL_CONSUMER_SECRET environment variables are missing
2. The credentials are invalid for the specified environment
3. Environment mismatch (using production credentials in sandbox or vice versa)

## Steps to Fix

### 1. Verify Environment Variables
- [ ] Check that `.env.local` or `.env` contains:
  - `PESAPAL_CONSUMER_KEY=your_consumer_key_here`
  - `PESAPAL_CONSUMER_SECRET=your_consumer_secret_here`
  - `PESAPAL_ENVIRONMENT=sandbox` (or `production`)

### 2. Validate Credentials
- [ ] Ensure credentials match the environment:
  - Sandbox: Use sandbox credentials from Pesapal dashboard
  - Production: Use production credentials from Pesapal dashboard

### 3. Check Environment Configuration
- [ ] Verify `PESAPAL_ENVIRONMENT` is set correctly:
  - `sandbox` for testing (cybqa.pesapal.com)
  - `production` for live payments (pay.pesapal.com)

### 4. Test Authentication
- [ ] Restart the development server after updating environment variables
- [ ] Try making a deposit to verify the fix

## Additional Improvements Made
- [x] Modified `src/lib/pesapal.ts` to throw an error instead of just logging when credentials are missing
- [x] This will provide clearer error messages for configuration issues

## Files Modified
- `src/lib/pesapal.ts`: Improved error handling for missing credentials
