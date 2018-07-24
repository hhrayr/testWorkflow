import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import Header from './components/header';
import routes from './routes';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Switch>
            {routes.map((route) => {
              return (
                <Route
                  {...route}
                  key={route.pageName}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
