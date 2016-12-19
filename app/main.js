import React from 'react'
import { render } from 'react-dom'
import AppComponent from './components/App.js'
import About from './components/About.js'
import Repos from './components/Repos.js'
import Repo from './components/Repo.js'
import Home from './components/Home.js'
import routes from './components/routes.js'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
render((
    <Router routes={routes} history={browserHistory}>
    </Router>
), document.getElementById('content'))