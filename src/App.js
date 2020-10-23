import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from './components';
import { Home, Cart } from './pages';
import { setPizzas, fetchPizzas } from './redux/actions/pizzas';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path='/' component={Home}/>
        <Route exact path='/cart' component={Cart}/>
      </div>
    </div>
  )
}

export default App;
