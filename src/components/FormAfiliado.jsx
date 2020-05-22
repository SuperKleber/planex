import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPixel from "react-facebook-pixel";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    marginLeft: 0,
  },
  submit: {
    marginTop: 16,
    marginBottom: 16,
  },
}));
const FormContact = ({ nombre, codigo }) => {
  const classes = useStyles();
  return (
    <form
      name={"afiliado"}
      method="POST"
      data-netlify="true"
      netlify="true"
      action="/"
      onSubmit={() => {
        ReactPixel.track("Lead");
      }}
    >
      <input type="hidden" name="form-name" value={"afiliado"} />
      <input hidden type="hidden" name="nombre" value={nombre} />
      <input hidden type="hidden" name="codigo" value={codigo} />
      <TextField
        required
        name="celular"
        id="outlined-basic"
        className={classes.textField}
        label="Celular"
        type="number"
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        name="email"
        type="email"
        id="outlined-basic"
        className={classes.textField}
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <Button
        className={classes.submit}
        type="submit"
        color="primary"
        variant="contained"
        fullWidth={true}
      >
        Enviar
      </Button>
    </form>
  );
};

export default FormContact;
