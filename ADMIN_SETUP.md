# Admin Area Setup

This document explains how to set up the EcoHubs admin area with GitHub authentication.

## 1. GitHub OAuth App Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set the following:
   - **Application name**: EcoHubs Admin
   - **Homepage URL**: `http://localhost:5175` (for development)
   - **Authorization callback URL**: `http://localhost:5175/api/auth/callback`

## 2. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables:
   ```env
   # GitHub OAuth Configuration
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here

   # GitHub Repository Configuration
   GITHUB_OWNER=your_github_username_or_org
   GITHUB_REPO=your_repository_name

   # Optional: GitHub Organization for membership verification
   GITHUB_ORG=your_github_organization

   # Session Secret
   SESSION_SECRET=your_random_session_secret_here

   # Application URL
   PUBLIC_APP_URL=http://localhost:5175
   ```

## 3. Access Control

The admin area restricts access to users who are:
- Members of the specified GitHub organization (if `GITHUB_ORG` is set), OR
- Collaborators on the specified GitHub repository

## 4. Running the Application

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Visit `http://localhost:5175/admin/login` to access the admin area.

## 5. Features Implemented

- ✅ GitHub OAuth authentication
- ✅ Session management
- ✅ Protected admin routes
- ✅ Login/logout functionality
- ✅ User profile display
- ✅ Basic admin dashboard layout

## Next Steps

The following features will be implemented next:
- Branch management interface
- Content tree navigation
- Markdown editor integration
- Pull request management
- Media upload functionality
