import type { SidenavItem } from '../models/sidenav-item.model';

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'products',
    label: 'core.sidenav.items.products',
    link: 'products',
    icon: 'shopping-cart',
  },
  {
    id: 'admin',
    label: 'core.sidenav.items.admin',
    link: 'admin/products',
    icon: 'users',
  },
];
