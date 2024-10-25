import React from 'react';

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default RootLayout;
