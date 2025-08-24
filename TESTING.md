# Manual QA Checklist

## Flows to Test
- [ ] Demo mode (Try Demo)
- [ ] Register new user
- [ ] Login as user
- [ ] Paid user flow (subscription/payment)
- [ ] Logout

## Browsers/Devices
- [ ] Chrome (desktop/mobile)
- [ ] Firefox (desktop/mobile)
- [ ] Safari (desktop/mobile)
- [ ] Edge (desktop)
- [ ] iOS/Android devices

## Edge Cases
- [ ] Invalid input
- [ ] Expired/invalid token
- [ ] Network errors

---

# Automated Testing & Monitoring

## Backend
- [ ] Add Jest or Mocha for API/unit tests
- [ ] Add tests for registration, login, payment, and demo endpoints

## Frontend
- [ ] Add React Testing Library for component tests
- [ ] Add Cypress for end-to-end tests
- [ ] Add tests for login, register, demo, and paid flows

## Monitoring
- [ ] Use console logs for development
- [ ] Set up Sentry, LogRocket, or Datadog for production error monitoring
- [ ] Add error boundaries in React
- [ ] Use Winston or Morgan for backend logging
