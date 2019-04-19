import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //photos:[],
      //comments:[],
      wiki: []
      //err:""
    };
  }
  //move to component did mount to inputs event handler
  componentDidMount() {
    Meteor.call("wiki.article",this.state.wiki, (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("got data", response);
      this.setState({
        wiki: response
      });
    });
  }

  /* renderComments(){
      return this.state.comments.map(p =>
        <div>
        {p.kind}
        {p.data.body}
        </div>
        )
    }*/

  renderWiki() {
    return this.state.wiki.map(p => <div>{p}</div>);
  }

  render() {
    return (
      <div>
        {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
        <h1>Wikipedia Search</h1>

        {/*{=
        this.renderComments()
      }*/}

        {this.renderWiki()}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);