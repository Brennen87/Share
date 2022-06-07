const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'dev';
const DEV_BASE_URL = process.env.REACT_APP_DEV_BASE_URL || 'http://localhost:3000';
const DEV_API_URL = process.env.REACT_APP_DEV_API_URL || 'http://localhost:8000';
const DEV_SOCKET_URL = process.env.REACT_APP_DEV_SOCKET_URL || 'wss://be.kuprikdev.space';
const PREFIX = '/api/v1';
const WS_PREFIX = '/ws';
const STRIPE_API_KEY =
  process.env.REACT_APP_STRIPE_API_KEY || 'pk_test_SCauOzNUnJcXLZRPUMqnfjHy00GkPuthFy';

const getBaseURL = BASE_URL => (ENVIRONMENT === 'dev' ? DEV_BASE_URL : BASE_URL);
const getApiURL = API_URL => (ENVIRONMENT === 'dev' ? DEV_API_URL : API_URL);
const getSocketURL = SOCKET_URL => (ENVIRONMENT === 'dev' ? DEV_SOCKET_URL : SOCKET_URL);

const config = {
  baseURL: getBaseURL('https://be.kuprik.com'),
  socketURL: getSocketURL('wss://be.kuprik.com') + WS_PREFIX,
  apiURL: getApiURL('https://be.kuprik.com') + PREFIX,
  stripeApiKey: STRIPE_API_KEY
};

export default config;
