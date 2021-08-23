import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    })
  ],
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub
      return Promise.resolve(session)
    }
  }
});