import { Button, LmCkAdd, SearchInput } from "lumia-ui";
import styles from "./header.module.css";
import { routes, RouteTypes } from "@/app/navigation/route";

const Header = () => {
  return (
    <header className={styles.head}>
      <SearchInput className={styles.search} type='outline' placeholder="Search here..." />
      <Button
        icon={LmCkAdd}
        className={styles.Button}
        label={
          routes.filter(
            (i: RouteTypes) => i.link === window.location.pathname
          )[0].title
        }
      />
    </header>
  );
};

export default Header;
