import React, { useState, useEffect } from "react";
import { colors } from "../../config/brand.yml";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPixel from "react-facebook-pixel";
import RelativeList from "./LandingPrevenir/RelativeList";
import ConfirmLead from "./ConfirmLead";
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

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
const FormContact = ({ initialPlan, lead, setLead }) => {
  const classes = useStyles();

  const [customFamily, setCustomFamily] = useState([]);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState();
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [plan, setPlan] = useState(initialPlan ? initialPlan : "ruby");
  const [csv, setCsv] = useState("");
  const [familyJson, setFamilyJson] = useState([]);

  const submit = e => {
    e.preventDefault();
    let data = {
      nombres,
      apellidos,
      celular,
      email,
      direccion,
      plan,
      csv,
      familyJson
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "prevision", ...data })
    }).then(res => {
      // ReactPixel.track("Lead");
      setLead(true);
      console.log(data);
    });
  };
  useEffect(() => {
    if (customFamily.length !== 0) {
      let newFamilyJson = [];
      let newCsv = '"parentesco", "nombres", "apellidos", "edad"\n';

      customFamily.map(({ nombres, apellidos, parentesco, edad }) => {
        newCsv = `${newCsv} "${parentesco}", "${nombres}", "${apellidos}", "${edad}"\n`;
        newFamilyJson.push({ parentesco, nombres, apellidos, edad });
      });
      setCsv(`${newCsv}`);
      setFamilyJson([...newFamilyJson]);
    }
  }, [customFamily]);
  if (!lead) {
    return (
      <form
        name="prevision"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
        onSubmit={submit}
      >
        <input type="hidden" name="form-name" value="prevision" />
        <TextField
          required
          name="nombres"
          value={nombres}
          onChange={e => setNombres(e.target.value)}
          id="outlined-basic"
          className={classes.textField}
          label="Nombres"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          name="apellidos"
          value={apellidos}
          onChange={e => setApellidos(e.target.value)}
          id="outlined-basic"
          className={classes.textField}
          label="Apellidos"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          name="celular"
          value={celular}
          onChange={e => setCelular(e.target.value)}
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
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          id="outlined-basic"
          className={classes.textField}
          label="Email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          name="direccion"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
          type="text"
          id="outlined-basic"
          className={classes.textField}
          label="Dirección"
          margin="normal"
          variant="outlined"
        />
        <input hidden type="text" defaultValue={csv} name="csv" />
        <input hidden type="text" defaultValue={familyJson} name="familyJson" />
        <input hidden type="text" defaultValue={plan} name="plan" />
        <FormControl
          variant="outlined"
          className={classes.textField}
          style={{ width: "100%", margin: "16px 0" }}
        >
          <InputLabel id="planes">Seleccione su plan</InputLabel>
          <Select
            onChange={event => setPlan(event.target.value)}
            value={plan}
            labelid="planes"
          >
            <MenuItem value="ruby">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <img
                  src="/img/ruby.svg"
                  style={{ width: 20, marginRight: 8 }}
                ></img>
                RUBY
              </Box>
            </MenuItem>
            <MenuItem value="silver">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <img
                  src="/img/lingote-de-plata.svg"
                  style={{ width: 20, marginRight: 8 }}
                ></img>
                SILVER
              </Box>
            </MenuItem>
            <MenuItem value="gold">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <img
                  src="/img/lingote-de-oro.svg"
                  style={{ width: 20, marginRight: 8 }}
                ></img>
                GOLD
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
        <Typography
          style={{ marginLeft: 20, marginTop: 8, color: colors.green }}
        >
          Agrega a tus familiares
        </Typography>
        <RelativeList
          customFamily={customFamily}
          setCustomFamily={setCustomFamily}
        ></RelativeList>
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
  } else {
    return (
      <ConfirmLead
        nombres={nombres}
        apellidos={apellidos}
        plan={plan}
      ></ConfirmLead>
    );
  }
};

export default FormContact;
