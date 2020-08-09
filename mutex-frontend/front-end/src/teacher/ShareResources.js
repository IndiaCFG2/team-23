import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { API } from "../config";
import { Link } from 'react-router-dom';
import { getSchools ,getUsers,getSubjects, getGrades} from "../core/apiCore";
import {getTeacherByUserID ,createClass} from "./apiTeacher"
var formData ={}

const ShareResources = () => {
   
    const [values, setValues] = useState({
        message:"",
        channel:"",
        number:"",
        loading: false,
        error: '',
        sentMessage: '',
        redirectToProfile: false,
    });
    const {accessToken:token, user} = isAuthenticated()
    console.log('user._id)',user._id)
    const {_id:teacher_id} = getTeacherByUserID(token, user._id);
    // const { user } = user_data.user
    // const{token} = user_data.accessToken
    // console.log(token, user)
    const {
        message,
        channel,
        number,
        loading,
        error,
        sentMessage,
        redirectToProfile,
    } = values;

    // load  and set form data
    const init = () => {

    };

    useEffect(() => {
        init();
        
    }, []);

    

    const handleChange = name => event => {
        const value =  event.target.value;
        formData[name] = value; 
        setValues({ ...values, formData:value ,[name]: event.target.value});
    };

    const clickSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        console.log(formData)
        const resp = await fetch(`${API}/send-notifications`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(formData),
          })
        const jsonResponse = await resp.json(); 
        console.log(jsonResponse)
            // .then((response) => {
            //   return response.json();
            // })
            // .catch((err) => {
            //   console.log(err);
            // });
        // createClass( token, formData).then(data => {
        //     if (data.error) {
        //         setValues({ ...values, error: data.error });
        //     } else {
        //         setValues({
        //             ...values,
        //             name:"",
        //             school: '',
        //             grade: '',
        //             loading: false,
        //             createdClass: "Class is created"
        //         });
        //     }
        // });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            

            <div className="form-group">
                <label className="text-muted">Select Channel</label>
                <select onChange={handleChange('channel')} className="form-control">
                    <option>Please select</option>
                            <option key={1} value="whatsapp">
                                Whatsapp
                            </option>
                            <option key={2} value="sms">
                                SMS
                            </option>
                        
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted"> Phone Number</label>
                <input onChange={handleChange('number')} type="text" className="form-control" value={number} />
            </div>
            <div className="form-group">
                <label className="text-muted"> Message</label>
                <input onChange={handleChange('message')} type="text" className="form-control" value={message} />
            </div>
            


            
            

            <button className="btn btn-outline-primary">Send Message</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: sentMessage ? '' : 'none' }}>
            <h2>createdClass !</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Share Resource" description={`G'day ${user.first_name}, ready to share resource?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default ShareResources;
