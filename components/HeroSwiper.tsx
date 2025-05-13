'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: 'Delicious Food Delivered to Your Door',
    description: 'Discover a wide range of tasty meals prepared by expert chefs using the freshest ingredients.',
    image: '/images/slide1.jpg',
    btnText: 'Browse Menu',
    btnLink: '/products',
  },
  {
    id: 2,
    title: 'Fresh and Healthy Ingredients',
    description: 'We use only the freshest and highest quality ingredients in all our dishes.',
    image: '/images/slide2.jpg',
    btnText: 'Learn More',
    btnLink: '/about',
  },
  {
    id: 3,
    title: 'Special Offers and Discounts',
    description: 'Enjoy special discounts and offers on our wide range of delicious food items.',
    image: '/images/slide3.jpg',
    btnText: 'See Offers',
    btnLink: '/products',
  }
];

const HeroSwiper = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="hero-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div 
            className="position-relative" 
            style={{ 
              height: '600px', 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            ></div>
            <div className="container h-100 position-relative">
              <div className="row h-100 align-items-center">
                <div className="col-lg-6">
                  <div className="text-white">
                    <h1 className="display-4 fw-bold mb-4">{slide.title}</h1>
                    <p className="lead mb-5">{slide.description}</p>
                    <Link href={slide.btnLink} className="btn btn-primary btn-lg px-4">
                      {slide.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSwiper; 