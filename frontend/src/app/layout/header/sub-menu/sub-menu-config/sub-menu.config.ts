import { SubMenuItem } from './sub-menu.item';
import {
  faCalendarTimes, faGlobe, faPlane,
  faTicket, faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const SUB_MENU_CONFIG: SubMenuItem[] = [
  {
    id: 'airlines',
    title: 'Airlines',
    icon: faGlobe,
    route: '/airlines',
    permission: 'admin',
  },
  {
    id: 'planes',
    title: 'Planes',
    icon: faPlane,
    route: '/planes',
    permission: 'admin',
  },
  {
    id: 'manage-flights',
    title: 'Flights',
    icon: faCalendarTimes,
    route: '/manage-flights',
    permission: 'admin',
  },
  {
    id: 'tickets',
    title: 'Tickets',
    icon: faTicket,
    route: '/tickets',
    permission: 'admin',
  },
  {
    id: 'users',
    title: 'Users',
    icon: faUsers,
    route: '/users',
    permission: 'admin',
  }
];
