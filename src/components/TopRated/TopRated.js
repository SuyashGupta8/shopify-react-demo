import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../../constants/constants";
import CardList from "../shared/CardList/CardList";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    height: "max-content",
  },
}));
const TopRated = () => {
  const classes = useStyles();
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://dummyproducts-api.herokuapp.com/api/v1/products/toprated?apikey=${API_KEY}&limit=20`
      )
      .then((d) => {
        setTopRated(d.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Fragment>
        <h2 style={{textAlign:'center'}}>Top Rated Products</h2>
      <div className={classes.root}>
        <CardList number={6} data={topRated} />
      </div>
    </Fragment>
  );
};

export default TopRated;
