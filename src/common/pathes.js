export default class Pathes {
  static Auth = class {
    static user = 'auth/user/';
    static login = 'auth/login/';
    static fetchUserStatus = id => `user/status/`;    // This is not handled by the 3rd part plugin but an ordinary backend controller
    static logout = 'auth/logout/';
    static passwordChange = 'auth/password/change/';
    static passwordForgot = 'auth/password/reset/';
    static passwordReset = 'auth/password/reset/confirm/';
    static registration = 'auth/registration/';
    static registrationVerify = 'auth/registration/verify-email/';
    static deactivate = 'auth/account/deactivate/';
  };

  static File = class {
    static upload = 'files/';
  };

  static External = class {
    static country = 'https://restcountries.eu/rest/v2/all';
    // TODO: remove temporary external url:
    static fetchUserStatus = id => "https://6025097f36244d001797b57f.mockapi.io/api/user-status/1";
  };

  static Profile = class {
    static updateBasic = 'auth/user/';
    static updateSummary = id => `vendors/${id}/`;
    static sendVerificationDocuments = `vendors/add_verification/`;
    static acknowledgeVerification = `vendors/add_verification/acknowledge/`;
    static vendor = id => `vendors/${id}/`;
    static public = (role, username) => `profile/${role}/${username}/`;
  };

  static Portfolio = class {
    static createPortfolio = id => `vendors/${id}/portfolios/`;
    static fetchPortfolio = (id, query) => `vendors/${id}/portfolios/?${query}`;
    static editPortfolio = (vendorId, portfolioId) =>
      `vendors/${vendorId}/portfolios/${portfolioId}/`;
    static deletePortfolio = (vendorId, portfolioId) =>
      `vendors/${vendorId}/portfolios/${portfolioId}/delete/`;
  };

  static Common = class {
    static categories = 'services/';
    static expertises = 'genre_categories/';
    static experiences = 'genres/';
    static updateBilling = 'stripe/cards/update/';
    static feedback = 'support/email/';
  };

  static Search = class {
    static vendor = 'vendors/';
    static customer = 'customers/';
  };

  static Team = class {
    static teamList = (endpoint, query) => `team/${endpoint}/?${query}`;
    static remove = '/team/delete/';
  };

  static Vendors = class {
    static vendors = 'vendors/';
    static topVendors = 'vendors/top/';
  };

  static Customer = class {
    static customers = 'customers/';
    static topCustomers = 'customers/top/';
  };

  static Resources = class {
    static resources = query => `resources/?${query}`;
    static categories = 'resources/categories/';
  };

  static Review = class {
    static reviews = (role, id, query) => `${role}s/${id}/reviews/?${query}`;
  };

  static Inbox = class {
    static chats = 'chats/';
    static messages = (chatId, query) => `chats/${chatId}/messages/?${query}`;
  };

  static Account = class {
    static notifications = 'account_settings/';
    static information = 'personal_informations/';
    static switchRole = 'switch_role/';
    static changePassword = '/users/doChangePassword/';
    static type = '/user/stripe_account/create/';
  };

  static Projects = class {
    static detail = id => `projects/${id}/`;
    static list = query => `projects/?${query}`;
    static createIntent = 'stripe/project_intent/create/';
    static createPaymentIntent = 'stripe/payment_intent/create/';
    static acceptPaymentIntent = 'stripe/payment_intent/accept/';
    static savedCards = 'stripe/cards/';
    static extend = 'projects/extend/';
    static cancel = 'projects/doCancel/';
    static additionalPayments = id => `projects/${id}/additional-payments/`;
    static delivery = 'projects/delivery/';
    static getDelivery = id => `projects/${id}/delivery-review/`;
    static createCustomerReview = 'projects/customer/review/';
    static createVendorReview = 'projects/vendor/review/';
  };

  static Payments = class {
    static history = query => `projects/payments_history/?${query}`;
    static historyTotal = 'projects/payments_history/total/';
    static historyDownload = 'projects/payments_history/download/';
  };
}
