import React from "react";
import { LoaderGif } from "../../assets";
import Image from "next/image";

const GifLoader = ({children}) => {
  return (
    <div className="fixed inset-0 bg-white">
      <div className="flex flex-col gap-4 justify-center items-center h-full">
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
          alt="loader"
        />
        {children}
      </div>
      
    </div>
  );
};

export default GifLoader;
