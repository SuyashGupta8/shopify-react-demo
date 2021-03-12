import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      position:'absolute',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      color:"#000",
      border:"1px solid #f2f2f2"
    },
    listItem:{
        borderBottom:"1px solid #f2f2f2"
    }
}));

const Suggestions = ({width, isVisible}) => {
  const classes = useStyles();
  const displayClass = isVisible ? 'block': 'none';
  return (
    <div>
      <List component="nav" style={{width:width, display:displayClass}} className={classes.root} aria-label="contacts">
        <ListItem className={classes.listItem}>
          <ListItemText primary="Chelsea Otakan" />
        </ListItem>
      </List>
    </div>
  );
};

export default Suggestions;
