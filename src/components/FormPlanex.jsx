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
  Checkbox,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPixel from "react-facebook-pixel";
import RelativeList from "./LandingPrevenir/RelativeList";
import ConfirmLead from "./ConfirmLead";
import Alert from "./Alert";
import ContratoText from "./ContratoText";
import Modal from "./Modal";
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

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
const FormContact = ({ initialPlan, onSent = () => null }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [sent, setSent] = useState(false);
  const [customFamily, setCustomFamily] = useState([]);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState();
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [plan, setPlan] = useState(initialPlan ? initialPlan : "ruby");
  const [csv, setCsv] = useState("");
  const [message, setMessage] = useState("");
  const [familyJson, setFamilyJson] = useState([]);
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(true);

  const [alertValidation, setAlertValidation] = useState({
    open: false,
    message: "",
  });
  const submit = (e) => {
    e.preventDefault();
    let data = {
      nombres,
      apellidos,
      celular,
      email,
      direccion,
      plan,
      message,
      csv,
      familyJson,
      contrato: checkedA,
      subscribed: checkedB,
    };
    console.log(data);
    if (celular.toString().length >= 8) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "prevision", ...data }),
      }).then((res) => {
        ReactPixel.track("InitiateCheckout");
        setSent(true);
        onSent();
        console.log(data);
      });
    } else {
      setAlertValidation({ open: true, message: "Ingrese un celular válido" });
    }
  };
  useEffect(() => {
    ReactPixel.trackCustom("InitiateForm");
    if (customFamily.length !== 0) {
      let newFamilyJson = [];
      let newMessage = `Hola soy ${nombres} ${apellidos}, mi email es ${email} y mi celular ${celular}, he leído y aceptado las normas del contrato y deseo el plan ${plan} para mi familia que son: \n`;

      customFamily.map(({ nombres, apellidos, parentesco, edad }) => {
        newFamilyJson.push({ parentesco, nombres, apellidos, edad });
        newMessage += `${parentesco}: ${nombres} ${apellidos} de ${edad} años de edad \n`;
      });

      setMessage(`${newMessage}`);
      setFamilyJson([...newFamilyJson]);
    }
  }, [customFamily]);
  if (!sent) {
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
          onChange={(e) => setNombres(e.target.value)}
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
          onChange={(e) => setApellidos(e.target.value)}
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
          onChange={(e) => setCelular(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setDireccion(e.target.value)}
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
            onChange={(event) => setPlan(event.target.value)}
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
                <Box display="flex" flexDirection="column">
                  RUBY 100Bs x mes
                  <Chip
                    label="+ 140Bs Cuota única de afiliación"
                    // color="primary"
                    variant="outlined"
                  ></Chip>
                </Box>
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
                <Box display="flex" flexDirection="column">
                  SILVER 120Bs x mes
                  <Chip
                    label="+ 140Bs Cuota única de afiliación"
                    // color="primary"
                    variant="outlined"
                  ></Chip>
                </Box>
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
                <Box display="flex" flexDirection="column">
                  GOLD 150Bs x mes
                  <Chip
                    label="+ 140Bs Cuota única de afiliación"
                    // color="primary"
                    variant="outlined"
                  ></Chip>
                </Box>
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
        <List>
          <ListItem>
            <ListItemText>
              <Box display="flex" flexDirection="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={checkedA}
                      onChange={() => setCheckedA(!checkedA)}
                    />
                  }
                  label="He leído el contrato y las normas de Planex"
                />
              </Box>
              <Typography
                onClick={() => setOpenModal(true)}
                style={{ cursor: "pointer" }}
                variant="caption"
              >
                Leer contrato
              </Typography>
              <Modal
                title="Contrato de Prever"
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
              >
                <Box style={{ position: "relative" }}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setOpenModal(false);
                      setCheckedA(true);
                    }}
                  >
                    Leido
                  </Button>
                  <ContratoText></ContratoText>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setOpenModal(false);
                      setCheckedA(true);
                    }}
                  >
                    Leido
                  </Button>
                </Box>
              </Modal>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedB}
                    onChange={() => setCheckedB(!checkedB)}
                  />
                }
                label="Quiero recibir noticias y ofertas de Planex"
              />
            </ListItemText>
          </ListItem>
        </List>
        <Button
          className={classes.submit}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth={true}
        >
          Enviar
        </Button>
        <Alert
          open={alertValidation.open}
          message={alertValidation.message}
          onClose={() =>
            setAlertValidation({ ...alertValidation, open: false })
          }
          color={colors.red}
        ></Alert>
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
