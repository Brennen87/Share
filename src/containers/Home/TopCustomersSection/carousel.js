import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { chunkArray } from '../../../helpers';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.scss';
import CustomerCard from '../../../components/Cards/CustomerCard/index';

const TopCustomersCarousel = ({ customers, groupSize, isMobile }) => {
  const slides = chunkArray(
    customers ? (isMobile ? customers.slice(0, groupSize * 3) : customers) : [],
    groupSize
  );

  const isEmpty = !slides.length;
  return (
    <Carousel
      swipeable
      infiniteLoop
      showIndicators
      showThumbs={false}
      showStatus={false}
      className={isMobile ? 'centered' : ''}
      renderArrowPrev={PrevButton}
      renderArrowNext={NextButton}
      render
    >
      {!isEmpty ? (
        slides.map((customersArray, index) => (
          <div className="top_vendors_carousel__slide" key={index}>
            <div className="top_vendors_carousel__slide__inner">
              <div className="top_vendors_carousel__cards">
                {customersArray.map(customer => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onRemove={false}
                    relatedChat={null}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div />
      )}
    </Carousel>
  );
};

export default TopCustomersCarousel;

const PrevButton = clickHandler => (
  <svg
    onClick={clickHandler}
    className="top_vendors_carousel__button top_vendors_carousel__prevButton"
    width="24"
    height="34"
    viewBox="0 0 24 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path d="M18 4L7 14.7324L18 26" stroke="#044C5A" strokeWidth="3" strokeLinecap="round" />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0.878418"
        y="0.5"
        width="22.6215"
        height="33"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const NextButton = clickHandler => (
  <svg
    onClick={clickHandler}
    className="top_vendors_carousel__button top_vendors_carousel__nextButton"
    width="24"
    height="34"
    viewBox="0 0 24 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path d="M6 4L17 14.7324L6 26" stroke="#044C5A" strokeWidth="3" strokeLinecap="round" />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0.5"
        y="0.5"
        width="22.6215"
        height="33"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
