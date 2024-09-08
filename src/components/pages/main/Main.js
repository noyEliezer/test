import { Link } from 'react-router-dom';
import './Main.css';

const Main = (props) => {
  return (
    <div>
      <h1 className="title">Welcome to MaintControl</h1>
      <div className="mainP">
        <p>
          A location based application that will help maintenance service
          company to complete and optimize their routine work using various
          parameters. This application will help workers to do their job more
          effective due to knowledge database , work sequence and work
          documentation.
        </p>
      </div>
      <Link className="loginButton" to="login">
        Login Page
      </Link>
    </div>
  );
};

export default Main;
