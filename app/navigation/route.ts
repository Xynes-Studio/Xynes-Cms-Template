import { AssetProps, LmCkAttachment, LmCkBell, LmCkReact } from "lumia-ui";

export interface RouteTypes {
  link: string;
  title: string;
  icon?: React.FC<AssetProps>;
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
  },
  {
    title: "About",
    link: "/about",
    icon: LmCkBell,
  },
];
