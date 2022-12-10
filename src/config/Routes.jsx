import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import TvDetail from "../pages/detail/TvDetail";
import TvCatalog from "../pages/TvCatalog";

const Routes = () => {
  return (
    <Switch>
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/tv/:id" component={TvDetail} />
      {/* <Route path="/:movie/:id" component={Detail} /> */}
      <Route path="/movie" component={Catalog} />
      <Route path="/tv" component={TvCatalog} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
