import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string; // Add the id property
  }

  interface Session {
    user: User; // Ensure the session user includes the extended User type
  }
}
