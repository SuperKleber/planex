import React, { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  Card,
  CardActions,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@material-ui/core";
import Menu from "../components/Menu";
import { colors } from "../../config/brand.yml";
import PhoneIcon from "@material-ui/icons/Phone";
const useStyles = makeStyles({
  root: {
    width: "100%",
    "@media (max-width: 785px)": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
  },

  cardContainer: {
    "@media (max-width: 1040px)": {
      width: "100%",
    },
    "@media (max-width: 785px)": {
      justifyContent: "center",
    },
  },
  Landing: {
    width: "100%",
    "& .img": {
      width: 300,
    },
  },
  card: {
    maxWidth: 340,
    margin: "16px 0",
  },
  cardPrimary: {
    border: `4px solid ${colors.green}`,
    marginRight: 32,
    "@media (max-width: 785px)": {
      marginRight: 0,
    },
  },
  media: {
    height: 170,
    width: 340,
  },
  contact: {
    "@media (max-width: 550px)": {
      display: "none",
    },
  },
  contactMobile: {
    display: "none",
    "@media (max-width: 550px)": {
      display: "flex",
    },
  },
});

const Salas = () => {
  const classes = useStyles();
  useEffect(() => {
    try {
      document.getElementById("video").play();
    } catch (error) {
      console.error("El video no pudo cargar");
    }
  }, []);
  const gridItem = {
    item: true,
    xs: 12,
    md: 6,
    lg: 4,
    xl: 3,
  };
  return (
    <Layout>
      <Menu></Menu>
      <Container>
        <Box
          display="flex"
          className={classes.root}
          justifyContent="space-between"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Box
            display="flex"
            className={classes.Landing}
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box>
              <img
                className="img"
                src="/img/paloma.png"
                alt="paloma funeraria"
              />
            </Box>
            <Box style={{ width: 300 }}>
              <Typography color="primary" gutterBottom variant="h5">
                SIEMPRE ABIERTOS 24/7
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                En estos tiempos de pandemia adaptamos nuestros servicios para
                que todos puedan despedir a sus seres queridos. Estamos abiertos
                y cumpliendo todos los protocolos de bioseguirdad
              </Typography>
              <a
                className={classes.contactMobile}
                onClick={() => {
                  ReactPixel.track("Contact", {
                    type: "phone",
                    num: "33469191",
                    description: "teléfono de emergencia",
                    textButton: "Llamar contacto",
                  });
                }}
                href="tel:33469191"
              >
                <Button variant="contained" color="primary">
                  <PhoneIcon></PhoneIcon> Guardar contacto de EMERGENCIA
                </Button>
              </a>
              <br />
              <Button
                size="large"
                fullWidth
                href="#servicios"
                variant="outlined"
                color="primary"
              >
                Ver servicios
              </Button>
              <Paper className={classes.contact} style={{ padding: 8 }}>
                <Typography variant="subtitle1">
                  Guarda este número de EMERGENCIA funeraria
                  <strong
                    style={{
                      marginLeft: 8,
                      color: colors.purple,
                      border: `1px solid ${colors.purple}`,
                      padding: "0 12px",
                      borderRadius: 16,
                    }}
                  >
                    33469191
                  </strong>
                </Typography>
              </Paper>
            </Box>
          </Box>
          <br />
          <Grid container spacing={2} id="servicios">
            <Grid {...gridItem}>
              <Card className={`${classes.card}`}>
                <CardMedia
                  className={classes.media}
                  image="/img/covid.png"
                  title="funeral Covid"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servicio Covid-19
                  </Typography>
                  <Chip
                    label="4800Bs"
                    color="primary"
                    variant="outlined"
                  ></Chip>
                  <List>
                    <ListItem>
                      <ListItemText>Cofre ecológico</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Necrológico virtual</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Traslados</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Manipulación</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Cremación</ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>
                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio salón velatorio",
                        textButton: " Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20COVID-19"
                  >
                    <Button color="primary" variant="contained">
                      Consultar Servicio
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
            <Grid {...gridItem}>
              <Card className={`${classes.card} `}>
                <CardMedia
                  className={classes.media}
                  src="/video/obituarios.mp4"
                  title="funeral en casa"
                  component="video"
                  id="video"
                  autoplay="true"
                  loop="true"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Necrológico Virtual
                  </Typography>
                  <Chip label="350Bs" color="primary" variant="outlined"></Chip>
                  <List>
                    <ListItem>
                      <ListItemText>
                        Celebra la vida de tu ser querido fallecido
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Comparte en redes sociales</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>
                        Puedes hacerlo desde la seguridad de tu hogar
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>
                        Invita a familiares y amigos a dejar sus condolencias
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>

                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio salón velatorio",
                        textButton: " Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20necrológico%20virtual"
                  >
                    <Button color="primary" variant="contained">
                      Consultar Servicio
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
            <Grid {...gridItem}>
              <Card className={`${classes.card}`}>
                <CardMedia
                  className={classes.media}
                  image="/img/urna-banner.png"
                  title="funeral en casa"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servicio de Cremación
                  </Typography>
                  <Chip
                    label="3500Bs"
                    color="primary"
                    variant="outlined"
                  ></Chip>
                  <List>
                    <ListItem>
                      <ListItemText>Horno crematorio</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Urna</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>
                        Salón velatorio y cafetería
                        <Chip
                          variant="outlined"
                          label="promoción"
                          style={{
                            color: colors.green,
                            border: `1px solid ${colors.green}`,
                            marginLeft: 8,
                          }}
                        ></Chip>
                      </ListItemText>
                    </ListItem>
                  </List>
                </CardContent>

                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio salón velatorio",
                        textButton: " Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20en%20salas"
                  >
                    <Button color="primary" variant="contained">
                      Consultar Servicio
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
            <Grid {...gridItem}>
              <Card className={`${classes.card}`}>
                <CardMedia
                  className={classes.media}
                  image="/img/sala.png"
                  title="funeral en casa"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servicio Express
                  </Typography>
                  <Chip
                    label="3490Bs"
                    color="primary"
                    variant="outlined"
                  ></Chip>
                  <List>
                    <ListItem>
                      <ListItemText>Trámites legales</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Traslados</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Cofre elemental o ecológico</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Tanatopraxia</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Formolización</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Personal uniformado</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>
                        Salón velatorio y cafetería
                        <Chip
                          variant="outlined"
                          label="promoción"
                          style={{
                            color: colors.green,
                            border: `1px solid ${colors.green}`,
                            marginLeft: 8,
                          }}
                        ></Chip>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>
                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio salón velatorio",
                        textButton: " Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20en%20salas"
                  >
                    <Button color="primary" variant="contained">
                      Consultar Servicio
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
            <Grid {...gridItem}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="/img/casa.png"
                  title="funeral en casa"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servicio a Domicilio
                  </Typography>
                  <Chip label="4490Bs" variant="outlined" />
                  <br />
                  <List>
                    <ListItem>
                      <ListItemText>Trámites legales</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Traslado</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Cofre de PRIMERA / ECOLÓGICO</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Sábana santa</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Tanatopraxia</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Formolización</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Capilla ardiente completa</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Necrológico virtual</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText>Libro de condolencias</ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Todos necesitamos despedir a nuestros seres queridos, si no
                    puedes venir a nuestros Salones de velación nosotros iremos
                    donde usted.
                  </Typography>
                  <Divider></Divider>
                  <br />
                  <Typography color="textSecondary">
                    <Chip
                      variant="outlined"
                      label="WARNING"
                      style={{
                        color: colors.gold,
                        border: `1px solid ${colors.gold}`,
                        marginRight: 8,
                      }}
                    ></Chip>
                    <strong>RECOMENDAMOS NO LE ABRAS TU HOGAR AL VIRUS</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio velatorio domicilio",
                        textButton: "Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20a%20domicilio"
                  >
                    <Button color="primary" variant="outlined">
                      Consultar Servicio
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>

            <Grid {...gridItem}>
              <Card className={classes.card}>
                <CardActions>
                  <a
                    onClick={() => {
                      ReactPixel.track("Contact", {
                        type: "whatsapp",
                        num: "33469191",
                        description: "Servicio velatorio domicilio",
                        textButton: "Consultar Servicio",
                      });
                    }}
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20a%20domicilio"
                  >
                    <Button color="primary" variant="outlined">
                      Consultar más Servicios
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Salas;
