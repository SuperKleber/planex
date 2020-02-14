import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import RelativeList from "../components/LandingPrevenir/RelativeList";
const Info = () => {
  const [customFamily, setCustomFamily] = useState([]);
  const [familyList, setFamilyList] = useState([]);
  return (
    <Layout pixel={"info"}>
      <Menu></Menu>
      <Container>
        <RelativeList
          familyList={customFamily}
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
        ></RelativeList>
      </Container>
    </Layout>
  );
};

export default Info;
