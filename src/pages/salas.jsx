import React from "react";

import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
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
  Chip
} from "@material-ui/core";
import Menu from "../components/Menu";
import { colors } from "../../config/brand.yml";
const useStyles = makeStyles({
  root: {
    width: "100%",
    "@media (max-width: 785px)": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  text: {
    width: 340
  },
  cardContainer: {
    "@media (max-width: 1040px)": {
      width: "100%"
    },
    "@media (max-width: 785px)": {
      justifyContent: "center"
    }
  },
  card: {
    maxWidth: 340,
    margin: "16px 0"
  },
  cardPrimary: {
    border: `4px solid ${colors.green}`,
    marginRight: 32,
    "@media (max-width: 785px)": {
      marginRight: 0
    }
  },
  media: {
    height: 170,
    width: 340
  }
});
const Salas = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Menu></Menu>
      <Container>
        <Box
          display="flex"
          className={classes.root}
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Box
            display="flex"
            className={classes.text}
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Typography color="primary" gutterBottom variant="h5">
              SIEMPRE ABIERTOS 24/7
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              En estos tiempos de pandemias adaptamos nuestros servicio con
              todas las normas de bioseguridad
            </Typography>
          </Box>
          <br />
          <Box
            className={classes.cardContainer}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Card className={`${classes.card} ${classes.cardPrimary}`}>
              <CardMedia
                className={classes.media}
                image="/img/sala.png"
                title="funeral en casa"
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Servicio funerario completo
                </Typography>
                <Chip label="3190Bs" color="primary" variant="outlined"></Chip>
                <List>
                  <ListItem>
                    <ListItemText>
                      Cumplimos protocolos y normas de bioseguirdad
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      Te damas Certificado de atención para que puedas
                      movilizarte
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>Salón velatorio y cafetería</ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>Necrológico virtual</ListItemText>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20en%20salas"
                >
                  <Button color="primary" variant="contained">
                    Consultar Servicio
                  </Button>
                </a>
              </CardActions>
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/img/casa.png"
                title="funeral en casa"
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Servicio funerario a domicilio
                </Typography>
                <Chip label="4490Bs" variant="outlined" />
                <br />
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                  Todos necesitamos despedir a nuestros seres queridos, si no
                  puedes venir a nuestros Salones de velación nosotros iremos
                  donde usted.
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Recomendamos por temas de salubridad asistir al Salón
                  Velatorio
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=59133469191&text=Quiero%20información%20del%20serivicio%20funerario%20a%20domicilio"
                >
                  <Button color="primary" variant="outlined">
                    Consultar Servicio
                  </Button>
                </a>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Salas;
