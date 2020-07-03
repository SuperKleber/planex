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
        name="remarketing"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
        hidden
      >
        <input type="hidden" name="form-name" value="remarketing" hidden />
        <input type="text" name="nombres" />
        <input type="text" name="apellidos" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
        <input type="text" name="plan" />
        <input type="text" name="direccion" />
        <input type="text" name="message" />
        <input type="text" name="csv" />
        <input type="text" name="familyJson" />
        <input type="text" name="contrato" />
        <input type="text" name="subscribed" />
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
        <input type="text" name="message" />
        <input type="text" name="csv" />
        <input type="text" name="familyJson" />
        <input type="text" name="contrato" />
        <input type="text" name="subscribed" />
      </form>
      <form
        name="afiliado"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
        hidden
      >
        <input type="hidden" name="form-name" value="afiliado" hidden />
        <input type="text" name="nombre" />
        <input type="text" name="codigo" />
        <input type="text" name="celular" />
        <input type="email" name="email" />
      </form>
    </>
  );
};

export default FormNetlify;
