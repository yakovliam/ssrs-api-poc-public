import { useRecoilState, useRecoilValue } from "recoil";
import ReportRow from "../Components/ReportRow";
import { usernameState, passwordState, domainState } from "../Atoms/Atoms";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Accordion, Flex, Text, Box, Button } from "@chakra-ui/react";

const Logout = () => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [domain, setDomain] = useRecoilState(domainState);

  const navigate = useNavigate();
  return (
    <Button
      m={4}
      colorScheme="blue"
      size="lg"
      onClick={() => {
        setUsername("");
        setPassword("");
        setDomain("");
        sessionStorage.clear();
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
};

const ReportsViewer = () => {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  const domain = useRecoilValue(domainState);

  const navigate = useNavigate();

  const [reportNames, setReportNames] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const execute = async () => {
    const response = await fetch("/api/reports", {
      headers: {
        "Content-Type": "application/json",
        Username: username,
        Password: password,
        Domain: domain,
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  useEffect(() => {
    if (jsonData)
      sessionStorage.setItem("reportData", JSON.stringify(jsonData));
  }, [jsonData]);

  useEffect(() => {
    const jsonData = sessionStorage.getItem("reportData");
    if (!jsonData) {
      execute()
        .then((res) => {
          setJsonData(res);
          const reports = res.value;
          setReportNames(reports);
        })
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    } else {
      setReportNames(JSON.parse(jsonData).value);
      setJsonData(JSON.parse(jsonData));
    }
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      margin={6}
      height={"100vh"}
      alignContent={"center"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"4xl"} fontWeight={"bold"} textAlign={"center"}>
          Reports Manager
        </Text>
        <Box>
          <Logout />
        </Box>
      </Flex>

      <Accordion allowMultiple m={6}>
        {reportNames.map((report) => (
          <ReportRow key={report.Id} report={report} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default ReportsViewer;
