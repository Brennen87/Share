import iconFreelanceCustomer from '../../assets/icons/icon-homepage-head-gear.svg';
import iconFreelanceVendor from '../../assets/icons/icon-homepage-person.svg';
import iconCollaborate from '../../assets/icons/icon-homepage-communication.svg';
import iconPaymentCustomer from '../../assets/icons/icon-homepage-folder.svg';
import iconPaymentVendor from '../../assets/icons/icon-homepage-wallet-complete.svg';


export const MEDIA_LINKS = {
  EXPLAINER_VIDEO_CUSTOMERS: "https://public.kuprik.com/Explainer_Video_Customers.mp4",
  EXPLAINER_VIDEO_VENDORS: "https://public.kuprik.com/Explainer_Video_Vendors.mp4",
  SERVICE_FLOW_CUSTOMERS: "https://public.kuprik.com/Service_Flow_For_CUSTOMERS.pdf",
  SERVICE_FLOW_VENDORS: "https://public.kuprik.com/Service_Flow_For_VENDORS.pdf"
};

export const HOME_PAGE_SERVICES_CUSTOMER = [
  {
    icon: iconFreelanceCustomer,
    alt: 'Vendors',
    services: [
      {
        label: 'Find Help',
        description: 'Browse profiles\nand reviews. Create new\nprojects to hire people you like.'
      }
    ]
  },
  {
    icon: iconCollaborate,
    alt: 'Collaborate',
    services: [
      {
        label: 'Collaborate ',
        description: 'Use Kuprik\nplatform to communicate\nand share files.'
      }
    ]
  },
  {
    icon: iconPaymentCustomer,
    alt: 'Project Acceptance',
    services: [
      {
        label: 'Finish Projects',
        description: 'Receive finished\nprojects. When satisfied with the\nprojects, complete payments.'
      }
    ]
  }
];

export const HOME_PAGE_SERVICES_VENDOR = [
  {
    icon: iconFreelanceVendor,
    alt: 'Vendors',
    services: [
      {
        label: 'Create Profile',
        description: 'Create a professional\nprofile. Share what you\ncan do. Get to work.'
      }
    ]
  },
  {
    icon: iconCollaborate,
    alt: 'Collaborate',
    services: [
      {
        label: 'Collaborate ',
        description: 'Use Kuprik\nplatform to communicate\nand share files.'
      }
    ]
  },
  {
    icon: iconPaymentVendor,
    alt: 'Project Acceptance',
    services: [
      {
        label: 'Get Paid',
        description: 'Once projects are\ncompleted and approved,\nreceive your money.'
      }
    ]
  }
];