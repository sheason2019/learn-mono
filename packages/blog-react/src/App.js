import './App.css';
import 'fontsource-roboto';
import React from 'react';
import { Route, Switch, Redirect,BrowserRouter } from 'react-router-dom';
import Index from './index/Index';
import Doc from './doc/Doc';
import initAuthToken from './login/initAuthToken';
import { handleGetUserinfo } from './action/handleGetUserinfo';
import MyDrawer from './Layout/MyDrawer';
import TimeFlow from './article/TimeFlow';
import ArticleRead from './article/ArticleRead';
import ArticleGroup from './article/ArticleGroup';
import ChangeArticle from './doc/ChangeArticle';

export const UserContext = React.createContext(undefined);

function App() {
  initAuthToken()

  React.useEffect(()=>{
    handleGetUserinfo();
  },[])
  
  return (
    <BrowserRouter>
      <MyDrawer />
      <Switch>
        <Route path="/index" component={Index} />
        <Route path='/doc/:contentid' component={ChangeArticle} />
        <Route path='/doc' component={Doc} />
        <Route path='/article/read/:contentid' component={ArticleRead} />
        <Route path='/article/:groupid' component={TimeFlow} />
        <Route path='/articlegroup' component={ArticleGroup} />
        <Redirect from="/" to="/index" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

