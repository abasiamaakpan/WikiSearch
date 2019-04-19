import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import {withRouter} from "react-router-dom";



 class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state={component : (<div><h1 className="text-center">Reddit</h1>)}
  }



    render() {
    return (
      <div>
      <AccountsUIWrapper/>
      {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
      {Meteor.userId()?  (<Redirect to="/parsedcomments"/>)
        <h1>Reddit</h1>

      {
        this.renderComments()
      }
      
      </div>
    );
  }
}


    /*console.log("cdm")
    fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9e82efc5665278bb92f25cf0e47f16d4&text=cats&sort=relevance&format=json&nojsoncallback=1")
    .then(data => data.json())
    .then(jsonData => {
      console.log("got data", jsonData)
      this.setState({
      photos: jsonData.photos.photos
    })
  })
    .catch(err => this.setState({
      err
    }));*/
   




  


export default withTracker(() => {
  return ({
    user:Meteor.user()
  });
})(withRouter(Welcome));

