import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

// import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";

const MovieCard = (props) => {
  console.log(props);
  const item = props.item;
  const category = useParams();
  console.log(category);
  //   const link = "/" + category[props.category] + "/" + item.id;
  //   const link = `/${props.category}` + "/" + item.id;
  //   const route = category == "tv" ? "tv" : "movie";
  //   const link = `/${route}` + "/" + item.id;
  const link = "/movie/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
