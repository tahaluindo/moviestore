import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import axios from "axios";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);
  //   useEffect(() => {
  //     const getDetail = async () => {
  //       const { data } = await axios.get(
  //         `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=5615048566f1fe7aa70bb4078a49f1c4&language=en-US`
  //       );
  //       console.log(data);
  //       setCasts(data.cast.slice(0, 5));
  //       // setNumOfPages(data.total_pages);
  //     };
  //     getDetail();
  //   }, [props.id]);
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
