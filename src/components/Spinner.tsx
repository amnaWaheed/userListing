import React, { FunctionComponent } from 'react';

interface SpinnerProps {}

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-50 w-50"></div>
  </div>
  );
};

export default Spinner;
