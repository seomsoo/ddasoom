import React from 'react';

import BreathHeart from '@/components/BreathHeart';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
const Home = () => {
  console.log('hi');
  console.log('hi');

  return (
    <div>
      <Header label='테스트'/>
      <BreathHeart timing={'basicTime'} />
      <Navbar/>
    </div>
  );
};

export default Home;
