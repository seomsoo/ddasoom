import React from 'react';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
const Home = () => {
  console.log('hi');
  console.log('hi');

  return (
    <div>
      <Header label='라벨'/>
      <div className="text-5xl text-center font-hakgyoansimR font-b">
        숨 들이마시기 <br />
        <span className="font-hakgyoansimB">테스트</span>
      </div>
      <div className="flex flex-col">
        <span className="font-nanumLight text-3xl">테스트</span>
        <span className="font-nanumRegular text-3xl">테스트</span>
        <span className="font-nanumBold text-3xl">테스트</span>
        <span className="font-nanumExtraBold text-3xl">테스트</span>
        <span className="font-nanumHeavy text-3xl">테스트</span>
      </div>
      <Navbar/>
    </div>
  );
};

export default Home;
