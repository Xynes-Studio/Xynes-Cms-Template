export const blockStyleFn = (block: any) => {
  switch (block.getType()) {
    case "unstyled":
      return "customUnstyled";
    case "paragraph":
      return "customParagraph";
    case "header-one":
      return "customHeaderOne";
    case "header-two":
      return "customHeaderTwo";
    case "header-three":
      return "customHeaderThree";
    case "header-four":
      return "customHeaderFour";
    case "header-five":
      return "customHeaderFive";
    case "header-six":
      return "customHeaderSix";
    case "unordered-list-item":
      return "customUnorderedListItem";
    case "ordered-list-item":
      return "customOrderedListItem";
    default:
      return 'unstyled';
  }
};

export const textTypes: string[] = [
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Heading 4",
  "Heading 5",
  "Heading 6",
  "Normal Text",
];

export const blockStyleFromText = (block:String) =>{
  switch (block) {
    case "Heading 1":
      return "header-one";
    case "Heading 2":
      return "header-two";
    case "Heading 3":
      return "header-three";
    case "Heading 4":
      return "header-four";
    case "Heading 5":
      return "header-five";
    case "Heading 6":
      return "header-six";
    case "Heading 1":
      return "customUnstyled";
    case "Normal Text":
      return "paragraph";
    default:
      return 'unstyled';
  }
}

export const textFromBlockStyle = (blockStyle: string) => {
  switch (blockStyle) {
    case "header-one":
      return "Heading 1";
    case "header-two":
      return "Heading 2";
    case "header-three":
      return "Heading 3";
    case "header-four":
      return "Heading 4";
    case "header-five":
      return "Heading 5";
    case "header-six":
      return "Heading 6";
    case "customUnstyled":
      return "Custom Unstyled";
    case "paragraph":
      return "Normal Text";
    default:
      return "Normal Text";
  }
};

