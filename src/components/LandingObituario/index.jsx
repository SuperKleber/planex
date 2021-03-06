import React from "react";
import { Grid, Container } from "@material-ui/core";
import CardPerson from "./CardPerson";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {},
}));
const LandingObituario = ({ obituarios }) => {
  // let fullObituarios = [];
  // obituarios.forEach(({ node }, i) => {
  //   fullObituarios.push({ obituario: node });
  // });
  // previousObituarios.forEach((obituario, i) => {
  //   fullObituarios.push(obituario);
  // });
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={5}>
        {obituarios.map(({ node: obituario }, i) => {
          return (
            <Grid
              key={i}
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              className={classes.item}
            >
              <CardPerson obituario={obituario}></CardPerson>
            </Grid>
          );
        })}
      </Grid>
      <style jsx="true" global="true">{`
        body {
          background: url("/img/cielo.jpg") !important;
          background-attachment: fixed !important;
        }
      `}</style>
    </Container>
  );
};
export default LandingObituario;
