import React from "react";
import { Box, Paper, Button, Container } from "@material-ui/core";
import { Link } from "gatsby";
import Back from "@material-ui/icons/ArrowBackIos";
import Forward from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    margin: "24px 0",
    minWidth: "0 !important",
    "& a": {
      width: "10%",
      "& button": {
        width: "100%",
        padding: "3px 7px",
        minWidth: 0
      }
    }
  },
  disabled: {
    cursor: "initial"
  }
}));
export const PaginateMenu = ({ index, limit }) => {
  const classes = useStyles();
  const pageLength = 7;
  const position = Math.ceil(index / pageLength);

  let paginate = [];
  for (let i = 0; i < pageLength; i++) {
    paginate.push(i + 1 + (position - 1) * pageLength);
  }
  return (
    <Container className={classes.root}>
      <Paper>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Link
            to={`/obituarios/${
              index - pageLength <= 1 ? "" : index - pageLength
            }`}
          >
            <Button>
              <Back></Back>
            </Button>
          </Link>
          {paginate.map(pageNum => {
            let isLimit = pageNum > limit ? true : false;
            return (
              <Link
                className={isLimit ? classes.disabled : ""}
                to={`/obituarios/${
                  pageNum === 1 ? "" : isLimit ? limit : pageNum
                }`}
              >
                <Button
                  disabled={isLimit ? true : false}
                  variant={pageNum === index ? "contained" : "text"}
                  color={pageNum === index ? "primary" : "default"}
                >
                  {pageNum}
                </Button>
              </Link>
            );
          })}
          {index !== limit && (
            <Link to={`/obituarios/${limit}`}>
              <Button>{limit}</Button>
            </Link>
          )}
          <Link
            to={`/obituarios/${
              index + pageLength >= limit ? limit : index + pageLength
            }`}
          >
            <Button>
              <Forward></Forward>
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};
