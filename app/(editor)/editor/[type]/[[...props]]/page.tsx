"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const Editor = () => {
  const params = useParams();
  const type = params.type;
  const props = params.props;
  const isUpdate = props.length > 1;

  useEffect(() => {
    console.log(type, props, "this?");
  }, [type, props]);

  return <>This one</>;
};

export default Editor;
