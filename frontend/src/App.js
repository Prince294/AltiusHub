import './styles/main.scss';
import Router from './routes';
import ErrorPopup from "./shared/Models/ErrorPopup";
import SuccessPopup from "./shared/Models/SuccessPopup";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/reducer/LoginReducer";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const value = localStorage.getItem('loggedIn');
    if (value && value === 'true') {

      var date = new Date();
      var oldDate = new Date(localStorage.getItem('loggedInTime'));

      var diff = (date - oldDate) / 1000;
      console.log(diff)
      if (diff > 5 * 60) {
        dispatch(logout());
      } else {
        dispatch(login());
      }

    }
    else {
      dispatch(logout());
    }
  }
  return (
    <div className="App">
      <Router />
      <ErrorPopup />
      <SuccessPopup />
    </div>
  );
}

export default App;
