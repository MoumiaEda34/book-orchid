import React, { useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';

const PDFModal = ({ show, handleClose, pdfUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () => setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="pdf-modal-title"
      aria-describedby="pdf-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" id="pdf-modal-title" component="h2">
          PDF Viewer
        </Typography>

        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>

        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="contained"
            color="primary"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            sx={{ marginRight: '10px' }}
          >
            Previous
          </Button>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            sx={{ marginLeft: '10px' }}
          >
            Next
          </Button>
        </div>

        {/* Close button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          sx={{ marginTop: '20px' }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PDFModal;
