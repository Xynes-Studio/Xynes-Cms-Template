import { AssetProps, LmCkAttachment, LmCkBell, LmCkReact } from "lumia-ui";

export interface RouteTypes {
  link: string;
  title: string;
  icon?: React.FC<AssetProps>;
  blog?: boolean;
}

export const routes: RouteTypes[] = [
  {
    title: "Dashboard",
    link: "/",
    icon: LmCkAttachment,
  },
  {
    title: "Blogs",
    link: "/blogs",
    icon: LmCkReact,
    blog: true,
  },
  {
    title: "About",
    link: "/about",
    icon: LmCkBell,
  },
];
