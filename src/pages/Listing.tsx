import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import { fetchUsers } from '../apiData';

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  cell:string;
  gender:string;
  login: {
    uuid: string;
  };
  dob: {
    age: number;
  };
  location: {
    country: string;
  };
}

const Listing: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    fetchUsers({page_number : 1}).then((res)=>{
      setUsers(res);
    });
  }, []);

  return (
    <>
       <div>
          <h4>All Users</h4>
       </div>
    
      <UserList users = {users}  setUsers ={ setUsers} />
    </>
  );
};

export default Listing;
