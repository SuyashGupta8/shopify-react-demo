import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: "#000",
    border: "1px solid #f2f2f2",
    zIndex: "1000"
  },
  listItem: {
    borderBottom: "1px solid #f2f2f2",
  },
}));

const Suggestions = ({
  width,
  isVisible,
  suggestionContainer,
  suggestionData,
}) => {
  const classes = useStyles();
  const displayClass = isVisible ? "block" : "none";

  return (
    <div ref={suggestionContainer}>
      <List
        component="nav"
        style={{ width: width, display: displayClass }}
        className={classes.root}
        aria-label="contacts"
      >{
        suggestionData.length > 0 &&
        suggestionData.map((e) => {
          return (
            <ListItem key={e._id} className={classes.listItem}>
                <img src={e.product_image_sm} width="40" height="40" alt="Product Images"/>
              <ListItemText primary={e.product_name} secondary={`in ${e.product_department} Category`} />
            </ListItem>
          );
        })
      }</List>
    </div>
  );
};

export default Suggestions;
