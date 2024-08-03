"use client";
import { Button, cx, email, Flex, password, TextInput } from "lumia-ui";
import React, { useState } from "react";
import styles from "./login.module.css";

const LogInClient: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  return (
    <Flex className={cx(styles.container)}>
      <Flex direction="column" className={cx(styles.content)}>
        <div className={styles.input}>
          <TextInput
            type="outline-only"
            className={styles.inputInside}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            validations={[email]}
            label="Enter your Email."
          />
        </div>
        <div className={styles.input}>
          <TextInput
            type="outline-only"
            inputType='password'
            value={userPassword}
            className={styles.inputInside}
            onChange={(e) => setUserPassword(e.target.value)}
            validations={[password.moderate]}
            label="Enter your password."
          />
        </div>

        <Button
          className={styles.button}
          label="Log In"
          onClick={() => {
            // Handle login logic here
            console.log("Email:", userEmail);
            console.log("Password:", userPassword);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default LogInClient;
