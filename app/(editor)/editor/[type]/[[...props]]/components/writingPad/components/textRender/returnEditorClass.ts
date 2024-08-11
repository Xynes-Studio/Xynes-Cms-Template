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
