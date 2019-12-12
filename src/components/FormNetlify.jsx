import React from "react";

const FormNetlify = () => {
  return (
    <>
      <form method="POST" data-netlify="true" netlify="true" action="/" hidden>
        <input type="hidden" name="form-name" value="contacto" hidden />
        <input type="text" name="nombres" />
        <input type="text" name="apellidos" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
        <input type="text" name="mensaje" />
      </form>
      <form method="POST" data-netlify="true" netlify="true" action="/" hidden>
        <input type="hidden" name="form-name" value="prevision" hidden />
        <input type="text" name="nombres" />
        <input type="text" name="apellidos" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
        <input type="text" name="mensaje" />
        <input type="text" name="json" />
      </form>
    </>
  );
};

export default FormNetlify;
