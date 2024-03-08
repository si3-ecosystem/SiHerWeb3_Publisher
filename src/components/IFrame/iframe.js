// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";

// export const IFrame = ({ children, width, height, ...props }) => {
//   const [contentRef, setContentRef] = useState(null);
//   const mountNode = contentRef?.contentWindow?.document?.body;
//   const handleLoad = () => {
//     if (!contentRef || !contentRef.contentWindow) return;

//     const iframeHead = contentRef.contentWindow.document.head;
//     const parentHead = document.head;

//     // Iterate through all <link> elements in the parent document's head
//     document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
//       // Clone each <link> element and append it to the iframe's head
//       const clonedLink = link.cloneNode(true);
//       iframeHead.appendChild(clonedLink);
//     });
//   };

//   return (
//     <iframe
//       {...props}
//       ref={setContentRef}
//       onLoad={handleLoad}
//       width={width}
//       height={height}
//     >
//       {mountNode && createPortal(children, mountNode)}
//     </iframe>
//   );
// };

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const IFrame = ({ children, width, height, cssFiles, ...props }) => {
  console.log(cssFiles);
  const [contentRef, setContentRef] = useState(null);

  const handleLoad = () => {
    if (!contentRef || !contentRef.contentWindow) return;

    const iframeHead = contentRef.contentWindow.document.head;

    // Load parent CSS files
    cssFiles.forEach((cssFile) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = cssFile;
      iframeHead.appendChild(linkElement);
    });
  };

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
