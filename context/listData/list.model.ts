export interface Author {
  name?: string;
  avatar?: string;
  description?: string;
}

export interface ListItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  image?: string;
  active: boolean;
  author?: Author;
}
