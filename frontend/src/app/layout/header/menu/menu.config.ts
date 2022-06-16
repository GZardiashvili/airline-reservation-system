import { MenuItem } from './menu-item';
import {
  faBed,
  faCar, faGlobe, faHome, faMapLocationDot,
  faPlaneDeparture, faSignsPost, faUser, faUserSecret,

} from '@fortawesome/free-solid-svg-icons';

export const MENU_CONFIG: MenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: faHome,
    route: '/home',
    permission: 'guest',
  },
  {
    id: 'flights',
    title: 'Flights',
    icon: faPlaneDeparture,
    route: '/flights',
    permission: 'guest',
  },
  {
    id: 'ars-manager',
    title: 'ARS Manager',
    icon: faUserSecret,
    route: '/ars-manager',
    permission: 'admin',
  }
];
