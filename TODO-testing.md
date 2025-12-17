# Comprehensive Testing Plan for Linus Tattoo Studio

## Overview
This plan outlines thorough testing for the entire Next.js project, covering unit tests, integration tests, API tests, component tests, and build verification.

## Testing Framework Setup
- [ ] Install Jest, React Testing Library, and related testing dependencies
- [ ] Configure Jest for Next.js and TypeScript
- [ ] Set up test environment with Firebase mocking
- [ ] Add test scripts to package.json

## Unit Tests
- [ ] Test utility functions in `src/lib/`
  - [ ] Firebase timestamp conversion functions
  - [ ] JWT utilities
  - [ ] Email utilities
  - [ ] Payment utilities
  - [ ] Error message utilities
- [ ] Test database operations in `src/lib/db.ts`
  - [ ] Booking CRUD operations
  - [ ] Deposit CRUD operations
  - [ ] Query operations with filters
- [ ] Test action functions in `src/lib/actions/`

## API Route Tests
- [ ] Test `/api/booking` route
  - [ ] POST booking creation
  - [ ] Email sending (mocked)
  - [ ] Error handling
- [ ] Test `/api/checkout` route
  - [ ] Payment session creation
  - [ ] Deposit creation
- [ ] Test Pesapal callback and IPN routes
- [ ] Test admin export routes
  - [ ] Bookings export
  - [ ] Deposits export
- [ ] Test admin refund route

## Component Tests
- [ ] Test page components
  - [ ] Home page
  - [ ] Booking page
  - [ ] Gallery page
  - [ ] Artists page
  - [ ] FAQ page
  - [ ] Contact page
  - [ ] Admin pages (bookings, deposits)
- [ ] Test reusable components
  - [ ] Header
  - [ ] Footer
  - [ ] Container
  - [ ] Hero
  - [ ] Admin components (RefundButton)

## Integration Tests
- [ ] End-to-end booking flow
  - [ ] Form submission
  - [ ] Database storage
  - [ ] Email notification
- [ ] Payment flow
  - [ ] Checkout process
  - [ ] Payment verification
  - [ ] Deposit status updates
- [ ] Admin workflows
  - [ ] Viewing bookings/deposits
  - [ ] Export functionality
  - [ ] Refund processing

## Build and Quality Checks
- [ ] TypeScript compilation check
- [ ] ESLint check
- [ ] Build process verification
- [ ] Environment variable validation

## Test Execution
- [ ] Run all tests
- [ ] Generate coverage report
- [ ] Verify no regressions from recent TypeScript fixes
