export interface BlogRenderItem {
  id: string;
  type: "text" | "image" | "divider" | "code" | "youtube";
  placeholder?: string;
  divider?: BlogRenderItem[];
  val: string;
}

export interface Meta {
  title: string; // The title of the blog post or item
  author: string; // The author of the blog post
  datePublished: string; // The publication date in ISO format
  tags?: string; // Optional array of tags related to the blog post
  description?: string; // Optional short description or summary
  thumbnailUrl?: string; // Optional URL to a thumbnail image
  lastModified?: string; // Optional date when the blog post was last modified
}
