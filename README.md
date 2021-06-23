# React Router Setup and Guide
## Title: Documentation
## Author: Rafael Batista
## Date: 06/23/2021

<br>

## Set Up

<br>

### The first thing we need to do is install react router. Enter this in the terminal <br>
<br>  

```
  npm install react-router-dom
```
<br>


###  The next step is to import BrowswerRouter and wrap it around our main App component in 'index.js', wrapping over every component in App.js, or wherever your main entrypoint is.
<br>

#### Example using index.js

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter }  from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </ BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

#### Example using App.js

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importing BrowserRouter as Router is of course optional

const App = () => {
  return (
    <Router> // We wrap our components in Router which we imported from react router
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
     </div>
    </Router>
  );
}

export default App;
```

<br>

####  We have our react router set up. There are a couple of things we will import to add routes. which are Route, and Switch.

<br>

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router. Route, Switch } from 'react-router-dom'; // We import Route and Switch along with BrowserRouter

const App = () => {
  return (
    <Router>
      <Switch>
        // Here is where we will add our routes along with what component to render when we hit that route
        // The reason to use a switch is because we want to render a route exclusively. We don't want our '/' route to render our 404 route as well for example
      </Switch>
    </Router>
  );
}

export default App;
```

## Add Routes

<br>

###  There are two ways to add a route and there are differences

<br>

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { A, B, C } from './components'; // Here are some components that we want to render when we hit certain routes

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/A" component={A} />
          /*
            The last prop 'component' tells React Router which component we want to render when we hit this specific route.
            The second prop 'path' tells React Router that this is the URL path that we must hit to render our component
            The first prop 'exact' tells React Router to only render our A component if the path is exactly '/A'
          */
        </Switch>
      </Router>
  );
}

export default App;
```

###  There is another way to use Routes.

<br>

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { A, B, C } from './components'; // Here are some components that we want to render when we hit certain routes

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/A" render={ (routeProps) => <A {...routeProps} /> } />
          /*
            Instead of using the 'component' prop, we use 'render' instead. If we do we must an arrow function and pass a parameter that we decided to call routeProps. We then return the 'A' component as pass in routeProps.
          */
        </Switch>
      </Router>
  );
}

export default App;
```


###  The routeProps will make sense but before that let's discuss the differences between 'component' and 'render'
<br>

####  When we use 'component', we don't have to pass in a parameter such as 'routeProps' in the second example. It is implicitly passed. I will get to it later but for right now, one of the differences is that a prop is implicitly passed when we use 'component' and we need to explicitly pass in props with render if we want to make use of the props that Route passes

<br>

####  Another differnce is that 'component' will create a new component and trigger all the lifecycle events, render will only create the component once and re render the component if already on that route.

<br>

####  Remember this destinction if you are having issues with lifecycle events

<br>

###  Let's set up the rest of the routes and show how we can navigate to routes from our components
<br>

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { A, B, C } from './components'; // Here are some components that we want to render when we hit certain routes

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/A" component={A} />
          <Route exact path="/B" render={ (routeProps) => <B {...routeProps} /> } />
          <Route exact path="/C" component={C} />
        </Switch>
      </Router>
  );
}

export default App;
```


###  Now, let's say we want to be able to navigate from the 'A' component to 'B' In order to do this we will make use of another component that React Router gives us called NavLink

```jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // import NavLink from React Router

const A = () => {
    return (
        <>
          <Link exact to='/B'>
            B
          </Link>

          <NavLink exact activeClassName='active-link' to='/C'> /* We can add some css to style it if the link is active 8 */
            B
          </NavLink>
        </>
    )
};

export default A;
```
<br>

####  We import Link and use the component to create a link to the B component. We use NavLink whenever we want to style the link when the URL matches the current URL. We can use the activeClassName props when we want to style the link when it is active. For example, we can add this to wherever our CSS file is
<br>

```css
  .active-link {
    color: blue;
    border-bottom: 1px solid white;
  }
```
<br>

###  Now whenver the NavLink component is active we will apply the style 'active-link' which makes the color blue with a border bottom

<br>

## Route Props
<br>


###  Remember that routeProps we passed to the render prop above? Those props contain different properties.

<br>

```
  History - This handles session history. Some of the properties of history are 'length' and 'action'

  Location - Locations represent where the app is now, where you want it to go, or even where it was

  Match - A match object contains information about how a <Route path> matched the URL. Some of the properties are 'params', 'path', and 'url'
```


###  Let's make use of history and create a button to go back

<br>

```jsx
// src/components/A
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // import NavLink from React Router

const A = (props) => {
  const { history } = props; // Remember, when we use the component prop in 'Route', these props are implicitly passed

    return (
        <>
          <Link exact to='/B'>
            B
          </Link>

          <button onClick={history.goBack}>Go Back</button>

        </>
    )
};

export default A;
```


###  If we want to use route params and grab those route params, we can do so like this

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { A, B, C } from './components';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/:id" children={<A />} />
        </Switch>
      </Router>
  );
}

/*
  You use children when we want React to render whether the path matches or not. For example, imagine we have a route '/users/:id'. We may want to render the page regardless of the route params. We can conditionally render in the component. for example just say "Hey, this user does not exist" or render the component. Regardless in this case we may want to render something anyways
*/
```

```jsx
// src/components/A
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom'; // import NavLink from React Router

const A = (props) => {
  const { history } = props; // Remember, when we use the component prop in 'Route', these props are implicitly passed
  let { id } = useParams();

    return (
        <>
          <Link exact to='/B'>
            B
          </Link>

          <button onClick={history.goBack}>Go Back</button>

          <div>
            <h3>ID: {id}</h3>
          </div>

        </>
    )
};
```

### Let's see how we can pass data through the URL

<br>

```jsx
// src/components/A
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom'; // import NavLink from React Router

const A = (props) => {
  const { history } = props; // Remember, when we use the component prop in 'Route', these props are implicitly passed
  let { id } = useParams();

    return (
        <>
          <Link {
            pathname: '/c',
            state: {
              fromA: true
            }
            }>
            B
          </Link>

          <button onClick={history.goBack}>Go Back</button>

          <div>
            <h3>ID: {id}</h3>
          </div>
        </>
    )
};
```

```jsx
// src/components/C
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

const C = (props) => {
    const { fromA } = props.location.state

    return (
        <h1>{fromA}<h1/>
    )
};

export default C;
```

### If we want to add a 404, we can simply do this

<br>

### add this as the last route. Must be used within a switch and must be the last route

```jsx
 <Route render={() => <h1>Error</h1> }/>
```
<br>

## Redirects

<br>

```jsx
// src/components/D
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

const D = (props) => {
    const { name } = props.location.state

    return (
        <div>
        {/\d/.test(name) ? ( // test if name contains a digit
          <Redirect to='/' />
        ) : (
          <div>
            <h1>Hello {name}</h1>
          </div>
        )}
        </div>
    )
};

export default D;

```