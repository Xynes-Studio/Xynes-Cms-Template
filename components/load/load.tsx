import { useLottie } from "lottie-react";
import loadAnim from "./load.json";

const Loader = () => {
  const options = {
    animationData: loadAnim,
    loop: true,
    style: {
      width: "5rem",
      height: "5rem",
    },
  };

  const { View } = useLottie(options);

  return <div>{View}</div>;
};

export default Loader;
