# AI Chatbot Frontend (ChatGPT-Style Console)

A modern Next.js React frontend engineered to interface with the multi-agent AI Chatbot backend. Built following the `AIDLC-frontend` boilerplate and styled after the ChatGPT dark interface.

## Features

- **ChatGPT Dark Aesthetic**: Replicates the ChatGPT UI palette (`#212121` main, `#171717` sidebar, `#2f2f2f` input container, and `#10a37f` emerald accents).
- **Session History Sidebar**:
  - "+ New chat" button.
  - Lists previous conversations with timestamps.
  - Target Platform switcher (`meribachat` vs `benefitwise`).
  - User Authentication Context configuration (`userId` and token) for testing authenticated queries (e.g. orders, vouchers).
- **Interactive Chat Interface**:
  - Dynamic empty state with quick prompt cards.
  - Auto-resizing message input with Enter to send and Shift+Enter for newlines.
  - Real-time loading indicator while orchestrator and Bedrock agents process requests.
  - Formatted message bubbles with one-click copy.
- **Backend API Integration**:
  - `POST /sessions/new`
  - `POST /sessions/:sessionId/message`
  - `GET /sessions`
  - `GET /session-message`

## Getting Started

### 1. Configure Environment
Check `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Run the Development Server
```bash
pnpm dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
