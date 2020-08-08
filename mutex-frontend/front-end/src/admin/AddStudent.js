import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createdStudent, createStudent } from "./apiAdmin";
import { getSchools ,getUsersStrict, getGrades} from "../core/apiCore";
const AddStudent = () => {
    const [values, setValues] = useState({
       
        users: [],
        user_one: '',
        grades:[],
        grade:"",
        schools:[],
        school:"",
        loading: false,
        error: '',
        createdStudent: '',
        redirectToProfile: false,
    });
    var formData ={}
    const {accessToken:token, user} = isAuthenticated()
    // const { user } = user_data.user
    // const{token} = user_data.accessToken
    // console.log(token, user)
    const {
        users,
        user_one,
        grades,
        grade,
        schools,
        school,
        loading,
        error,
        createdStudent,
        redirectToProfile,
    } = values;

    // load  and set form data
    const init = () => {

        getUsersStrict(token).then(usersResponse => {
            // console.log( 'getUsers Response', values);
            if (usersResponse.error) {
                setValues({ ...values, error: usersResponse.error });
            } else {

                getSchools(token).then(schoolsResponse => {
                    if (schoolsResponse.error) {
                        setValues({ ...values, error: schoolsResponse.error });
                    } else{
                        getGrades(token).then(gradesResponse => {
                            // console.log( 'getSubjects Response', values)
                            if (gradesResponse.error) {
                                setValues({ ...values, error: gradesResponse.error });
                            } else {
                                setValues({
                                    ...values,
                                    schools: schoolsResponse.data,
                                    users: usersResponse.data,
                                    grades: gradesResponse.data
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
            }
        });

       

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
        formData.role = 2;
        createStudent( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    user_one: '',
                    school: '',
                    subject: '',
                    loading: false,
                    createdStudent: "Student is created"
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Select User</label>
                <select onChange={handleChange('user_id')} className="form-control">
                    <option>Please select</option>
                    {users &&
                        users.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.first_name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Select School</label>
                <select onChange={handleChange('school_id')} className="form-control">
                    <option>Please select</option>
                    {schools &&
                        schools.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Select Grade</label>
                <select onChange={handleChange('grade_id')} className="form-control">
                    <option>Please select</option>
                    {grades &&
                        grades.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>


            
            

            <button className="btn btn-outline-primary">Create Student</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdStudent ? '' : 'none' }}>
            <h2>{`Student Created`} !</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new Student" description={`G'day ${user.first_name}, ready to add a new Student?`}>
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

export default AddStudent;
