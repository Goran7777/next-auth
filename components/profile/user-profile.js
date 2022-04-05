// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // Redirect away if NOT auth

  // if (status === 'loading') {
  //   return <p className={classes.profile}>loading ....</p>;
  // }
  // if (status === 'unauthenticated') {
  //   router.push('/auth');
  // }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
