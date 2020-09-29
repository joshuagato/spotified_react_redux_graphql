import React, { Component } from 'react';
import './Experiment.scss';

// import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class Experiment extends Component {

  state = {
    students: []
  }

  toggleHandler = () => {
    // const el = findDOMNode(this.refs.toggle);
    const el = this.refs.toggle;
    // $('.tog-box').slideToggle();
    $(el).slideToggle();
  }

  addStudent = () => {
    const newStudent = {
      name: 'Sampson Amoateng',
      course: 'Physical Education'
    }
    axios.post('http://localhost:8000/api/students', newStudent).then(response => {
      console.log(response);
      console.log(response.data.message);
    }).catch(error => {
      console.log(error);;
    });
  }

  loginHandler = () => {
    const loginDetails = {
      username: 'joshuagato37@gmail.com',
      password: 'hams4444'
    }

    axios.post('http://localhost:8000/api/login', loginDetails).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  registerHandler = () => {
    const regDetails = {
      username: 'joshuagato37@gmail.com',
      password: 'hams4444'
    }

    axios.post('http://localhost:8000/api/register', regDetails)
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  componentDidMount() {
    // console.log(findDOMNode(this.refs.toggle));
    // console.log(this.refs.toggle);

    axios.get('http://localhost:8000/api/students/2').then(response => {
      const students = response.data;
      this.setState({ students });
    });
  }

  componentDidUpdate() {
    console.log(this.state.students);
    
    const students = [...this.state.students];
    students.map(student => {
      console.log(student.name);

      return student;
    });
  }

  render() {
    return (
      <div className="experiments">
        <h1 className="exp-heading">Experiments</h1>

        <button onClick={this.toggleHandler} className="tog-button">Toggle</button>
        <button onClick={this.addStudent} className="tog-button">Add Student</button>
        <button onClick={this.loginHandler} className="tog-button">Login</button>
        <button onClick={this.registerHandler} className="tog-button">Register</button>

        <div className="tog-box" ref="toggle">
          x
        </div>
      </div>
    );
  }
}

export default Experiment;
