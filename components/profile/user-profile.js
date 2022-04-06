// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile(props) {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // Redirect away if NOT auth

  // if (status === 'loading') {
  //   return <p className={classes.profile}>loading ....</p>;
  // }
  // if (status === 'unauthenticated') {
  //   router.push('/auth');
  // }
  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.json();
    console.log(data);
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
