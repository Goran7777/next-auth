import { hash, compare } from 'bcryptjs';

export async function saltPassword(password) {
  const saltedPassword = await hash(password, 12);
  return saltedPassword;
}

export async function verifyPassword(password, saltedPassword) {
  const isValid = await compare(password, saltedPassword);
  return isValid;
}
