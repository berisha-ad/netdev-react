# Search Logic Tests Documentation

This document describes the 4 test cases created for the search functionality in the NetDev Frontend application.

## Test Overview

The tests are located in `src/test/search.test.tsx` and focus on the core search logic implemented in the `SearchBar` component. These tests ensure that search queries are properly processed, validated, and navigated to the correct URLs.

## Test Cases

### 1. Valid Search Query Navigation
**Test Name**: `should navigate to search page with search query when form is submitted`

**Purpose**: Verifies that when a user enters a valid search query and submits the form, the application correctly navigates to the search page with the query as a URL parameter.

**Test Steps**:
- Render the SearchBar component
- Type "React Developer" in the search input
- Click the search button
- Verify navigation to `/search?search=React%20Developer`

**Expected Behavior**: The search query should be properly encoded and added to the URL parameters.

### 2. Empty Query Handling
**Test Name**: `should navigate to search page without search parameter when query is empty`

**Purpose**: Ensures that when no search query is provided, the application navigates to the search page without unnecessary URL parameters.

**Test Steps**:
- Render the SearchBar component
- Click the search button without entering any text
- Verify navigation to `/search` (no search parameter)

**Expected Behavior**: Empty searches should navigate to the base search page without query parameters.

### 3. Whitespace Trimming
**Test Name**: `should trim whitespace from search query before navigation`

**Purpose**: Validates that leading and trailing whitespace in search queries is properly removed before processing.

**Test Steps**:
- Render the SearchBar component
- Type "  JavaScript Developer  " (with leading/trailing spaces)
- Click the search button
- Verify navigation to `/search?search=JavaScript%20Developer`

**Expected Behavior**: Whitespace should be trimmed, and the clean query should be used for navigation.

### 4. Special Character Encoding
**Test Name**: `should properly encode special characters in search query`

**Purpose**: Ensures that special characters in search queries are properly URL-encoded to prevent navigation issues.

**Test Steps**:
- Render the SearchBar component
- Type "C# & .NET Developer" (with special characters)
- Click the search button
- Verify navigation to `/search?search=C%23%20%26%20.NET%20Developer`

**Expected Behavior**: Special characters like `#`, `&`, and `.` should be properly encoded in the URL.

## Test Configuration

### Dependencies
- **vitest**: Testing framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Additional DOM matchers
- **jsdom**: DOM environment for Node.js testing

### Mock Setup
The tests use mocks for:
- `useNavigate` hook from react-router-dom
- `useSearch` hook from the application
- `useAuth` context
- API calls

### Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run
```

## Test Coverage

These 4 tests cover the essential search functionality:
- ✅ Search query processing
- ✅ Navigation logic
- ✅ Input validation and cleaning
- ✅ URL parameter handling
- ✅ Special character handling

The tests focus on the user experience and ensure that search queries are handled correctly regardless of input format or content. 