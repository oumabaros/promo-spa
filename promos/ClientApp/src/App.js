import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { FetchPromos } from './components/FetchPromos';

//main component
export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        //configure routes and authorizations
        <Layout>
            <Route exact path='/' component={FetchPromos} />
            <Route path='/promos/edit/:promoid' component={FetchPromos} /> 
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
