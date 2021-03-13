import { Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { Fragment } from "react";
import Card from "../Card/Card";
import DefaultImage from "../../../Images/DefaultImage.jpg";
const CardList = ({ number, data }) => {
  const updData = [...data].slice(0, number);
  const onError = (e) => {
    e.target.src = DefaultImage;
  }
  const result =
    updData &&
    updData.map((e, i) => {
      return (
        <Card key={e._id}>
          <h4 style={{ textAlign: "center", height: "50px" }}>
            {e.product_name}
          </h4>
          <img
            width="200"
            height="200"
            src={e.product_image_lg}
            alt={e.product_name}
            onError={onError}
          />
          <p>
            Ratings{" "}
            <Rating
              name="size-small"
              defaultValue={e.product_ratings}
              size="small"
              disabled
            />
          </p>
          <b>Price : Rs </b>
          {e.product_price}
          <p>
            <Button variant="outlined" color="secondary">
              Add to Cart
            </Button>
          </p>
        </Card>
      );
    });
  return <Fragment>{result}</Fragment>;
};

export default CardList;
