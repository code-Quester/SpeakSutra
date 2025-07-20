import React from 'react';
import Hero from '../components/Hero';
import WhyPublicSpeaking from '../components/WhyPublicSpeaking';
import ConquerStageFear from '../components/ConquerStageFear';
import WhatYouWillLearn from '../components/WhatYouWillLearn';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <WhyPublicSpeaking />
      <ConquerStageFear />
      <WhatYouWillLearn />
      <CallToAction />
    </>
  );
};

export default HomePage;