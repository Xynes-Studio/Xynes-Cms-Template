import { ListItem } from "@/context/listData/list.model";
import { renderOBJ } from "../[renderPath]/renderItems/renderItems.types";
import { AssetProps, LmCkAttachment, LmCkBell, LmCkReact } from "lumia-ui";
import React from "react";
import { v4 as uuid } from "uuid";
import BlogModalComponent from "@/components/routeComponents/blogComponent/blogComponent";

export type actionTypes =
  | "open-modal-right"
  | "open-modal-left"
  | "open-modal"
  | null
  | undefined;

export interface ModalActionComponent {
  type: actionTypes;
  actionComponent?: React.FC<{ item?: ListItem }>;
  onHide?: ()=>void;
}  
export interface ListActionComponent {
  type: actionTypes;
  actionComponent?: React.FC<{ item?: ListItem }>;
  onHide?: ()=>void;
}  

export interface RouteTypes {
  link: string;
  id: string;
  title: string;
  icon?: React.FC<AssetProps>;
  canAddBlog?: boolean;
  renderType: string;
  switchEndPoint?: string;
  deleteEndPoint?: string;
  fetchEndPoint?: string;
  action?: ModalActionComponent | ListActionComponent
}

export const routes: RouteTypes[] = [
  {
    id: uuid(),
    title: "Dashboard",
    link: "/",
    icon: LmCkAttachment,
    renderType: "",
  },
  {
    id: uuid(),
    title: "Blogs",
    link: "/blogs",
    icon: LmCkReact,
    canAddBlog: true,
    renderType: "cards",
    fetchEndPoint: "/blogs",
    deleteEndPoint: "/users/blogs/",
    switchEndPoint: "/users/blogs/",
    action: {
      type: 'open-modal-right',
      actionComponent: BlogModalComponent
    } as ModalActionComponent
  },
  {
    id: uuid(),
    title: "About",
    link: "/about",
    icon: LmCkBell,
    renderType: "cards",
  },
];
