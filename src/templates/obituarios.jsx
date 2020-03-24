import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import LandingObituario from "../components/LandingObituario";
import { PaginateMenu } from "../components/LandingObituario/PaginateMenu";
import SearchApp from "../components/SearchApp";
const Obituarios = ({ pageContext }) => {
  return (
    <Layout>
      <Menu></Menu>
      <PaginateMenu
        index={pageContext.index}
        limit={pageContext.pageCount}
      ></PaginateMenu>
      <SearchApp></SearchApp>
      <LandingObituario obituarios={pageContext.group}></LandingObituario>
      <PaginateMenu
        index={pageContext.index}
        limit={pageContext.pageCount}
      ></PaginateMenu>
    </Layout>
  );
};
export default Obituarios;
