import { Box, Text, Flex } from "@chakra-ui/react";
import PDFDownload from "./PDFDownload";
import HTMLViewer from "./HTMLViewer";

const convertDateTimeStringToReadable = (dateTime) => {
  const date = new Date(dateTime);
  return date.toDateString().replace(/^\S+\s/, "");
};

const ReportDataDisplay = ({ report }) => {
  const hasDescription =
    report.Description !== null && report.Description !== "";

  return (
    <>
      <Flex>
        <Box width={"100%"} flexDirection={"column"}>
          <Box width={"50%"} textAlign={"left"}>
            <Text size={"sm"}>Report Name: {report.Name}</Text>
          </Box>
          <Box width={"50%"} textAlign={"left"}>
            <Text size={"sm"}>
              Created by {report.CreatedBy} on{" "}
              {convertDateTimeStringToReadable(report.CreatedDate)}
            </Text>
          </Box>
          <Box width={"50%"} textAlign={"left"}>
            <Text size={"sm"}>
              Last modified on{" "}
              {convertDateTimeStringToReadable(report.ModifiedDate)}
            </Text>
          </Box>
          {hasDescription && (
            <Box width={"50%"} textAlign={"left"}>
              <Text size={"sm"}>Report Description: {report.Description}</Text>
            </Box>
          )}
        </Box>
        <DownloadPanel reportName={report.Name} />
      </Flex>
    </>
  );
};

const DownloadPanel = ({ reportName }) => {
  return (
    <>
      <Flex alignItems={"center"}>
        <Box m={2}>
          <PDFDownload reportName={reportName} />
        </Box>
        <Box m={2}>
          <HTMLViewer reportName={reportName} />
        </Box>
      </Flex>
    </>
  );
};

export default ReportDataDisplay;
