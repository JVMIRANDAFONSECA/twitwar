import React from "react";
import TrendList from "./TrendList";
import LoginScreen from "./LoginScreen";
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: null,
      isLoaded: false,
      trends: [],
      hasClickedOpinion: false,
      lobby: "",
      polarity: null,
      room: null,
    };
  }
  componentDidMount() {
    let token =
      "AAAAAAAAAAAAAAAAAAAAAC2uDwEAAAAAuUTw%2FQnHL9lqek0ODTp64ROuGBU%3D7fwFkHZVgPMjz3FdOVhZlsE7idVKtyI2kJj6zofXQx8JduNHvh";
    fetch("https://twit-war.herokuapp.com/api/trends?bt=" + token)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            trends: result[0].trends,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  setUser = (username) => {
    this.setState({ username: username });
  };
  setHasClickedOpinion = (boolean) => {
    this.setState({ hasClickedOpinion: boolean });
  };
  setLobby = (trendName) => {
    this.setState({ lobby: trendName });
  };
  setPolarity = (boolean) => {
    this.setState({ polarity: boolean });
  };
  setRoom = (number) => {
    this.setState({ room: number });
  };
  render() {
    const { error, isLoaded, trends } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state.trends);
      return (
        <>
          <LoginScreen
            setUsername={this.setUser}
            username={this.state.username}
          />
          <TrendList
            trends={this.state.trends}
            username={this.state.username}
            opinion={this.setHasClickedOpinion}
            polarity={this.setPolarity}
            lobby={this.setLobby}
            setRoom={this.setRoom}
          />
          <ChatRoom
            username={this.state.username}
            opinion={this.state.hasClickedOpinion}
            polarity={this.state.polarity}
            lobby={this.state.lobby}
            room={this.state.room}
          />
        </>
      );
    }
  }
  /*return (
      <div className="container">
        <LoginScreen
          setUsername={this.setUser}
          username={this.state.username}
        />
        <TrendList trends={this.state.trends} username={this.state.username} />
      </div>
    );*
    /*return (
        <div className="container">
            <ChatRoom />
        </div>
    )*/
}
