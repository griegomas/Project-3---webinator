import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Webinars: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/Webinar')
      .then(res => {
        this.setState({ Webinars: res.data });
        console.log(this.state.Webinars);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Available Webinars &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary btn-dark" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Webinars.map(Webinars =>
                  <tr>
                    <td><a target="_blank" href={Webinars.url}>Registration link</a></td>
                    <td>{Webinars.subject}</td>
                    <td>{Webinars.description}</td>
                    <td>{Webinars.starttime}</td>
                    <td>{Webinars.endtime}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
