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
  type: "textInput" | "textArea" | "pinInput" | "switch" | "checkbox" | "select" | "file" | "image";
  val?: string | boolean;
  key: string;
  label: string;
  id: string;
  supportedFiles?: string; //separated by comma
}
