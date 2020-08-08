import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getSchools ,getUsers,getSubjects, getGrades,getPeriods} from "../core/apiCore";
import {getTeacherByUserID ,createAssessment} from "./apiTeacher"
const AddAssessment = () => {
   
    const [values, setValues] = useState({
        name:"",
        periods:[],
        period:"",
        resource_url:"",
        assessment_name:"",
        loading: false,
        error: '',
        createdClass: '',
        redirectToProfile: false,
    });
    var formData ={}
    const {accessToken:token, user} = isAuthenticated()
    console.log('user._id)',user._id)
    const {_id:teacher_id} = getTeacherByUserID(token, user._id);
    // const { user } = user_data.user
    // const{token} = user_data.accessToken
    // console.log(token, user)
    const {
        resource_url,
        assessment_name,
        topic,
        periods,
        period,
        loading,
        error,
        createdAssessment,
        redirectToProfile,
    } = values;

    // load  and set form data
                
        

        const init = () => {
            getPeriods(token).then(periodsResponse => {
                if (periodsResponse.error) {
                    setValues({ ...values, error: periodsResponse.error });
                } else {
                    setValues({
                        ...values,
                        periods: periodsResponse.data
                        
                    });
                }
            });
        };
                // console.log(response);
                // setValues({
                //     ...values,
                //     users: response.data
                    
                // });
        

       

    

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
        formData["teacher_id"]= teacher_id;
        createAssessment( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    topic:"",
                    period: '',
                    loading: false,
                    createdAssessment: "Assessment is created"
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"> Name</label>
                <input onChange={handleChange('assessment_name')} type="text" className="form-control" value={assessment_name} />
            </div>
            <div className="form-group">
                <label className="text-muted"> Resource Url</label>
                <input onChange={handleChange('resource_url')} type="text" className="form-control" value={resource_url} />
            </div>

            <div className="form-group">
                <label className="text-muted">Select Class</label>
                <select onChange={handleChange('period_id')} className="form-control">
                    <option>Please select</option>
                    {periods &&
                        periods.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.first_name}
                            </option>
                        ))}
                </select>
            </div>
            
            


            
            

            <button className="btn btn-outline-primary">Create Class</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdAssessment ? '' : 'none' }}>
            <h2>createAssessment !</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new class" description={`G'day ${user.first_name}, ready to add a new assessment?`}>
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

export default AddAssessment;
