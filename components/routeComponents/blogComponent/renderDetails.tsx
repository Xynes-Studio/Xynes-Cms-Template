import { BlogModalProps } from "./blogComponent";
import BlogMeta from "./meta/blog.meta";

interface RenderDetailsProps extends BlogModalProps {
  type: "meta" | "comments" | "analytics" | string;
}

const RenderDetails: React.FC<RenderDetailsProps> = ({ type = "meta", item }) => {
  if (type === "meta") {
    return <BlogMeta item={item}/>;
  }
};
export default RenderDetails;
