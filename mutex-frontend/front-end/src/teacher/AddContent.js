import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {  getPeriods, getPeriodsByTeacher } from "../core/apiCore";
import {createContent,getTeacherByUserID} from "./apiTeacher";
var teacher_id
const AddContent = () => {
    const [values, setValues] = useState({
       
        periods: [],
        period: '',
        user_id:'',
        period_id: '',
        topic: '',
        resource_url: '',
        loading: false,
        error: '',
        createdContent: '',
        redirectToProfile: false,
    });
    var formData ={}
    const {accessToken:token, user} = isAuthenticated()
    // const { user } = user_data.user
    // const{token} = user_data.accessToken
    // console.log(token, user)
    const {
        periods,
        period,
        user_id,
        loading,
        period_id,
        topic,
        resource_url,
        error,
        createdContent,
        redirectToProfile,
    } = values;

    // load  and set form data
    const init = () => {
        getTeacherByUserID(token, user._id).then(response => {
            teacher_id = response.data[0]._id
            getPeriodsByTeacher(token, teacher_id).then(periodsResponse => {
                if (periodsResponse.error) {
                    setValues({ ...values, error: periodsResponse.error });
                } else {
                    setValues({
                        ...values,
                        periods: periodsResponse.data
                        
                    });
                }
            });
        })
       
    };

        

    useEffect(() => {
        init();
    }, []);

    

    const handleChange = name => event => {
        const value =  event.target.value;
        formData[name] = value; 
        // setValues({ ...values, formData:value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        formData['user_id'] = user._id;
        createContent( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    period_id: '',
                    topic: '',
                    resource_url: '',
                    loading: false,
                    createdContent: "Content is created"
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Select Class</label>
                <select onChange={handleChange('period_id')} className="form-control">
                    <option>Please select</option>
                    {periods &&
                        periods.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            
            <div className="form-group">
                <label className="text-muted">Topic</label>
                <input onChange={handleChange('topic')} type="text" className="form-control" value={topic} />
            </div>
            <div className="form-group">
                <label className="text-muted"> Resource URL</label>
                <input onChange={handleChange('resource_url')} type="text" className="form-control" value={resource_url} />
            </div>
            <button className="btn btn-outline-primary">Create Content</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdContent ? '' : 'none' }}>
            <h2>Content Created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new content" description={`G'day ${user.first_name}, ready to add a new Content?`}>
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

export default AddContent;
