import React, { useEffect, useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "../Search/Search";
import logo from "../../Images/logo.png";
import Image from "../Image/Image";
import Suggestions from "../Search/Suggestions/Suggestions";
import {API_KEY} from '../../constants/constants';
import axios from 'axios';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bgAppBar: {
    backgroundColor: "#007be0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const NavBar = () => {
  const suggestionContainer = useRef(null);
  const [deviceViewPort, setDeviceViewPort] = useState("visible");
  useEffect(() => {
    setDeviceViewPort(window.innerWidth > 600 ? "none" : "visible");
    const handlerResize = window.addEventListener("resize", () => {
      setDeviceViewPort(window.innerWidth > 600 ? "none" : "visible");
    });
    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, [deviceViewPort]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (e) =>{
    if(!suggestionContainer.current.contains(e.target)){
        setSearchValue("");
    }
  }

  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);

  const onChangeSearchHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    axios.get(`https://dummyproducts-api.herokuapp.com/api/v1/products/search?term=${value}&apikey=${API_KEY}&limit=10`).then((d)=>{
        setSuggestionData(d.data.data);
    }).catch((e)=>{
        console.log(e);
    })
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bgAppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            style={{ display: deviceViewPort }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Image image={logo} width="120px" height="60px" />
          <Search
            placeholder="Search Products..."
            value={searchValue}
            onChangeSearchHandler={onChangeSearchHandler}
            suggestions={(width, isVisible) => (
              <Suggestions
                width={width}
                isVisible={isVisible}
                suggestionContainer={suggestionContainer}
                suggestionData={suggestionData}
              />
            )}
          ></Search>
          <ul className="AppBarLink">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/special">Special</Link></li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
