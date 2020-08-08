import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getSchools ,getUsers,getSubjects, getGrades} from "../core/apiCore";
import {getTeacherByUserID ,createClass} from "./apiTeacher"
const AddClass = () => {
   
    const [values, setValues] = useState({
        name:"",
        subjects:[],
        subject:"",
        grades:[],
        grade:"",
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
        name,
        subjects,
        subject,
        grades,
        grade,
        loading,
        error,
        createdClass,
        redirectToProfile,
    } = values;

    // load  and set form data
    const init = () => {
                
        

                getSubjects(token).then(subjectsResponse => {
                    if (subjectsResponse.error) {
                        setValues({ ...values, error: subjectsResponse.error });
                    } else{
                        getGrades(token).then(gradesResponse => {
                            // console.log( 'getSubjects Response', values)
                            if (gradesResponse.error) {
                                setValues({ ...values, error: gradesResponse.error });
                            } else {
                                setValues({
                                    ...values,
                                    subjects: subjectsResponse.data,
                                    gradesResponse: gradesResponse.data
                                    
                                });
                            }
                        });
                    }
                })
                // console.log(response);
                // setValues({
                //     ...values,
                //     users: response.data
                    
                // });
        

       

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
        formData["teacher_id"]= teacher_id;
        createClass( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name:"",
                    school: '',
                    grade: '',
                    loading: false,
                    createdClass: "Class is created"
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"> Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Select Grade</label>
                <select onChange={handleChange('grade_id')} className="form-control">
                    <option>Please select</option>
                    {grades &&
                        grades.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.first_name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Select Subject</label>
                <select onChange={handleChange('subject_id')} className="form-control">
                    <option>Please select</option>
                    {subjects &&
                        subjects.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
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
        <div className="alert alert-info" style={{ display: createdClass ? '' : 'none' }}>
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
        <Layout title="Add a new class" description={`G'day ${user.first_name}, ready to add a new class?`}>
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

export default AddClass;
