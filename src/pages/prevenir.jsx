import React from "react";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import LandingPrevenir from "../components/LandingPrevenir";

const prevenir = () => {
  return (
    <Layout>
      <Menu></Menu>
      <LandingPrevenir></LandingPrevenir>
    </Layout>
  );
};

export default prevenir;
