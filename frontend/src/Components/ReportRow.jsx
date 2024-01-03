import ReportDataDisplay from "./ReportDataDisplay";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";

const ReportRow = ({ report }) => {
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              display={"flex"}
              alignContent={"center"}
            >
              <Text fontWeight={"semibold"} fontSize={"l"}>
                {report.Name}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ReportDataDisplay report={report} />
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default ReportRow;
