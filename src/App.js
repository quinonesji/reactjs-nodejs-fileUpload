import React, { Component } from "react";

import axios from "axios";

import "./App.css";
//resource came from
//https://medium.freecodecamp.org/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null, fname: "", lname: "" };
  }

  handleselectedFile = event => {
    event.preventDefault();
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  ResetState = event => {
    event.preventDefault();
    this.setState({ selectedFile: null, fname: "", lname: "" });
    document.getElementById("fileId").value = "";
  };

  handleUpload = event => {
    event.preventDefault();
    if (this.state.selectedFile === null) {
      return false;
    }
    var myForm = document.getElementById("myForm");
    const data = new FormData(myForm);
    //data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    axios
      .post("/sendEmail", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <form id="myForm" name="myForm">
          <div>
            <label htmlFor="fname">Enter first name:</label>
            <input type="text" id="fname" name="fname" />
          </div>
          <div>
            <label htmlFor="lname">Enter last name:</label>
            <input type="text" id="lname" name="lname" />
          </div>
          <div>
            <label htmlFor="lname">What be Describes you:</label>
            <div>
              <label htmlFor="lname">Engineer</label>
              <input
                type="radio"
                id="Engineer"
                name="worked"
                value="Engineer"
              />
            </div>
            <div>
              <label htmlFor="lname">Contractor</label>
              <input
                type="radio"
                id="Contractor"
                name="worked"
                value="Contractor"
              />
            </div>
            <div>
              <label htmlFor="lname">Building/Owner</label>
              <input
                type="radio"
                id="Building/Owner"
                name="worked"
                value="Building/Owner"
              />
            </div>
            <div>
              <label htmlFor="lname">Developer</label>
              <input
                type="radio"
                id="Developer"
                name="worked"
                value="Developer"
              />
            </div>
          </div>
          <div>
            <label htmlFor="fileId">Upload file:</label>
            <input
              type="file"
              name="file"
              id="fileId"
              onChange={this.handleselectedFile}
            />
          </div>
          <button onClick={this.handleUpload}>Upload</button>
          <button onClick={this.ResetState}>Reset State</button>
        </form>
      </div>
    );
  }
}

export default App;
