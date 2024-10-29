import React from 'react';

import Header from '@/components/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header label="자가진단" />
      {children}
    </div>
  );
}

export default layout;
