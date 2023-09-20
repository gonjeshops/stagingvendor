import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFView({ url }) {
  return (
    <Document file={url} renderMode={"svg"} className="pdf-document-view">
      <Page
        className="pdf_page_root"
        pageNumber={1}
        width={200}
        height={230}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onClick={() => {
          window.open(url, "_blank");
        }}
      />
    </Document>
  );
}
