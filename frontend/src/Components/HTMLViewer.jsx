import { Button } from "@chakra-ui/react";

const replaceSpacesWithPluses = (str) => {
  return str.replace(/\s/g, "+");
};

const HTMLViewer = ({ reportName }) => {
  const handleViewHTML = async () => {
    const response = await fetch(
      "/api/reports/getHTML/" + replaceSpacesWithPluses(reportName),
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch HTML");
    }
    const html = await response.text();

    const newWindow = window.open("", "_blank");
    newWindow.document.write(html);
    newWindow.document.close();
  };

  return (
    <div>
      <Button onClick={handleViewHTML}>View HTML</Button>
    </div>
  );
};

export default HTMLViewer;
