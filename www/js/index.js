/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//Used to convert from Euro to Dollar
function ConvertFromEuroToDollar(){

    var http = new XMLHttpRequest();

    const url = "http://apilayer.net/api/live?access_key=3acba6085ce91abf02875623fe3545b1&currencies=EUR,USD&format=1";
    // Preparing the request
    http.open("GET", url);
    // Sending the request
    http.send();
   // Called when we get a response
    http.onreadystatechange = (e) => {
        // Getting the response in a text format
        var response = http.responseText;
        // converting the response from a text format to a json format
        var responseJSON = JSON.parse(response); 

       
        //Retriveing the currency rate from the json object
        var currencyRate = parseFloat(responseJSON.quotes.USDEUR);
      
        //Currency Conversion calculation
        var finalValue = parseFloat(document.getElementById("EuroAmount").value)/currencyRate;
        //Assigning to the html element
        document.getElementById("EuroToDollarAmount").innerHTML = "$" + String(finalValue);
    }
}

//Used to convert from Dollar to Euro
function ConvertFromDollarToEuro(){
    var BaseElement = document.getElementById("DollarToEuro");

    var http = new XMLHttpRequest();

    const url = "http://apilayer.net/api/live?access_key=3acba6085ce91abf02875623fe3545b1&currencies=USD,EUR&format=1";
    // Setting up the request
    http.open("GET", url);
    // Sending the request
    http.send();
    // Called when we get a response
    http.onreadystatechange = (e) => {
        // Getting the response in a text format
        var response = http.responseText;
        // converting the response from a text format to a json format
        var responseJSON = JSON.parse(response); 

        //Retriveing the currency rate from the json object
        var currencyRate = responseJSON.quotes.USDEUR;

        //Currency Conversion calculation
        var finalValue = parseFloat(document.getElementById("DollarAmount").value)*currencyRate;

         //Assigning to the html element
        document.getElementById("DollarToEuroAmount").innerHTML = "€" +  String(finalValue);
   }
}
