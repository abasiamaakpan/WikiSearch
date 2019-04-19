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
      links: [],
      content:"",
      publications:"",
      _html:""


      //err:""
    };
  }


  onChange(evt) {
    this.setState({
      search: evt.target.value,
      history: evt.target.value
    });
  }

  onClick(event){
    event.preventDefault();
    Meteor.call("wiki.article", event.target.value, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("got data", response);
        this.setState({
          links: response.links,
          content: response.text["*"],
        });
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
          links: response.links,
          content: response.text["*"],
        });
      });

    }
  }

  /*renderWiki() {
    return this.state.links.map(m =>
     
     console.log(m)
     );
     
  }*/



  renderLinks() {
    return this.state.links.map((p,i) => 
      <button key={i}
          value={p["*"]}
          onClick={this.onClick.bind(this)}>
        {p["*"]}
      </button>);
  }

  renderClickedLinks(){

  }

 /* renderContent(){
    return this.state.content.map((p,j) => 
      <button key={j}>
        {p.content}
      </button>);
  }*/


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

        <h1>History</h1>


        <h1> Links</h1>
        {this.renderLinks()}

        <h1> Content</h1>
        <span dangerouslySetInnerHTML={
          {__html: this.state.content}}
               onClick={this.onClick.bind(this)}>
        </span>

        <h1> Publications</h1>


      </div>

    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);