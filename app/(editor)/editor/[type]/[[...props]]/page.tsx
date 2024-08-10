"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const Editor = () => {
  const params = useParams();
  const type = params.type;
  const props = params.props;

  useEffect(() => {
    console.log(type, props, "this?");
  }, [type, props]);

  return <>This one</>;
};

export default Editor;
