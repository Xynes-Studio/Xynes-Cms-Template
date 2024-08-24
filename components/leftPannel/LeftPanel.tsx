import { Button, Flex, LmCkBell, LmLogOut } from "lumia-ui";
import styles from "./LeftPanel.module.css";
import NavigationStack from "@/app/navigation/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LeftPanel = () => {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };
  return (
    <Flex direction="column" className={styles.container}>
      <Flex className={styles.header}>
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={200}
          className={styles.logo}
        />
        <Flex className={styles.notification}>
          <Button
            icon={LmCkBell}
            borderRadius={100}
            className={styles.icon}
            type="label"
          />
        </Flex>
      </Flex>
      <div className={styles.navBar}>
        <NavigationStack />
      </div>

      <Button
        type="label"
        icon={LmLogOut}
        onClick={handleLogOut}
        label="Sign Out "
        iconAtEnd
        className={styles.logout}
      />
    </Flex>
  );
};

export default LeftPanel;
