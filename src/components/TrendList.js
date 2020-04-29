import React from "react";

export default class TrendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClickedOpinion: false,
    };
  }
  handleClickAgree = (lobby) => {
    this.props.opinion(true);
    this.props.polarity(true);
    this.props.lobby(lobby);
    this.setState({
      hasClickedOpinion: true,
      room: null,
    });
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
    this.props.opinion(true);
    this.props.polarity(false);
    this.props.lobby(lobby);
    this.setState({
      hasClickedOpinion: true,
    });
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
    const { trends, username } = this.props;
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
    return username.trim() && !this.state.hasClickedOpinion ? (
      <div className="container">
        <div className="jumbotron">
          <h3 className="text-center overflow-auto">Welcome, {username}!</h3>
          {trendList}
        </div>
      </div>
    ) : null;
  }
}
