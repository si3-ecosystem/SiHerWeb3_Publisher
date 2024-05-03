import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export const IFrame = ({
  children,
  width,
  height,
  cssFiles,
  // setScreenWidth,
  ...props
}) => {
  console.log(width);
  const [contentRef, setContentRef] = useState(null);

  const handleLoad = () => {
    if (!contentRef || !contentRef.contentWindow) return;
    const iframeHead = contentRef.contentWindow.document.head;
    cssFiles.forEach((cssFile) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = cssFile;
      iframeHead.appendChild(linkElement);
    });
  };
  // useEffect(() => {
  //   if (contentRef && contentRef.contentWindow) {
  //     contentRef.contentWindow.addEventListener("resize", () => {
  //       console.log(contentRef.offsetWidth);
  //       setScreenWidth(contentRef.offsetWidth);
  //     });
  //   }
  // }, [contentRef]);
  return (
    <iframe
      {...props}
      ref={setContentRef}
      onLoad={handleLoad}
      width={width}
      height={height}
    >
      {contentRef &&
        createPortal(children, contentRef.contentWindow.document.body)}
    </iframe>
  );
};
