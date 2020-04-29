import React from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLoginAttempt = async () => {
    const auth0 = await createAuth0Client({
      domain: "twitwar.eu.auth0.com",
      client_id: "g7vWpCLneLdOPUeRx5KHeskBEwbcPQUa",
    });
    await auth0.loginWithRedirect({
      redirect_uri: "https://ojaoc.github.io/hackertrollerz-ui/",
    });
    //logged in. you can get the user profile like this:
    //const user = await auth0.getUser();
    console.log(auth0);
    //this.props.setUsername(user.username);
  };

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    //alert("A name was submitted: " + this.state.username);
    this.props.setUsername(this.state.username);
    event.preventDefault();
  }

  render() {
    return !this.props.username.trim() ? (
      <div className="jumbotron centered">
        <div className="form-group">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="p-2">
                Username:
                <input
                  className="form-control"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    ) : null;
  }
}
