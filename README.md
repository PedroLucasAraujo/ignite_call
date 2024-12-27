# IgniteCall - Seamless Scheduling App

![Capa](https://github.com/user-attachments/assets/03c6aaf7-b5e0-4851-8a1f-9a5b49902ea9)

## About The Project

IgniteCall is a scheduling application designed to simplify the process of booking and managing appointments. Users can reserve a username, complete their profile using Google authentication, and set their availability for others to schedule meetings.

### Features
- User registration with username reservation and Google account linkage.
- Profile completion with availability preferences.
- Dynamic calendar with clickable dates to view available time slots.
- Appointment booking with confirmation and detailed event information (name, email, notes).
- Automatic event creation in Google Calendar with a meeting link.

<p align="right">(<a href="#readme-top">back to Top</a>)</p>

## Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Stitches (CSS-in-JS)](https://stitches.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest)
- [Day.js](https://day.js.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Next SEO](https://github.com/garmeeh/next-seo)
- [Nookies](https://github.com/maticzav/nookies)
- [Phosphor React Icons](https://phosphoricons.com/)
- [Zod](https://zod.dev/)
- PostgreSQL database (with Docker for local development)
- Google APIs

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- npm or Yarn
- Docker (for local PostgreSQL database)

### Environment Variables

Create a `.env` file in the root directory and include the following variables:

```env
# Database connection string for Prisma ORM
DATABASE_URL="" # Example: "postgresql://user:password@host:port/database_name"

# Direct connection string for specific database operations
DATABASE_DIRECT_URL="" # Same format as DATABASE_URL

# Google oAuth credentials
GOOGLE_CLIENT_ID="" # Client ID from Google Cloud Console
GOOGLE_CLIENT_SECRET="" # Client secret from Google Cloud Console

# Secret for NextAuth.js
NEXTAUTH_SECRET="" # Strong random string for securing session data
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/IgniteCall.git
   ```

2. Navigate to the project directory:
   ```bash
   cd IgniteCall
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up the local database:
   ```bash
   docker run --name postgres-ignitecall -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

## Usage

- Open the application in your browser at `http://localhost:3000`.
- Register with a username and connect your Google account.
- Configure your availability and share your calendar link with others.
- Manage and track appointments directly from your Google Calendar.

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>
