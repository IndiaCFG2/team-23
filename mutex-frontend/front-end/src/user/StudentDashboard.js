import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getStudentsPeriods, getPeriod, getAssessments } from "../core/apiCore";

const StudentDashboard = () => {
  const {
    user: { _id, email, role, first_name, last_name, phonenumber },
  } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    periods: [],
    assessments: [],
    class_ids: [],
    periods_of_student: [],
    assessment_name: "",
    loading: false,
    error: "",
    createdClass: "",
    redirectToProfile: false,
  });
  var formData = {};
  const { accessToken: token, user } = isAuthenticated();
  console.log("user._id)", user._id);

  const {
    assessment_name,
    periods,
    loading,
    error,
    name,
    createdAssessment,
    redirectToProfile,
  } = values;

  // load  and set form data
  var hell = [];
  var assess = [];
  const init = () => {
    hell = getStudentsPeriods(token).then((response) => {
      var ids = [];
      var ps = [];
      console.log(response.data);
      console.log("hello");
      response.data.forEach((item) => {
        if (item.user_id == _id) {
          const p = getPeriod(item);
          ps.push(p);
        }
      });
      setValues({
        ...values,
        periods: response.data,
      });

      getAssessments(token).then((res) => {
        console.log(res);
        assess = res.data;
        console.log(res.data);
        console.log("top");
        if (res.error) {
          setValues({ ...values, error: res.error });
        } else {
          setValues({
            ...values,
            assessments: res.data,
          });
        }
      });
      return response.data;
    });
  };
  console.log("Hell", hell, values.periods, values.assessments);

  console.log("Assess", assess);

  useEffect(() => {
    init();
  }, []);

  //   all periods
  //   var class_ids = [];
  console.log(periods);

  //   var periods_of_student = [];

  //   hell.forEach((element) => {
  //     const p = getPeriod(element);
  //     // periods_of_student.push(p);
  //     console.log(p);
  //   });

  //   //all assessments
  var student_assessments = [];

  hell.forEach((element) => {
    const a = values.assessments.filter(
      (item) => item.class_id.indexOf(hell) > -1
    );
    if (a != null) {
      student_assessments.push(a);
    }
  });
  console.log("hell", hell);

  const studentPeriods = () => {
    return (
      <div className="card">
        <h4 className="card-header">Student Periods</h4>
        <ul className="list-group">
          {values.periods.map(
            (item, key) => (
              console.log(item.user_id),
              (
                <li className="list-group-item" key={item.user_id}>
                  {item.period_id}
                </li>
              )
            )
          )}
        </ul>
      </div>
    );
  };

  //   const studentAssessments = () => {
  //     return (
  //       <div className="card">
  //         <h4 className="card-header">Student Links</h4>
  //         <ul className="list-group">
  //           <li className="list-group-item">
  //             {student_assessments.map((assessment) => (
  //               <p className="">{assessment.name}</p>
  //             ))}
  //           </li>
  //         </ul>
  //       </div>
  //     );
  //   };

  const studentInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Student Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {first_name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">
            Role: {role === 0 ? "Admin" : "Registered User"}
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
      <div className="col-3">{studentInfo()}</div>
      <div className="col-3">{studentPeriods()}</div>
    </Layout>
  );
};

export default StudentDashboard;
