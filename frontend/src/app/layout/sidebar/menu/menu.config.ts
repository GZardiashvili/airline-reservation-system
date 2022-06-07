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
  }
];
