import React from "react";
import { Grid, Container } from "@material-ui/core";
import CardPerson from "./cardPerson";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  item: {}
}));
const LandingObituario = ({ obituarios }) => {
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
              md={4}
              lg={3}
              xl={2}
              className={classes.item}
            >
              <CardPerson obituario={obituario}></CardPerson>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default LandingObituario;
