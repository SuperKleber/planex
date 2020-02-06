import React from "react";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import Landing from "../components/Landing";

const Index = () => {
  return (
    <Layout>
      <Menu menuFloat={false}></Menu>
      <Landing></Landing>
    </Layout>
  );
};

export default Index;
