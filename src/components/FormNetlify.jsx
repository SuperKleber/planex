import React from "react";

const FormNetlify = () => {
  return (
    <>
      <form
        name="contacto"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
        hidden
      >
        <input type="hidden" name="form-name" value="contacto" hidden />
        <input type="text" name="nombres" />
        <input type="text" name="apellidos" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
        <input type="text" name="mensaje" />
      </form>
      <form
        name="prevision"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
        hidden
      >
        <input type="hidden" name="form-name" value="prevision" hidden />
        <input type="text" name="nombres" />
        <input type="text" name="apellidos" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
        <input type="text" name="plan" />
        <input type="text" name="direccion" />
        <input type="text" name="csv" />
        <input type="text" name="familyJson" />
      </form>
    </>
  );
};

export default FormNetlify;
