interface MetaTag {
  name?: string; // Name attribute for general meta tags (e.g., description, keywords)
  content?: string; // Content for the meta tag
  charset?: string; // Character encoding (e.g., UTF-8)
  httpEquiv?: string; // HTTP-equivalent attribute (e.g., X-UA-Compatible)
  property?: string; // Property attribute for Open Graph or similar (e.g., og:title, og:description)
}

interface HTMLMetaObj {
  title: string; // Title of the HTML document
  metaTags: MetaTag[]; // Array of meta tags
}
