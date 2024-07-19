import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { API_URL } from '../../../../lib/constants';

const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your-email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if(!credentials) {
          return null;
        }

        try {
          const res = await axios.post(`${API_URL}/api/auth/local`, {
            identifier: credentials.email,
            password: credentials.password,
          });
          const user = res.data.user;
          return user ? user : null;
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/new-user',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if(session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

// Create a handler for GET and POST requests
const handler = NextAuth(options);

// Export named handlers for GET and POST requests
export { handler as GET, handler as POST };
