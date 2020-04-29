import React from "react";
import Profile from "./Profile";

export default class TrendList extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClickAgree = (lobby) => {
    this.props.polarity(true);
    this.props.lobby(lobby);
    this.props.setOpinion(true);
    fetch(
      "https://twit-war.herokuapp.com/api/room?trend=" +
        lobby +
        "&opinion=" +
        "true"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            room: result,
          });
          this.props.setRoom(this.state.room);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
  handleClickDisagree = (lobby) => {
    this.props.polarity(false);
    this.props.lobby(lobby);
    this.props.setOpinion(true);
    fetch(
      "https://twit-war.herokuapp.com/api/room?trend=" +
        lobby +
        "&opinion=" +
        "false"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            room: result,
          });
          this.props.setRoom(this.state.room);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
  render() {
    const { trends, username } = this.props
    const trendList = trends.map((trend) => {
      return (
        <div className="trendContainer my-5" key={trend.id}>
          <div>
            <h5>{trend.name}</h5>
            {trend.tweet_volume ? <p className="text-muted">{trend.tweet_volume} tweets</p> : null}
          </div>
          <div className="buttonContainer">
            <button
              className="btn btn-success m-2"
              onClick={() => {
                this.handleClickAgree(trend.name);
              }}
            >
              Agree
            </button>
            <button
              className="btn btn-danger  m-2"
              onClick={() => {
                this.handleClickDisagree(trend.name);
              }}
            >
              Disagree
            </button>
          </div>
        </div>
      );
    });
    return username.trim() && !this.props.opinion ? (
      <div className="container">
        <div className="jumbotron">
          <Profile />
          {trendList}
        </div>
      </div>
    ) : null;
  }
}
