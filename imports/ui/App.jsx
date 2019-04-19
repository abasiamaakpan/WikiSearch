import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import PropTypes from "prop-types";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //photos:[],
      //comments:[],
      //wiki: "",
      search: "",
      links: []

      //err:""
    };
  }
  //move to component did mount to inputs event handler

  /*componentDidMount() {

  }*./



  renderWiki() {
    return this.state.links.map(m =>
     <div>
     {m.links}
     </div> );
  }*/

  onChange(evt) {
    this.setState({
      search: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      Meteor.call("wiki.article", this.state.search, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("got data", response);
        this.setState({
          links: response.links
        });
      });
    }
  }

  /*renderWiki() {
    return this.state.links.map(m =>
     
     console.log(m)
     );
     
  }*/

  renderWiki() {
    return this.state.links.map((p,i) => 
      <button key={i}>
        {p["*"]}
      </button>);
  }

  render() {
    return (
      <div>
        {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
        <h1>Wikipedia Search</h1>

        <label htmlFor="inSearch">
          Search:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter your query"
            value={this.state.search}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
        </label>

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