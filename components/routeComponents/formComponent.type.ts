import { AssetProps } from "lumia-ui";

export interface TopActionItem {
  type: "edit" | "create";
  title: string;
  action: () => void;
}
export interface BottomActionItem {
  type: "save" | "cancel";
  title: string;
  action: () => void;
}

export interface FormElementData {
  type: "textInput" | "textArea" | "pinInput" | "switch" | "checkbox";
  val: string | boolean;
  key: string;
  id: string;
}

export interface TabElement {
  title: string;
  icon?: React.FC<AssetProps>;
  data: FormElementData[];
  topActionItems?: TopActionItem[];
  bottomActionItems?: BottomActionItem[];
}

export interface FormComponentElements {
  tabs: TabElement[];
}
