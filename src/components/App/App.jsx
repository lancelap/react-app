import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import AddPost from '../AddPost';
import Navbar from '../Navbar';
import Article from '../routes/Article';
import NotFound from './NotFound';

function App() {
  return (
    <div className="container">
      <div className="App">
        <Navbar />
      </div>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/addpost" component={AddPost} />
        <Route path="/" exact component={Article} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
