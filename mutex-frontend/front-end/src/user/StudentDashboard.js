import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

import { getSubjectsPeriods, getPeriod } from "../core/apiCore";

const StudentDashboard = () => {
  const {
    user: { _id, email, role, first_name, last_name, phonenumber },
  } = isAuthenticated();

  //all periods 
  const periods = getSubjectsPeriods();
  const class_ids = periods.data.filter(item => item.user_id == _id);
  const periods_of_student;
  
  class_ids.forEach(element => {
    const p =  getPeriod(element);
    periods_of_student.push(p);
    console.log(p);
  });


  const studentPeriods = () => {
    return (
      <div className="card">
        <h4 className="card-header">Student Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            {periods_of_student.map(period => (
                <p className="">
                    {period}
                </p>
            ))}
          </li>
        </ul>
      </div>
    );
  };

  const studentAssessments = () => {
    return (
      <div className="card">
        <h4 className="card-header">Student Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            {periods_of_student.map(period => (
                <p className="">
                    {period}
                </p>
            ))}
          </li>
        </ul>
      </div>
    );
  };

  const studentInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Student Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{first_name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 0 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${first_name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{studentPeriods()}</div>
        <div className="col-9">{studentInfo()}</div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;