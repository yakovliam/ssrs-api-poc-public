import Login from "./Components/Login";
import { Text, Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Flex flexDirection={"column"} m={40}>
        <Flex
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
          m={5}
        >
          <Text fontSize="4xl" fontWeight="bold">
            SSRS Test Application
          </Text>
        </Flex>
        <Login />
      </Flex>
    </>
  );
}

export default App;
