import {lazy } from 'react';

const Listing = lazy(()=>import("../pages/Listing"));
const Profile = lazy(()=>import("../components/Profile"));

const Router = [
    {
      path: '/',
      element: <Listing/>,
    },
    {
      path: '/profile/:userId',
      element: <Profile />
    },
  ];
  

export default Router;
