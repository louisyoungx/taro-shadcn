import { PropsWithChildren } from 'react';
import { H5NavBar } from './h5-navbar';

export const H5Container = ({ children }: PropsWithChildren) => {
  if (TARO_ENV !== 'h5') {
    return <>{children}</>;
  }

  return (
    <>
      <H5NavBar />
      {children}
    </>
  );
};
