import React, { Component } from "react";
import { Meteor } from "meteor/meteor";


//var request = require("request");

//response.data is needed for axios
//var request = require(‘request’);
//var query = ‘english’;
//var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +”&format=json`;

if (Meteor.isServer) {
    var wikipedia = require("node-wikipedia");
    // const wikiget = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=Belgium&limit=5";
    //const wikiget= "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${keywords}&prop=info&inprop=url&utf8=&format=json";
    //const wikiget="https://en.wikipedia.org/w/api.php?action=opensearch&search=+ ${query} +”&format=json";

    Meteor.methods({
        "wiki.article"(query) {
            return new Promise((result, reject) => {
                wikipedia.page.data(query, { content: true }, function(
                    response
                ) {
 
                    console.log("got data", response);
                    result(response);
                    
                });
            });
        }
    });
}

//async "wiki.article"(response){
// return await axios.get(url)
//.then((function (err, response, body) => {

//let data=response.data[1].data.children[0].data.body;
//let data=response.data;

// let unknown = children[0];
// let data_nested = unknown["data:"]
// let body = data_nested["body: "]
// console.log(body);
// return data;
/* if(err){
        var error = “cannot connect to the server”;
        console.log(error);
        } else {
        console.log(‘body:’, body);
        }
        })
        .catch((error) => {
        console.log(error);

        });
    }*/