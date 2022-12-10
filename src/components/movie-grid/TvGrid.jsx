import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import Genres from "../../pages/Genres/Genres";
import useGenre from "../../pages/Genres/useGenre";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import TvCard from "../movie-card/TvCard";
// import Search from "../../pages/Genres/Search";

const TvGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  const location = useLocation();
  console.log(location);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  // const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  // const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  console.log(genreforURL);
  const type = location.pathname === "/movie" ? "movie" : "tv";
  const getList = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=5615048566f1fe7aa70bb4078a49f1c4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    console.log(data);
    setContent(data.results);
    // setNumOfPages(data.total_pages);
  };
  console.log(content);
  useEffect(() => {
    // window.scroll(0, 0);
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreforURL, page, type]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div>
        <Genres
          type={type}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>
      <div className="section mb-3">
        <TvSearch keyword={keyword} />
      </div>
      <div className="movie-grid">
        {content.map((item, i) => (
          <TvCard item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const TvSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      // history.push(`/${category[props.category]}/search/${keyword}`);
      history.push(`/tv/search/${keyword}`);
    }
  }, [keyword, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default TvGrid;
