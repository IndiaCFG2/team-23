import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import TeacherDashboard from "./user/TeacherDashboard";
import AddContents from "./teacher/AddContent";
import AddTeacher from "./admin/AddTeacher";
import AddStudent from "./admin/AddStudent";
import TeacherRoute from "./auth/TeacherRoute";
import ATRoute from "./auth/ATRoute";

import AddAssessment from "./teacher/AddAssessment";
import AddClass from "./teacher/AddClass";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/teacher" exact component={AddTeacher} />
        <ATRoute path="/create/student" exact component={AddStudent} />
        <TeacherRoute path="/create/content" exact component={AddContents} />
        <TeacherRoute
          path="/create/assessment"
          exact
          component={AddAssessment}
        />
        <TeacherRoute
          path="/teacher/dashboard"
          exact
          component={TeacherDashboard}
        />
        <TeacherRoute path="/create/class" exact component={AddClass} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/teacher" exact component={AddTeacher} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
