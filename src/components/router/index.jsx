import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyPlaylistPage from "../../pages/myPlaylist/playlist";
import PlaylistPage from '../landing/index';
import LoginPage from "../../pages/login/login";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/reducer/reducer";

const SpotifyRoute = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const scope = process.env.REACT_APP_SCOPE;
  const redirect = process.env.REACT_APP_REDIRECT;
  const auth_link = `https://accounts.spotify.com/id/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect}&show_dialog=true`;
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  const getHash = () => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }

        return initial;
      }, {});

    window.location.hash = "";

    return hash;
  };

  const componentDidMount = () => {
    const hash = getHash();
    const temp = hash.access_token;

    if (temp) {
      dispatch(setToken(temp));
      localStorage.setItem("token", temp);
      console.log(temp);
    }
  };

  componentDidMount();

  console.log(token);
  return (
    <Router>
      <Switch>
        <Route path="/create-playlist">
          {localStorage.getItem("token") === " " ? (
            <Redirect to="/" />
          ) : (
            <PlaylistPage />
          )}
        </Route>
        <Route path="/my-playlist">
          {localStorage.getItem('token') === ' ' ? (
            <Redirect to="/" />
          ) : (
            <MyPlaylistPage />
          )}
        </Route>
        <Route path="/">
          {token === " " ? (
            <LoginPage auth_link={auth_link} />
          ) : (
            <Redirect to="/create-playlist" />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default SpotifyRoute;
