'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

export default function PDFViewer({ file, width = 600 }) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={width} />
            </Document>

            <div className="text-center text-sm">
                Page {pageNumber} of {numPages}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                    disabled={pageNumber === 1}
                    className="px-2 py-1 bg-gray-200 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                    disabled={pageNumber === numPages}
                    className="px-2 py-1 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
