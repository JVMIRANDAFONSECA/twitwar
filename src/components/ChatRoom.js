import React from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";

/*export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    //alert("A name was submitted: " + this.state.username);
    this.sendMessage(event.target.value);
    event.preventDefault();
  }
  sendMessage = (msg) => {
    this.clientRef.sendMessage("/trend/lobby", msg);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input type="text" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <SockJsClient
          url="http://localhost:8080/ws"
          topics={["/trend/lobby"]}
          onMessage={(msg) => {
            console.log(msg);
          }}
          ref={(client) => {
            this.clientRef = client;
          }}
        />
      </div>
    );
  }
}*/

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clientConnected: false,
      messages: [],
      room: null,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => this.handleExit());
 }

  onMessageReceive = (msg, topic) => {
    let tbMsg = {
      author: msg.sender,
      message: msg.content,
    };
    this.setState((prevState) => ({
      messages: [...prevState.messages, tbMsg],
    }));
  };

  sendMessage = (msg, selfMsg) => {
    try {
      let snMsg = {
        sender: this.props.username,
        content: selfMsg.message,
        type: "CHAT",
      };
      console.log(snMsg);
      this.clientRef.sendMessage(
        "/trend/" + this.props.room,
        JSON.stringify(snMsg)
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  handleExit = () => {
      fetch("https://twit-war.herokuapp.com/api/leave?roomId=" + this.props.room + "&trend=" + this.props.lobby, {
          method: 'POST'
      });
  }

  handleClick = () => {
      this.props.setOpinion(false);
      this.handleExit();
  }

  render() {
    const wsSourceUrl = "https://twit-war.herokuapp.com/ws";
    return this.props.opinion ? (
      <div className="jumbotron centered">
        <div>
          <TalkBox
            topic={this.props.lobby}
            currentUserId={this.randomUserId}
            currentUser={this.randomUserName}
            messages={this.state.messages}
            onSendMessage={this.sendMessage}
            connected={this.state.clientConnected}
          />

          <SockJsClient
            url={wsSourceUrl}
            topics={["/trend/" + this.props.room]}
            onMessage={this.onMessageReceive}
            ref={(client) => {
              this.clientRef = client;
            }}
            onConnect={() => {
              this.setState({ clientConnected: true });
            }}
            onDisconnect={() => {
              this.setState({ clientConnected: false });
            }}
            debug={false}
          />
          <button className="btn btn-primary" onClick={this.handleClick}>Exit</button>
        </div>
      </div>
    ) : null;
  }
}
