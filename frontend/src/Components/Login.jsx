import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usernameState, passwordState, domainState } from "../Atoms/Atoms";
import { Input, Button, Box, Flex, FormControl } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [domain, setDomain] = useRecoilState(domainState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reports");
  };

  return (
    <Flex boxSize={"lg"} display={"flex"} justifyContent={"center"} w={"100%"}>
      <Box>
        <FormControl
          isRequired
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Input
            type="text"
            placeholder="Username"
            margin={1}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            margin={1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Domain"
            margin={1}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Button m={1} type="submit" onClick={handleSubmit} width={"lg"}>
            Login
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Login;
