**Playwright UI Test Suite for SauceDemo**

This project contains automated UI tests for SauceDemo, built with Playwright. It is designed to simulate real user behaviour and validate functionality across login, cart, checkout, and product sorting flows.

✅ Features Tested

Login tests (valid and invalid credentials)

Logout session behaviour

Shopping cart functionality (add, remove, persist items)

Checkout flow (successful and with missing fields)

Sorting products alphabetically

Error messages and form validations

Badge count assertions and conditional rendering

🛠 Tech Stack

Playwright

JavaScript (ES6+)

Node.js (>=18 recommended)

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/your-username/saucedemo-playwright-tests.git
cd saucedemo-playwright-tests

2. Install Dependencies

npm install

3. Run Tests

npx playwright test

🧪 Sample Test Example

test('TC1: User can login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="user-name"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

📌 Notes

These tests are written without Page Object Model to keep them beginner-friendly and concise for portfolio purposes.

Credentials are hardcoded (default users from SauceDemo).

Currently focused on UI testing. API testing will be added in the next phase.

🧭 Future Improvements

Add API tests using Playwright or Postman

Migrate to Page Object Model (POM)

Integrate with CI/CD pipeline (GitHub Actions)

Add environment variable support for credentials

📝 Manual Test Cases (JIRA)
A set of manual test cases used during the exploratory and planning phase is included for transparency and QA documentation purposes.

All manual test cases for this project are tracked in JIRA.

- 🔗 [JIRA Board](https://cvprojectandreeva.atlassian.net/jira/software/projects/SCRUM/boards/1?atlOrigin=eyJpIjoiNTE3NzYxYTE0YjMwNDU0MjkzNzRjNTRlYjA3MjE3MmEiLCJwIjoiaiJ9)
- 🗂️ Excel backup: [manual-tests/test-cases.xlsx](Manual test cases.xlsx)

👩‍💻 Author

Tanya AndreevaJunior QA Engineer | UI + API Testing📫 LinkedIn www.linkedin.com/in/tanya-andreeva-2b6877158


