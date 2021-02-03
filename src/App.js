import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ComponentA, ComponentB, ComponentC, Navbar } from './components';
import { ContainerA, ContainerB } from './containers';

const App = () => {

  // https://reactrouter.com/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Home Page</h1>
      <Router>
        <Navbar />
        <Switch>
            <Route exact path="/A" component={ComponentA} />
            <Route exact path="/B" component={ComponentB} />
            <Route exact path="/C" render={(routeProps) => <ComponentC {...routeProps} hello={'Hello'} /> }/>
            <Route render={() => <h1>Error</h1> }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
