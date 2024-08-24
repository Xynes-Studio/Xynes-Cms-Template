import React from "react";
import { DropDownProps } from "./dropDown.types";
import styles from "./dropDown.module.css";
import { cx, Flex, Text } from "lumia-ui";

const DropDown = React.forwardRef<HTMLSelectElement, DropDownProps>(
  ({ value, data = [], label, onChange, ...props }, ref) => (
    <Flex direction="column" className={cx(styles.container, props.className)}>
      {label && (
        <Text type="caption" className={styles.label}>
          {label}
        </Text>
      )}
      <select
        className={styles.select}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      >
        {data.map((item, index) => (
          <option className={styles.option} key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Flex>
  )
);

export default DropDown;
