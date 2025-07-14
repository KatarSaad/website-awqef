# Authentication System for Awqef Website

This document provides an overview of the authentication system implemented for the Awqef website.

## Components

### 1. Auth Service (`src/lib/auth.ts`)
- Handles token storage using HTTP-only cookies
- Implements token refresh mechanism
- Provides token validation
- Manages user data in localStorage
- Handles login, logout, and session management

### 2. API Routes
- `/api/auth/set-cookies`: Sets secure HTTP-only cookies for authentication tokens
- `/api/auth/clear-cookies`: Clears authentication cookies during logout
- `/api/auth/validate`: Validates authentication tokens and handles token refresh

### 3. API Client (`src/lib/api-client.ts`)
- Automatically includes authentication headers
- Handles 401 responses with token refresh
- Redirects to login on authentication failures
- Queues requests during token refresh

### 4. Auth Context (`src/contexts/AuthContext.tsx`)
- Provides authentication state management
- Handles loading states for auth operations
- Implements error handling
- Manages user roles
- Includes HOC for protected routes

### 5. Auth Store (`src/hooks/useAuth.ts`)
- Manages authentication state using Zustand
- Provides methods for login, logout, registration
- Handles user profile updates
- Implements role-based access control

### 6. Middleware (`src/middleware.ts`)
- Protects routes based on authentication status
- Redirects unauthenticated users to login
- Implements role-based access control

### 7. Pages
- Login page (`src/app/login/page.tsx`)
- Registration page (`src/app/register/page.tsx`)
- Dashboard page (`src/app/dashboard/page.tsx`)
- Unauthorized page (`src/app/unauthorized/page.tsx`)

## Usage

### Protecting Routes

#### Using Middleware
Routes are automatically protected based on the configuration in `middleware.ts`.

#### Using HOC in Components
```tsx
import { withAuth } from "@/contexts/AuthContext";

function AdminPage() {
  // Component code
}

export default withAuth(AdminPage, { roles: ["admin"] });
```

### Accessing Auth Context
```tsx
import { useAuthContext } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  
  // Component code
}
```

### Role-Based Access Control
```tsx
import { useAuthContext } from "@/contexts/AuthContext";

function MyComponent() {
  const { hasRole, isAdmin, isModerator } = useAuthContext();
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      {hasRole(["admin", "moderator"]) && <ModeratorTools />}
      {hasRole("user") && <UserContent />}
    </div>
  );
}
```

## Security Features

1. **HTTP-only Cookies**: Tokens are stored in HTTP-only cookies to prevent XSS attacks
2. **Automatic Token Refresh**: Tokens are automatically refreshed when they expire
3. **Secure Headers**: Cookies are set with secure flags in production
4. **Role-Based Access**: Routes and components can be protected based on user roles
5. **Token Validation**: Tokens are validated on the server side

## Flow

1. User logs in with credentials
2. Server validates credentials and returns tokens
3. Tokens are stored in HTTP-only cookies
4. User information is stored in localStorage
5. Protected routes check for valid tokens
6. Tokens are automatically refreshed when they expire
7. User is redirected to login when authentication fails