export interface SidenavItem {
  id: string;
  labels: Record<string, string>;
  link: string;
  icon?: string;
  children?: SidenavItem[];
  enrichedUrl?: (routeParams: unknown) => string;
  childEntityLink?: string;
  limitedChildrenVisibility?: boolean;
  hidden?: boolean;
}
