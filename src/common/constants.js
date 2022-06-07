// eslint-disable-file
export const STRONG_PASSWORD_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
export const WEBSITE_REGEX = /(^$|^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$)/i;
export const ONLY_NUMBER_REGEX = /^[0-9]+$/;
export const US_DATE_FORMAT_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
export const CHAT_TYPES = {
  user: 'user',
  project: 'project'
};

export const POLICY = {
  title: 'Privacy Policy',
  effective: 'Effective Jule 26, 2019',
  describe:
    'Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS, ToU or T&C) are rules by which one must agree to abide in order to use a service. [1] Terms of service can also be merely a disclaimer, especially regarding the use of websites. \n\n' +
    'Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS, ToU or T&C) are rules by which one must agree to abide in order to use a service. [1] Terms of service can also be merely a disclaimer, especially regarding the use of websites. \n\n' +
    'Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS, ToU or T&C) are rules by which one must agree to abide in order to use a service. [1] Terms of service can also be merely a disclaimer, especially regarding the use of websites. \n\n' +
    ' Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS, ToU or T&C) are rules by which one must agree to abide in order to use a service. [1] Terms of service can also be merely a disclaimer, especially regarding the use of websites. \n\n' +
    ' Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS, ToU or T&C) are rules by which one must agree to abide in order to use a service. [1] Terms of service can also be merely a disclaimer, especially regarding the'
};

export const PROJECT_STATUSES = {
  ALL: 'All projects',
  IN_PROGRESS: 'In progress',
  PENDING_CANCELLATION: 'In progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

export const VENDOR_STATUSES = {
  MISSING: 'MISSING',
  IN_PROGRESS: 'IN_PROGRESS',
  INSUFFICIENT_CREDENTIALS: 'INSUFFICIENT_CREDENTIALS',
  CREDENTIALS_VERIFIED: 'CREDENTIALS_VERIFIED',
  ACKNOWLEDGED: 'ACKNOWLEDGED'
};

export const ROLES = {
  vendor: 'vendor',
  customer: 'customer'
};

export const ACC_TYPES = {
  business: 'company',
  individual: 'individual'
};

export const ALLOWED_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
export const ACCOUNT_DELETE_REASONS = [
  { value: '1', label: 'I do not have a need for your service' },
  { value: '2', label: "Reedsy wasn't the community that i was expecting." },
  { value: '3', label: 'I had a bad experience while collaborating.' },
  { value: '4', label: 'I have found other tools that fulfiil my needs.' }
];

export const CANCEL_REASONS_CUSTOMER = [
  { value: 'Reason 1', label: 'Reason 1' },
  { value: 'Reason 2', label: 'Reason 2' },
  { value: 'Reason 3', label: 'Reason 3' },
  { value: 'Reason 4', label: 'Reason 4' },
  { value: 'Reason 5', label: 'Reason 5' }
];

export const CANCEL_REASONS_VENDOR = [
  { value: 'Reason 1', label: 'Reason 1' },
  { value: 'Reason 2', label: 'Reason 2' },
  { value: 'Reason 3', label: 'Reason 3' },
  { value: 'Reason 4', label: 'Reason 4' },
  { value: 'Reason 5', label: 'Reason 5' }
];

export const CANCEL_WARNING_FOR_CUSTOMER =
  'Please acknowledge the cancellation of this project. Once the cancellation flow is completed, Kuprik team will initiate the refund/payment process based on our Cancellation, Refund and Payment policy.';

export const CANCEL_WARNING_FOR_VENDOR =
  'Please acknowledge the cancellation of this project. Once the cancellation flow is completed, Kuprik team will initiate the payment/refund process based on our Cancellation, Refund and Payment policy.';

export const PROJECT_CREATE_WARNING_TEXT =
  "We use Stripe to process payments on the Kuprik platform. Stripe processes charges on a Kuprik user's behalf. Although Kuprik initiates and manages the transactions, funds do not flow through the Kuprik platform itself but through Stripe. As a user of Kuprik, you do not need to have a separate account with Stripe. Stripe has a legal obligation to know who the Kuprik users are. To comply with local KYC (Know Your Customer) requirements, Stripe requires certain information as a part of the onboarding process. Therefore, to make/receive any payments on the Kuprik platform and avoid possible delays in processing transactions and payouts, you will need to fill out the Account Type information.";

export const NEW_PROJECT_WARNING_TEXT =
  'A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Magnoliophyta, also called angiosperms). The biological function of a flower is to effect reproduction, usually by providing a mechanism for the union of sperm with eggs. Flowers may facilitateoutcrossing (fusion of sperm and eggs from different individuals in a population) or allow selfing (fusion of sperm and egg from the same flower).';

export const ATTACHMENTS_LIMIT_TEXT =
  'Maximum upload file size is limited \n' +
  'to 10MB, \n' +
  'allowed file types in the \n' +
  'png, jpg, pdf.';

export const ATTACHMENTS_LIMIT_TEXTv2 =
  '(Maximum upload file size is limited to 10MB, allowed file types in the pdf, docx.)';

export const ATTACHMENTS_LIMIT_TEXTv3 =
  '(Maximum upload file size is limited \n' +
  'to 10MB, allowed file types in the \n' +
  'png, jpg, pdf, docx.)';

export const TEN_MB_AS_BYTES = 10 * 1024 * 1024;

export const REQUEST_DATE_FORMAT = 'YYYY-MM-DD';
export const MM_DD_YYY_DATE_FORMAT = 'MM / DD / YYYY';
export const MMM_DD_YYYY_FORMAT = 'MMM DD, YYYY';
export const HH_MM_A = 'hh:mma';
export const MM__DD_YYYY_HH_MM_A = 'MMM DD, YYYY hh:mma';

export const BUSINESS_TYPES = [
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'single_member_llc', label: 'Single-member LLC' }
  /* { value: 'multi_member_llc', label: 'Multi-member LLC' },
  { value: 'private_partnership', label: 'Private Partnership' },
  { value: 'private_corporation', label: 'Private Corporation' },
  { value: 'unincorporated_association', label: 'Unincorporated Association' },
  { value: 'public_corporation', label: 'Public Corporation' },
  { value: 'public_partnership', label: 'Public Partnership' } */
];

export const INDIVIDUAL_TYPES = [{ value: 'individual', label: 'Individual' }];

export const FILE_EXTENSIONS_OF_MIME_TYPES = {
  'application/atom+xml': 'atom',
  'application/json': ['json', 'map', 'topojson'],
  'application/ld+json': 'jsonld',
  'application/rss+xml': 'rss',
  'application/vnd.geo+json': 'geojson',
  'application/xml': ['rdf', 'xml'],
  'application/javascript': 'js',
  'application/manifest+json': 'webmanifest',
  'application/x-web-app-manifest+json': 'webapp',
  'text/cache-manifest': 'appcache',
  'audio/midi': ['mid', 'midi', 'kar'],
  'audio/mp4': ['aac', 'f4a', 'f4b', 'm4a'],
  'audio/mpeg': 'mp3',
  'audio/ogg': ['oga', 'ogg', 'opus'],
  'audio/x-realaudio': 'ra',
  'audio/x-wav': 'wav',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/jpeg': ['jpeg', 'jpg'],
  'image/jxr': ['jxr', 'hdp', 'wdp'],
  'image/png': 'png',
  'image/svg+xml': ['svg', 'svgz'],
  'image/tiff': ['tif', 'tiff'],
  'image/vnd.wap.wbmp': 'wbmp',
  'image/webp': 'webp',
  'image/x-jng': 'jng',
  'video/3gpp': ['3gp', '3gpp'],
  'video/mp4': ['f4p', 'f4v', 'm4v', 'mp4'],
  'video/mpeg': ['mpeg', 'mpg'],
  'video/ogg': 'ogv',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
  'video/x-flv': 'flv',
  'video/x-mng': 'mng',
  'video/x-ms-asf': ['asf', 'asx'],
  'video/x-ms-wmv': 'wmv',
  'video/x-msvideo': 'avi',
  'image/x-icon': ['cur', 'ico'],
  'application/msword': 'doc',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.debian.binary-package': 'deb',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'application/vnd.ms-fontobject': 'eot',
  'application/x-font-ttf': ['ttc', 'ttf'],
  'font/opentype': 'otf',
  'application/java-archive': ['ear', 'jar', 'war'],
  'application/mac-binhex40': 'hqx',
  'application/octet-stream': [
    'bin',
    'deb',
    'dll',
    'dmg',
    'img',
    'iso',
    'msi',
    'msm',
    'msp',
    'safariextz'
  ],
  'application/pdf': 'pdf',
  'application/postscript': ['ai', 'eps', 'ps'],
  'application/rtf': 'rtf',
  'application/vnd.google-earth.kml+xml': 'kml',
  'application/vnd.google-earth.kmz': 'kmz',
  'application/vnd.wap.wmlc': 'wmlc',
  'application/x-7z-compressed': '7z',
  'application/x-bb-appworld': 'bbaw',
  'application/x-bittorrent': 'torrent',
  'application/x-chrome-extension': 'crx',
  'application/x-cocoa': 'cco',
  'application/x-java-archive-diff': 'jardiff',
  'application/x-java-jnlp-file': 'jnlp',
  'application/x-makeself': 'run',
  'application/x-cd-image': 'iso',
  'application/x-opera-extension': 'oex',
  'application/x-perl': ['pl', 'pm'],
  'application/x-pilot': ['pdb', 'prc'],
  'application/x-rar-compressed': 'rar',
  'application/x-redhat-package-manager': 'rpm',
  'application/x-sea': 'sea',
  'application/x-shockwave-flash': 'swf',
  'application/x-stuffit': 'sit',
  'application/x-tcl': ['tcl', 'tk'],
  'application/x-x509-ca-cert': ['crt', 'der', 'pem'],
  'application/x-xpinstall': 'xpi',
  'application/x-ms-dos-executable': 'exe',
  'application/xhtml+xml': 'xhtml',
  'application/xslt+xml': 'xsl',
  'application/zip': 'zip',
  'text/css': 'css',
  'text/csv': 'csv',
  'text/html': ['htm', 'html', 'shtml'],
  'text/markdown': 'md',
  'text/mathml': 'mml',
  'text/plain': 'txt',
  'text/vcard': ['vcard', 'vcf'],
  'text/vnd.rim.location.xloc': 'xloc',
  'text/vnd.sun.j2me.app-descriptor': 'jad',
  'text/vnd.wap.wml': 'wml',
  'text/vtt': 'vtt',
  'text/x-component': 'htc',
  'application/x-desktop': 'desktop',
  'text/x-markdown': 'md',
  'text/vnd.trolltech.linguist': 'ts',
  'image/vnd.microsoft.icon': 'ico',
  'application/x-java-archive': 'jar',
  'application/x-sharedlib': 'so'
};

export const FILL_IN_ALL_REQUIRED_FIELDS = 'Please fill in all the required fields';

export const SELECT_PAYMENT = 'Please select a payment method';

export const paymentLevels = [
  {
    level: 'Level One',
    fee: 19,
    totalEarningsMin: 0,
    totalEarningsMax: 1000
  },
  {
    level: 'Level Two',
    fee: 17,
    totalEarningsMin: 1001,
    totalEarningsMax: 10000
  },
  {
    level: 'Level Three',
    fee: 15,
    totalEarningsMin: 10001,
    totalEarningsMax: null
  }
];

export const SSN_REQUIRING_COUNTRIES = ['united states of america', 'canada'];
