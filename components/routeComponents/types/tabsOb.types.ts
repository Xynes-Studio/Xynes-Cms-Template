import { AssetProps } from "lumia-ui";
import React from "react";

export interface TabsObj {
  label: string;
  type: string;
  icon?: React.FC<AssetProps>;
}
