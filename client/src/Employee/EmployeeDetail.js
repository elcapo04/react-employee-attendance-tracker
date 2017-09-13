import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { PacmanLoader } from 'react-spinners';
import DatePicker from './../common/DatePicker';
import Button from './../common/Button';
import TextBox from './../common/TextBox';

import './index.css';

class EmployeeDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.match.params._id,
      name: "",
      department: "",
      origin: "",
      attendances: {},
      last30Days: {},
      last365Days: {},
      loading: true,
      joinDate: moment(new Date()).format("YYYY-MM-DD"),
      today: moment(new Date()).format("YYYY-MM-DD")
    };
  }

  componentWillMount(){
    axios.get("/api/employee/detail/"+this.state._id)
    .then(
      (res) => {    
        var newState = {
          name: res.data.employee.name,
          department: res.data.employee.department,
          origin: res.data.employee.origin,
          joinDate: res.data.employee.joinDate,
          attendances: res.data.employee.attendances,
          last30Days: res.data.last30Days,
          last365Days: res.data.last365Days,
          loading: false,
        }
        this.setState( newState );
      }, 
      (err) => {
        alert('An error occured! Try refreshing the page.', err);
      }
    );
  }

  renderForm(){
    var legends = {
      "Present": <div padding="2" className="legends-inline bg-success">present</div>,         
      "Sick": <div padding="2" className="legends-inline bg-warning">sick</div>,
      "Vacation": <div padding="2" className="legends-inline bg-info">vacation</div>,
      "Absent": <div padding="2" className="legends-inline bg-danger">absent</div>
    };
    var { name, department, origin, joinDate, attendances, today } = this.state;
    if(!this.state.loading){
      return (
        <div className="Detail-container">
          <div className="Detail-card-row">
            <div className="heading">
              {name}
            </div>
          </div>
          <div className="Detail-card">
            <div className="Detail-card-row">
              {department} department
            </div>
            <div className="Detail-card-row">
              Joined on {moment(joinDate).format("Do MMMM YYYY")}
            </div>
            <div className="Detail-card-row">
              From {origin}
            </div>
          </div>

          <div className="Detail-card">
            <div className="Detail-card-row justify-center">
              Today status: { !!attendances ? legends[attendances[today]] : legends["Absent"] } 
            </div>

            <div className="Detail-card-separator"/>

            <div className="Detail-card-row">
              Last 30 days
            </div>
            <div className="Detail-card-row">
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-success">{this.state.last30Days.Present}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-warning">{this.state.last30Days.Sick}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-info">{this.state.last30Days.Vacation}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-danger">{this.state.last30Days.Absent}</div>
              </div>
            </div>
            
            <div className="Detail-card-separator"/>

            <div className="Detail-card-row">
              Last 365 days
            </div>
            <div className="Detail-card-row">
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-success">{this.state.last365Days.Present}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-warning">{this.state.last365Days.Sick}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-info">{this.state.last365Days.Vacation}</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-danger">{this.state.last365Days.Absent}</div>
              </div>
            </div>
            
            <div className="Detail-card-separator"/>

            <div className="Detail-card-row font-small">
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-success">Present</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-warning">Sick</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-info">Vacation</div>
              </div>
              <div className="Detail-card-col align-center">
                <div className="legends fill-width bg-danger">Absent</div>
              </div>
            </div>
            
          </div>

        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="heading">
          {/* Employee's detail */}
        </div>
        <div className="loader-container">
          <PacmanLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export default EmployeeDetail;