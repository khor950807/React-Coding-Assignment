# PROMPTS.md

This file documents how AI tools (ChatGPT) were used to assist in the development of this project.

---

## 🧠 Context

I used **ChatGPT** as a coding assistant throughout the project to:
- Improve code structure and readability
- Optimize React performance (avoid unnecessary re-renders)
- Write clear documentation (README, comments)
- Implement Redux logic for anime data and favourites
- Resolve TypeScript typing issues
- Follow React and Redux best practices
- Implement robust API requests with Axios
---

## 💬 Prompts and Usage

### 1. React Performance Optimization
**Prompt:**
> "React Best Practices - Proper hook usage, avoiding anti-patterns, efficient re-rendering"

**AI Assistance:**
ChatGPT explained how to apply `useMemo`, `useCallback`, and `React.memo` to optimize rendering performance in functional components.  
This helped me identify sections in `AnimeList.tsx` where I could memoize heavy operations and prevent unnecessary re-renders.

---

### 2. Debounced Search Functionality
**Prompt:**
> "How to apply debounce in React search input to reduce API calls?"

**AI Assistance:**
ChatGPT suggested using `lodash.debounce` wrapped inside `useCallback` to delay API requests until the user stops typing.  
This was implemented in `AnimeList.tsx` for efficient search handling.

---

### 3. Redux Slice Setup
**Prompt:**
> "Show me a Redux Toolkit slice example with async thunk for fetching anime list"

**AI Assistance:**
ChatGPT provided a clean example of using `createAsyncThunk` and `createSlice` to manage async API state.  
I adapted it to create `animeSlice.ts` and `animeFavouriteSlice.ts` for state management.

---

### 4. Robust API Requests (Cancellation, Retry, Error Handling)
**Prompt:**
> "How can I implement API request cancellation, retry logic with exponential backoff, and centralized error handling in React using Axios?"

**AI Assistance:**
ChatGPT suggested a design using:
- **Axios CancelToken** — to cancel previous requests if a new one is initiated, preventing race conditions during fast searches or multiple API calls.
- **Retry logic with exponential backoff** — automatically retries failed requests when hitting API rate limits (`HTTP 429`), with increasing delays between retries.
- **Centralized error handling** — logs and throws errors for network failures, invalid API responses, or other Axios errors in a single helper function.

**Implementation:**
- Created `apiHelpers.ts` containing:
  - `cancelTokens` map for tracking active requests
  - `getCancelToken(key)` to cancel previous request and create a new token
  - `requestWithRetry(key, requestFn)` to handle retries and exponential delays
  - `handleApiError(error)` for consistent error reporting

**Impact:**
- Prevents unnecessary API requests
- Smooths out user experience when API rate limits are hit
- Centralizes and standardizes error handling across all API calls

---