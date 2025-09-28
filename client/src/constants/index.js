import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/payment-methods',
    disabled: false,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
    disabled: false,
  },
  {
    name: 'analytics',
    imgUrl: dashboard, // Using dashboard icon for now
    link: '/analytics',
    disabled: false,
  },
  {
    name: 'admin',
    imgUrl: profile, // Using profile icon for now
    link: '/admin',
    disabled: false,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];