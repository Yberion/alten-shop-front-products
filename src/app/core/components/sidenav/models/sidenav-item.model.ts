export interface SidenavItem {
  id: string;
  label: string;
  link: string;
  icon?: string;
  children?: SidenavItem[];
  enrichedUrl?: (routeParams: unknown) => string;
  childEntityLink?: string;
  limitedChildrenVisibility?: boolean;
  hidden?: boolean;
}
