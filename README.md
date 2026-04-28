# TestMu Assignment — Playwright Amazon Tests

An end-to-end test cases built with playwright that automates product search, price extraction, and add to cart flows on amazon.

---

## Test Cases

| ID   | File                   | Description                                                      |
|------|------------------------|------------------------------------------------------------------|
| TC1  | `tc1-iphone.spec.js`   | Search for **iPhone** → click first result → extract price → add to cart |
| TC2  | `tc2-galaxy.spec.js`   | Search for **Samsung Galaxy** → click first result → extract price → add to cart |

Each test follows the same flow:
1. Navigate to `amazon.com`
2. Type the product name in the search box and press Enter
3. Click the first search result
4. Attempt to extract the product price from the product detail page
5. Click Add to Cart (or Buy Now)

---

## Tech Stack

- Playwright — browser automation & testing
- Node.js — runtime
- Chromium — browser used for test execution

---

## Project Structure

```
testmu-assignment/
├── tests/
│   ├── tc1-iphone.spec.js      # TC1: iPhone
│   └── tc2-galaxy.spec.js      # TC2: Samsung Galaxy
├── test-results/               # Auto-generated tests
├── playwright.config.js        # Playwright config
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install chromium
```

### 3. Run all tests

```bash
npx playwright test
```

### 4. Run a specific test file

```bash
# TC1 — iPhone
npx playwright test tests/tc1-iphone.spec.js

# TC2 — Samsung Galaxy
npx playwright test tests/tc2-galaxy.spec.js
```

---

##  Limitations

Price may show `N/A` because some products require selecting a size/storage variant before a price or cart button appears.
