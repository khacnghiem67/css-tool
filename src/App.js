import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import BoxShadow from './components/BoxShadow';
import Transform from './components/Transform';
import TextShadow from './components/TextShadow';
import Border from './components/Border';
import Gradient from './components/Gradient';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />

        <Switch>
          <Route
            exact
            path='/'
            component={() => <Redirect to='/box-shadow' />}
          />
          <Route path='/box-shadow' component={BoxShadow} />
          <Route path='/transform' component={Transform} />
          <Route path='/text-shadow' component={TextShadow} />
          <Route path='/border' component={Border} />
          <Route path='/gradient' component={Gradient} />
          <Route
            path='*'
            component={() => (
              <h1 className='text-center text-muted mt-5 display-3'>
                Not Found
              </h1>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
