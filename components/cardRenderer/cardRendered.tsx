import React from "react";
import styles from "./cardRendered.module.css";

export interface User {
  active?: boolean;
  approved?: boolean;
  avatar?: string;
  created_at?: string; // Consider using `Date` if you'll be converting to date objects
  email?: string;
  id?: string;
  name?: string;
  passwd?: string; // Typically you wouldn't include passwords in client-side types
  username?: string;
}

export interface CardDataOBJ {
  active: boolean;
  category?: string;
  created_at?: string;
  created_by?: string;
  des?: string;
  id: string;
  keywords?: string;
  thumbnail?: string;
  title?: string;
  updated_at?: string;
  user?: User;
}

export interface CardRendererProps {
  data: CardDataOBJ[];
  switchMethod: (obj: CardDataOBJ) => void;
  deleteMethod: (obj: CardDataOBJ) => void;
}

const cardRenderer:React.FC<CardRendererProps> = () => {
    return <></>
};

export default cardRenderer;
