import './App.css';
import NavBar from './components/Navbar/NavBar'
import TopRated from './components/TopRated/TopRated';
import Layout from './pages/common/Layout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Category from './containers/Category';
function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <Layout>
        <Switch>
          <Route path="/" exact component={TopRated}></Route>
          <Route path="/special" exact component={Category}></Route>
        </Switch>
      </Layout>
    </div>
    </Router>
  );
}

export default App;
