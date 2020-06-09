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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormHelperText,
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
  const [step, setStep] = useState(0);

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
    if (celular.toString().length >= 8) {
      if (familyJson.length > 0) {
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
        setAlertValidation({
          open: true,
          message: "Por favor agregue al menos a un familiar",
        });
      }
    } else {
      setAlertValidation({ open: true, message: "Ingrese un celular válido" });
    }
  };
  useEffect(() => {
    ReactPixel.trackCustom("InitiateForm");
    if (customFamily.length !== 0) {
      let newFamilyJson = [];
      let newMessage = `Solicitud de afiliación: \n Soy ${nombres} ${apellidos} y me declaro el responsable de la afiliación, mi email es ${email} y mi celular ${celular}, he leído y aceptado el contrato de afiliación y contrato el plan ${plan} para mi familia que son: \n`;

      customFamily.map(({ nombres, apellidos, parentesco, edad }) => {
        newFamilyJson.push({ parentesco, nombres, apellidos, edad });
        newMessage += `${parentesco}: ${nombres} ${apellidos} de ${edad} años de edad \n`;
      });

      setMessage(`${newMessage}`);
      setFamilyJson([...newFamilyJson]);
    }
  }, [customFamily]);

  const steps = [
    {
      title: "Información del responsable",
      content: (
        <>
          <TextField
            required
            name="nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            id="outlined-basic"
            className={classes.textField}
            label="Nombres del responsable"
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
            label="Apellidos del responsable"
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
          <Button
            onClick={() => {
              setStep(step + 1);
            }}
            variant="contained"
            color="primary"
            disabled={
              !nombres
                ? true
                : !apellidos
                ? true
                : !celular
                ? true
                : celular.length < 8
                ? true
                : false
            }
            fullWidth
          >
            {!nombres
              ? "Llene los campos con asterisco (*)"
              : !apellidos
              ? "Llene los campos con asterisco (*)"
              : !celular
              ? "Llene los campos con asterisco (*)"
              : celular.length < 8
              ? "Introducir un celular correcto"
              : "Siguiente"}
          </Button>
        </>
      ),
    },
    {
      title: "Solicitud de afiliación",
      content: (
        <>
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
          <List>
            <ListItem>
              <ListItemText>
                <Box display="flex" flexDirection="column">
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        required
                        checked={checkedA}
                        onChange={() => setCheckedA(!checkedA)}
                      />
                    }
                    label="He leído y acepto el contrato de afiliación"
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
            onClick={() => {
              setStep(step + 1);
            }}
            variant="contained"
            color="primary"
            disabled={!checkedA}
            fullWidth
          >
            {checkedA ? "Siguiente" : "Debe aceptar el contrato para continuar"}
          </Button>
        </>
      ),
    },
    {
      title: "Información de familiares",
      content: (
        <>
          <Typography style={{ marginTop: 8 }}>
            👇Puede agregar hasta 7 familiares
          </Typography>
          <RelativeList
            customFamily={customFamily}
            setCustomFamily={setCustomFamily}
            limitFamily={7}
          ></RelativeList>
          <br />
          {customFamily.length > 0 && (
            <Button
              onClick={submit}
              color="primary"
              variant="contained"
              fullWidth
            >
              Solicitar afiliación 🕊️
            </Button>
          )}
        </>
      ),
    },
  ];
  if (!sent) {
    return (
      <form
        name="prevision"
        method="POST"
        data-netlify="true"
        netlify="true"
        action="/"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <input type="hidden" name="form-name" value="prevision" />
          <Stepper activeStep={step} orientation="vertical">
            {steps.map(({ title, content }, i) => {
              return (
                <Step
                  key={i}
                  style={{ minWidth: 300, width: "100%", maxWidth: 450 }}
                >
                  <StepLabel>{title}</StepLabel>
                  <StepContent>{content}</StepContent>
                </Step>
              );
            })}
          </Stepper>
          {/* 
          <Button
            className={classes.submit}
            type="submit"
            color="primary"
            variant="contained"
            // fullWidth={true}
            style={{ minWidth: 300, width: "90vw", maxWidth: 450 }}
          >
            Enviar
          </Button> */}
          <Alert
            open={alertValidation.open}
            message={alertValidation.message}
            onClose={() =>
              setAlertValidation({ ...alertValidation, open: false })
            }
            color={colors.red}
          ></Alert>
        </Box>
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
