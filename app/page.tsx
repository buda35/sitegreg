import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import StorySection from '@/components/StorySection';
import ReviewSection from '@/components/ReviewSection';
import MenuPage from '@/components/MenuPage';
import Footer from '@/components/Footer';
import Image from 'next/image';
import GranulesArticle from '@/components/GranulesArticle';

export default function Home() {
  return (
    <main>
      <Navigation />
      <div id="home">
        <HeroSlider />
      </div>
      <div id="about">
        <StorySection />
      </div>
      <div id="granules-article">
        <GranulesArticle />
      </div>
      <div id="services">
        <MenuPage />
      </div>
      <div id="reviews">
        <ReviewSection />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
} 