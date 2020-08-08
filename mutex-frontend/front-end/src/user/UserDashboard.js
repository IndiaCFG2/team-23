import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, first_name,last_name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/contents">
                            my contents
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
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
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
