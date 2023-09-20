import React from "react";
import { LoaderGif } from "../../assets";
import Image from "next/image";

const GifLoader = () => {
  return (
    <div className="overlay_loader  w-100">
      <div className="gif_loader">
        <Image
          // style={{
          //   minWidth: "unset",
          //   maxWidth: "unset",
          //   minHeight: "unset",
          //   maxHeight: "unset",
          // }}
          src={LoaderGif}
          // layout="responsive"
          height={200}
          width={400}
        />
      </div>
    </div>
  );
};

export default GifLoader;
