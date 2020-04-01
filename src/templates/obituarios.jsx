import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import LandingObituario from "../components/LandingObituario";
import { PaginateMenu } from "../components/LandingObituario/PaginateMenu";
import SearchApp from "../components/SearchApp";
const Obituarios = ({ pageContext }) => {
  const seo = {
    siteTitle: "Obituarios necrológicos | Planex",
    siteDescription: "👵🏻👴🏻 Busca a tu fallecido aquí",
    siteUrl: "https://planex.com.bo/obituarios",
    siteCover: "/img/obituarios.png"
  };
  return (
    <Layout seo={seo}>
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
