import { Button } from "@chakra-ui/react";

const replaceSpacesWithPluses = (str) => {
  return str.replace(/\s/g, "+");
};

const PDFDownload = ({ reportName }) => {
  const handleDownloadPDF = async () => {
    const response = await fetch(
      "/api/reports/download/" + replaceSpacesWithPluses(reportName)
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the PDF");
    }
    const pdfByteArray = await response.arrayBuffer();
    const pdfBlob = new Blob([pdfByteArray], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = reportName + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download as PDF</Button>
    </div>
  );
};

export default PDFDownload;
