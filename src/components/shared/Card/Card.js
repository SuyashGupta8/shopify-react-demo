import { Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
  },
}));
const Card = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>{children}</Paper>
    </div>
  );
};

export default Card;
