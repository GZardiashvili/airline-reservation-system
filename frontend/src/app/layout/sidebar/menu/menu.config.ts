import { MenuItem } from './menu-item';
import {
  faBed,
  faCar, faGlobe, faMapLocationDot,
  faPlaneDeparture, faSignsPost,

} from '@fortawesome/free-solid-svg-icons';

export const MENU_CONFIG: MenuItem[] = [
  {
    id: 'flights',
    title: 'Flights',
    icon: faPlaneDeparture,
    route: '/flights',
    permission: 'guest',
  },
  {
    id: 'hotels',
    title: 'Hotels',
    icon: faBed,
    route: '/hotels',
    permission: 'guest',
  },
  {
    id: 'cars',
    title: 'Cars',
    icon: faCar,
    route: '/cars',
    permission: 'guest',
  },
  {
    id: 'activities',
    title: 'Activities',
    icon: faSignsPost,
    route: '/activities',
    permission: 'guest',
  },
  {
    id: 'explore',
    title: 'explore',
    icon: faGlobe,
    route: '/explore',
    permission: 'guest',
  },
  {
    id: 'trips',
    title: 'Trips',
    icon: faMapLocationDot,
    route: '/trips',
    permission: 'user',
  },
];
