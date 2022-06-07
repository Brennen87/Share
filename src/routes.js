import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { ROLES } from './common/constants';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/404';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import ProfilePublicPage from './pages/ProfilePublicPage';
import VendorsPage from './pages/VendorsPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfileEditPage from './pages/ProfileEditPage';
import SearchPage from './pages/SearchPage';
import InboxPage from './pages/InboxPage';
import FeedbackPage from './pages/FeedbackPage';
import TermsAndPolicePage from './pages/TermsAndPolicePage';
import TeamPage from './pages/TeamPage';
import ProjectPage from './pages/ProjectPage';
import ProjectCreatePage from './pages/ProjectCreatePage';
import AccountPage from './pages/AccountPage';
import AccountDeactivatedPage from './pages/AccountDeletePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import PaymentsPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import CustomersPage from './pages/CustomersPage/index';

const ROUTES = [
  {
    path: '/',
    component: RootPage,
    routes: [
      {
        path: '/',
        render: () => <Redirect to="/home" />,
        exact: true
      },
      {
        path: '/home',
        component: HomePage,
        exact: true,
        pageTitle: 'Kuprik - Home'
      },
      {
        path: '/login',
        component: LoginPage,
        exact: true,
        pageTitle: 'Kuprik - Log In'
      },
      {
        path: '/forgot',
        component: ForgotPasswordPage,
        exact: true,
        pageTitle: 'Kuprik - Forgot Password'
      },
      {
        path: '/password-reset/:uid/:token',
        component: PasswordRecoveryPage,
        exact: true,
        pageTitle: 'Kuprik - Reset Password'
      },
      {
        path: '/register',
        component: RegisterPage,
        exact: true,
        pageTitle: 'Kuprik - Sign Up'
      },
      {
        path: '/verify/:key',
        component: VerifyEmailPage,
        exact: true,
        pageTitle: 'Kuprik - Email Verification'
      },
      {
        path: '/profile/edit',
        component: ProfileEditPage,
        pageTitle: 'Kuprik - Profile',
        auth: user => !!user,
        exact: true
      },
      {
        path: '/vendors/:category',
        component: VendorsPage,
        pageTitle: 'Kuprik - Vendors',
        exact: true
      },
      {
        path: '/vendors',
        component: VendorsPage,
        pageTitle: 'Kuprik - Vendors',
        exact: true
      },
      {
        path: '/customers',
        component: CustomersPage,
        pageTitle: 'Kuprik - Customers',
        exact: true
      },
      {
        path: '/search',
        component: SearchPage,
        pageTitle: 'Kuprik - Search Result',
        exact: true
      },
      {
        path: '/inbox',
        component: InboxPage,
        pageTitle: 'Kuprik - Inbox',
        auth: (user, userStatus) => !!user && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: true
      },
      {
        path: '/projects',
        component: ProjectPage,
        pageTitle: 'Kuprik - Projects',
        auth: (user, userStatus) => !!user && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: true
      },
      {
        path: '/projects/create',
        component: ProjectCreatePage,
        pageTitle: 'Kuprik - Create New Project',
        auth: (user, userStatus) => !!user && user.role === ROLES.customer && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: true
      },
      {
        path: '/projects/:id',
        component: ProjectDetailPage,
        pageTitle: 'Kuprik - Project Detail',
        auth: (user, userStatus) => !!user && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: false
      },
      {
        path: '/feedback',
        component: FeedbackPage,
        pageTitle: 'Kuprik - Feedback And Support',
        exact: true
      },
      {
        path: '/terms',
        component: TermsAndPolicePage,
        pageTitle: 'Kuprik - Terms of Service',
        exact: true
      },
      {
        path: '/policy',
        component: TermsAndPolicePage,
        pageTitle: 'Kuprik - Privacy Policy',
        exact: true
      },
      {
        path: '/team',
        component: TeamPage,
        pageTitle: 'Kurpik - Team',
        auth: (user, userStatus) => !!user && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: true
      },
      {
        path: '/account',
        component: AccountPage,
        pageTitle: 'Kuprik - Account',
        auth: user => !!user,
        exact: true
      },
      {
        path: '/resources',
        component: ResourcesPage,
        pageTitle: 'Kuprik - Resources',
        exact: true
      },
      {
        path: '/account/deleted',
        component: AccountDeactivatedPage,
        pageTitle: 'Kuprik - Account Deleted',
        auth: user => !!user,
        exact: true
      },
      {
        path: '/payments',
        component: PaymentsPage,
        pageTitle: 'Kuprik - Payments',
        auth: (user, userStatus) => !!user && userStatus?.is_profile_completed && userStatus?.is_account_completed,
        exact: true
      },
      {
        path: '/about',
        component: AboutPage,
        pageTitle: 'Kuprik - About',
        exact: true
      },
      {
        path: '/not-found',
        component: PageNotFound,
        pageTitle: 'Not found'
      },
      {
        path: '/:role/:username',
        component: ProfilePublicPage,
        pageTitle: 'Kuprik - Public Profile',
        exact: true
      }
    ]
  }
];

export default ROUTES;
