import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
// import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import { Provider } from "react-redux";
import store from "store/store";
import RegisterPage from "views/LoginPage/RegisterPage";
import Write from "views/Write";
import FuseMessage from "components/FuseMessage";
import PrivateRoute from "common/PrivateRoutes";
// import OurStory from "views/OurStory";ss
import Loading from "common/Loading";
// import LoadingProgress from "common/LoadingProgress";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Suspense fallback={<Loading />}>
        {/* <LoadingProgress /> */}
        <Switch>
          <PrivateRoute
            path="/profile-page/:id"
            exact
            component={lazy(() => import("views/ProfilePage/OtherProfile"))}
          />
          <PrivateRoute
            path="/profile-page"
            exact
            component={lazy(() => import("views/ProfilePage/ProfilePage"))}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/post" component={Write} />
          <Route
            path="/ourstory/:id"
            component={lazy(() => import("views/OurStory/OneStory"))}
          />
          <Route
            path="/ourstory"
            component={lazy(() => import(`views/OurStory`))}
          />
          <Route
            path="/addcategory"
            component={lazy(() => import(`views/AdminView/AddCategory`))}
          />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Suspense>
    </Router>
    <FuseMessage />
  </Provider>,
  document.getElementById("root")
);
