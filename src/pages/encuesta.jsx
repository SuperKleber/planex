import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";

const encuesta = () => {
  return (
    <Layout>
      <Menu></Menu>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd2toD7Cvq6NuBx8Cv0WKeyRbaKXD1i_av87mlBqVct6kWB_w/viewform?embedded=true"
        style={{ width: "100%", height: "100vh" }}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
      >
        Cargando…
      </iframe>
    </Layout>
  );
};

export default encuesta;
