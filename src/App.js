
import './App.css';
import { BrowserRouter as Router, Route,Switch,Redirect  } from 'react-router-dom';
import Loginsign from './components/LoginSIgn/Loginsign';
import UploadForm from './components/Assests/UploadForm/UploadForm';
import UserPage from './components/UserPage/UserPage';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/login" component={Loginsign} />
        <Route path="/upload" component={UploadForm} />
        <Route path="/user" component={UserPage} />
        <Redirect from="/" to="/login" />
      
    </Switch>
    </Router>
  );
}

export default App;
