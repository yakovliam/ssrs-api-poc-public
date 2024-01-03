import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Text fontSize="2xl" fontWeight="bold">
        An error occured with your login. Please try again.
      </Text>
      <Button m={4} colorScheme="blue" size="lg" onClick={() => navigate("/")}>
        Return to Login
      </Button>
    </Flex>
  );
};

export default ErrorPage;
