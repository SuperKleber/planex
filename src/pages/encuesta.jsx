import React from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";

const encuesta = () => {
  return (
    <Layout>
      <Menu></Menu>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfcO1nRpGEl0W8vr6O2Ur2CsB8wp-_EKXxDUm72tJa0yRQmnQ/viewform?embedded=true"
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
