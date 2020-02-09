
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';

import { Round } from './components/Rounds/Round';
import { Result } from './components/Result/Result';
import { Statics } from './components/Statics/Statics';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
    constructor(props) {
        super(props);
        var context = { currentRound:0
        }
        this.state = { currentRound: 0 };
       
    }
  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home}  />
            <Route path='/round' component={Round} />
            <Route path='/result' component={Result} />
            <Route path='/statics' component={Statics} />
      </Layout>
    );
  }
}
