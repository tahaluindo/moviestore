import React from "react";

import { useParams } from "react-router";

import PageHeader from "../components/page-header/PageHeader";

import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/movie-grid/MovieGrid";
import TvGrid from "../components/movie-grid/TvGrid";

const TvCatalog = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <TvGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default TvCatalog;
