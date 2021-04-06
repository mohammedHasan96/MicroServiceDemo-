import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import NavBar from './components/NavBar';
import 'antd/dist/antd.css';
import './App.css';

const Signup = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CartPage = React.lazy(() => import('./pages/Cart'));
const ProductCreate = React.lazy(() => import('./pages/Products/Create'));
const ProductEdit = React.lazy(() => import('./pages/Products/Edit'));

function App() {
  return (
    <>
      <div className='App'>
        <Suspense fallback={<Spin size='large' className='spinner' />}>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/cart' component={CartPage}></Route>
            <Route exact path='/products/:id/edit' component={ProductEdit}></Route>
            <Route exact path='/products/create' component={ProductCreate}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/signup' component={Signup}></Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default App;
