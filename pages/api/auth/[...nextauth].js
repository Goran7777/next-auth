import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (isValid) {
          console.log('password match');
        }

        if (!isValid) {
          client.close();
          console.log('Cant login!');
          throw new Error('Could not you log in!');
        }
        client.close();
        console.log(`User with email ${user.email} successfully logged in!`);
        return {
          email: user.email,
        };
      },
    }),
  ],
});
