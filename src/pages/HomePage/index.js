import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  HOME_PAGE_SERVICES_CUSTOMER,
  HOME_PAGE_SERVICES_VENDOR,
  MEDIA_LINKS
} from './constants';
import ServiceCard from '../../components/Cards/ServiceCard';
import TopVendorsSection from '../../containers/Home/TopVendorsSection';
import TopCustomersSection from '../../containers/Home/TopCustomersSection';
import CategorySection from '../../containers/Home/CategorySection';
import './index.scss';
import { unmountComponentAtNode } from 'react-dom';
import { forceDownloadFileFromUrl } from '../../helpers';

// src/assets/icons/icon-play.svg

const HomePage = props => (
  <DocumentTitle title={props.route.pageTitle}>
    <div className="home_page">
      <WelcomeSection isCustomer={props.user ? props.user.role === 'customer' : true} />

      {!props.user || props.user.role === 'customer' ? (
        <>
          <CategorySection />
          <TopVendorsSection />
        </>
      ) : (
        <TopCustomersSection />
      )}

      <HowItWorksSection isCustomer={props.user ? props.user.role === 'customer' : true} />
      <VideoSection isCustomer={props.user ? props.user.role === 'customer' : true} />
    </div>
  </DocumentTitle>
);

const mapStateToProps = state => ({
  user: state.userStore.user
});

export default connect(mapStateToProps)(HomePage);

const WelcomeSection = ({ isCustomer }) => (
  <section className="hp_welcome_section">
    <div className="container">
      <div className="hp_welcome_section__inner">
        <div className="hp_welcome_section__title_description hp_welcome_section__title_description--intro">
          Ready To Impact Lives?
        </div>
        <div className="hp_welcome_section__title">The World is Waiting to Hear</div>
        <div className="hp_welcome_section__title_story">YOUR STORY</div>
        {isCustomer ? (
          <>
            <div className="hp_welcome_section__title_description">Get The Help You Deserve</div>
            <Link to="/vendors" className="hp_welcome_section__button">
              Find Vetted Vendors
            </Link>
          </>
        ) : (
          <>
            <div className="hp_welcome_section__title_description">Become Your Own Boss</div>
            <Link to="/customers" className="hp_welcome_section__button">
              Browse Customers
            </Link>
          </>
        )}
      </div>
    </div>
  </section>
);

const HowItWorksSection = ({ isCustomer }) => (
  <section className="hp_how_it_works_section">
    <div className="container hp_how_it_works_section__wrapper">
      <h2 className="hp_how_it_works_section__title">How Kuprik works</h2>
      <div className="hp_how_it_works_section__service_cards">
        { isCustomer
          ? HOME_PAGE_SERVICES_CUSTOMER.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))
          : HOME_PAGE_SERVICES_VENDOR.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))
        }
      </div>
    </div>
  </section>
);

const link =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

const VideoSection = ({ isCustomer }) => {
  const [playing, setPlaying] = React.useState(false);

  const video = React.useRef(null);

  const play = () => {
    video.current.play();
    setPlaying(true);
  };

  const toggleVideoPlay = () => {
    if (playing) {
      video.current.pause();
      setPlaying(false);
    } else {
      video.current.play();
      setPlaying(true);
    }
  }

  return (
    <section className="hp_video_section">
      <div className="container">
        <div className={playing ? "hp_video_section__wrapper_playing" : "hp_video_section__wrapper"}>

          <video 
            poster="https://i.imgur.com/4vJMIeA.png"
            className="hp_video_section__video" 
            ref={video} 
            onClick={toggleVideoPlay}>
            <source src={isCustomer ? MEDIA_LINKS.EXPLAINER_VIDEO_CUSTOMERS : MEDIA_LINKS.EXPLAINER_VIDEO_VENDORS} type="video/mp4" />
          </video>

          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={play}
          >
            <path
              d="M21.0938 58.9062C26.4062 64.1146 32.7083 66.7188 40 66.7188C47.2917 66.7188 53.5417 64.1146 58.75 58.9062C64.0625 53.5938 66.7188 47.2917 66.7188 40C66.7188 32.7083 64.0625 26.4583 58.75 21.25C53.5417 15.9375 47.2917 13.2812 40 13.2812C32.7083 13.2812 26.4062 15.9375 21.0938 21.25C15.8854 26.4583 13.2812 32.7083 13.2812 40C13.2812 47.2917 15.8854 53.5938 21.0938 58.9062ZM16.4062 16.5625C22.9688 10 30.8333 6.71875 40 6.71875C49.1667 6.71875 56.9792 10 63.4375 16.5625C70 23.0208 73.2812 30.8333 73.2812 40C73.2812 49.1667 70 57.0312 63.4375 63.5938C56.9792 70.0521 49.1667 73.2812 40 73.2812C30.8333 73.2812 22.9688 70.0521 16.4062 63.5938C9.94792 57.0312 6.71875 49.1667 6.71875 40C6.71875 30.8333 9.94792 23.0208 16.4062 16.5625ZM33.2812 55V25L53.2812 40L33.2812 55Z"
              fill="#044C5A"
            />
          </svg>
            
        </div>

        { isCustomer
        ? <p className="hp_video_section__flow-description">
            To see the step by step process, and details on cancellations, refunds and payments go to <span className="hp_video_section__flow-description-link" onClick={() => forceDownloadFileFromUrl(MEDIA_LINKS.SERVICE_FLOW_CUSTOMERS, "Service_Flow_For_CUSTOMERS.pdf")}>Kuprik Service Flow</span> for customers.
          </p>
        : <p className="hp_video_section__flow-description">
            To see the step by step process, and details on cancellations, refunds and payments go to <span className="hp_video_section__flow-description-link" onClick={() => forceDownloadFileFromUrl(MEDIA_LINKS.SERVICE_FLOW_VENDORS, "Service_Flow_For_VENDORS.pdf")}>Kuprik Service Flow</span> for vendors.
          </p>
        }

      </div>
    </section>
  );
}
