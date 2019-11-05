import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
const FormContact = () => {
  const classes = useStyles();
  return (
    <form>
      <TextField
        name="name"
        id="outlined-basic"
        className={classes.textField}
        label="Nombres"
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="lastName"
        id="outlined-basic"
        className={classes.textField}
        label="Apellidos"
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="phone"
        id="outlined-basic"
        className={classes.textField}
        label="Celular"
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="email"
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
