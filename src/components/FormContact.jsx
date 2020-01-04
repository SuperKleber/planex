import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPixel from "react-facebook-pixel";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    marginLeft: 0
  },
  submit: {
    marginTop: 16,
    marginBottom: 16
  }
}));
const FormContact = ({ name, hidden, text, json }) => {
  const classes = useStyles();
  return (
    <form
      name={name ? name : "contacto"}
      method="POST"
      data-netlify="true"
      netlify="true"
      action="/"
      onSubmit={() => {
        ReactPixel.track("Lead");
      }}
      hidden={hidden}
    >
      <input type="hidden" name="form-name" value={name ? name : "contact"} />
      <TextField
        required
        name="nombres"
        id="outlined-basic"
        className={classes.textField}
        label="nombres"
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        name="apellidos"
        id="outlined-basic"
        className={classes.textField}
        label="Apellidos"
        margin="normal"
        variant="outlined"
      />
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
      <TextField
        name="mensaje"
        id="outlined-basic"
        value={text}
        multiline
        rowsMax="4"
        className={classes.textField}
        // hidden
        // style={{ display: "none" }}
        label="Mensaje"
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="json"
        id="outlined-basic"
        value={json}
        multiline
        rowsMax="4"
        hidden
        style={{ display: "none" }}
        label="Text"
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
