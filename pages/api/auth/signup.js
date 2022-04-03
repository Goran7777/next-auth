import { connectToDatabase } from '../../../helpers/db';
import { saltPassword } from '../../../helpers/auth';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;
    const client = await connectToDatabase();
    const db = client.db();
    // check unique email
    const existingUser = await db.collection('users').findOne({
      email,
    });

    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      client.close();
      return;
    }
    const saltedPassword = await saltPassword(password);

    if (!email || !email.includes('@') || !password || password.length < 8) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const result = await db.collection('users').insertOne({
      email,
      password: saltedPassword,
    });
    res.status(201).json({ message: 'User successfully created' });
    client.close();
    console.log(`Email is ${email} and password is ${password}`);
  }
}

export default handler;
