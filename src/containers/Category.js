import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSideBar from "../components/FilterSideBar/FilterSideBar";
import { Rating } from "@material-ui/lab";
import { API_KEY } from "../constants/constants";
import CardList from "../components/shared/CardList/CardList";
import { makeStyles } from "@material-ui/core/styles";
import UrlBuilder from "../utils/UrlBuilder";
import { Backdrop, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    height: "max-content",
    margin:"5px"
  },
  topLevelRoot: {
    display: "grid",
    gridTemplateColumns: "2fr 6fr",
    height: "max-content",
  },
  backdrop: {
    zIndex: 5000,
    color: "#fff",
  },
}));

const Category = () => {
  const classes = useStyles();
  const [categoryWiseData, setCategoryWiseData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const fields = {
    ratings: {
      aggregation: [...new Array(6)].map((e, i) => {
        return {
          value: (
            <Rating
              name="size-small"
              key={e}
              defaultValue={5 - i}
              size="small"
              disabled
            />
          ),
          keys: `lte_${5 - i}`,
          isChecked: false,
        };
      }),
      text: "Filter by Rating",
      type: "radio",
      name: "ratings",
      id: "_idFilterByRating",
    },
    color: {
      aggregation: [
        { keys: "teal", value: "Teal", isChecked: false },
        { keys: "cyan", value: "Cyan", isChecked: false },
        { keys: "orchid", value: "Orchid", isChecked: false },
        { keys: "plum", value: "Plum", isChecked: false },
        { keys: "ivory", value: "Ivory", isChecked: false },
        { keys: "lavender", value: "Lavender", isChecked: false },
      ],
      text: "Filter by Color",
      type: "radio",
      id: "_idFilterByColor",
      name: "color",
    },
    departmentId: {
      aggregation: [
        { keys: "homeandliving", value: "Home & Living", isChecked: false },
        { keys: "schoolsupplies", value: "School Supplies", isChecked: false },
        {
          keys: "healthandbeauty",
          value: "Health & Beauties",
          isChecked: false,
        },
        { keys: "Groceries", value: "Groceries", isChecked: false },
        { keys: "Pets", value: "Pets", isChecked: false },
        { keys: "fashionwomen", value: "Fashion (Women)", isChecked: false },
      ],
      text: "Filter by Categories",
      type: "radio",
      id: "_idFilterByCategories",
      name: "departmentId",
    },
    price: {
      aggregation: [
        { value: "Less than Rs 2000", keys: "lte_2000", isChecked: false },
        { value: "Less than Rs 3000", keys: "lte_3000", isChecked: false },
        { value: "Less than Rs 4000", keys: "lte_4000", isChecked: false },
        { value: "Less than Rs 5000", keys: "lte_5000", isChecked: false },
        { value: "More than Rs 5000", keys: "gte_5000", isChecked: false },
      ],
      text: "Filter by Price",
      type: "radio",
      id: "_idFilterByPrice",
      name: "price",
    },
    material: {
        aggregation: [
          { value: "Steel", keys: "Steel", isChecked: false },
          { value: "Iron", keys: "Iron", isChecked: false }
        ],
        text: "Filter by Material",
        type: "radio",
        id: "_idFilterByMaterial",
        name: "material",
      },
      stock: {
        aggregation: [
          { value: "Less than 24", keys: "lte_24", isChecked: false },
          { value: "Greater than 50", keys: "gte_50", isChecked: false }
        ],
        text: "Filter by Stock",
        type: "radio",
        id: "_idFilterByStock",
        name: "stock",
      },
  };
  const [formFields, setFormFields] = useState(fields);
  const onChangeFilterHandler = (e) => {
    const updatedFormFields = clearAllFields(
      formFields,
      e.target.name,
      e.target.value
    );
    const aggs = updatedFormFields[e.target.name].aggregation;
    for (let i = 0; i < aggs.length; i++) {
      if (aggs[i].keys + "" === e.target.value) {
        aggs[i].isChecked = true;
        const updFilters = { ...filters };
        updFilters[e.target.name] = e.target.value;
        setFilters(updFilters);
      }
    }
    setFormFields(updatedFormFields);
  };
  const clearAllFields = (state, name, value) => {
    const updatedState = { ...state };
    updatedState[name].aggregation.forEach((e) => {
      e.isChecked = false;
    });
    return updatedState;
  };
  const onClearHandler = (e) => {
    const updatedFormFields = clearAllFields(
      formFields,
      e.target.name,
      e.target.value
    );
    setFormFields(updatedFormFields);
    const updFilters = { ...filters };
    delete updFilters[e.target.name];
    setFilters(updFilters);
  };

  useEffect(() => {
    setLoading(true);
    const url = UrlBuilder(filters) ? `&${UrlBuilder(filters)}` : "";
    axios
      .get(
        `https://dummyproducts-api.herokuapp.com/api/v1/products?apikey=${API_KEY}&limit=1000${url}`
      )
      .then((d) => {
        setCategoryWiseData(d.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [filters]);
  return (
    <div className={classes.topLevelRoot}>
      {formFields && (
        <FilterSideBar
          onChangeHandler={onChangeFilterHandler}
          onClearHandler={onClearHandler}
          value={formFields}
        />
      )}
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className={classes.root}>
          <CardList number={48} data={categoryWiseData} />
        </div>
      )}
    </div>
  );
};
export default Category;

