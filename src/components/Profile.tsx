import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any | null>(null); // Define proper type for user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?seed=${userId}`);
        setUser(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <img src={user.picture.large} alt="User" />
        <p>Name: {user.name.first} {user.name.last}</p>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default Profile;
