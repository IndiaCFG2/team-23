import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createTeacher } from "./apiAdmin";
import { getSchools ,getUsers,getSubjects} from "../core/apiCore";
const AddTeacher = () => {
    const [values, setValues] = useState({
       
        users: [],
        user_one: '',
        subjects:[],
        subject:"",
        schools:[],
        school:"",
        loading: false,
        error: '',
        createdTeacher: '',
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
        subjects,
        subject,
        schools,
        school,
        loading,
        error,
        createdTeacher,
        redirectToProfile,
    } = values;

    // load  and set form data
    const init = () => {

        getUsers(token).then(usersResponse => {
            // console.log( 'getUsers Response', values);
            if (usersResponse.error) {
                setValues({ ...values, error: usersResponse.error });
            } else {

                getSchools(token).then(schoolsResponse => {
                    if (schoolsResponse.error) {
                        setValues({ ...values, error: schoolsResponse.error });
                    } else{
                        getSubjects(token).then(subjectsResponse => {
                            // console.log( 'getSubjects Response', values)
                            if (subjectsResponse.error) {
                                setValues({ ...values, error: subjectsResponse.error });
                            } else {
                                setValues({
                                    ...values,
                                    subjects: subjectsResponse.data,
                                    users: usersResponse.data,
                                    schools: schoolsResponse.data
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

        // getSchools(token).then(response => {
        //     console.log( 'getSchools Response', values);
        //     if (response.error) {
        //         setValues({ ...values, error: response.error });
        //     } else {
        //         setValues({
        //             ...values,
        //             schools: response.data,
        //         });
        //     }
        // });
        // getSubjects(token).then(response => {
        //     console.log( 'getSubjects Response', values)
        //     if (response.error) {
        //         setValues({ ...values, error: response.error });
        //     } else {
        //         setValues({
        //             ...values,
        //             subjects: response.data,
        //         });
        //     }
        // });

    };

    useEffect(() => {
        init();
        // getUsers(token).then(response => {
        //     console.log( 'getUsers Response', values);
        //     if (response.error) {
        //         setValues({ ...values, error: response.error });
        //     } else {
        //         console.log(response);
        //         setValues({
        //             ...values,
        //             users: response.data
                    
        //         });
        //     }
        // });
    }, []);

    // useEffect(() => {
    //     getSchools(token).then(response => {
    //         console.log( 'getSchools Response', values);
    //         if (response.error) {
    //             setValues({ ...values, error: response.error });
    //         } else {
    //             setValues({
    //                 ...values,
    //                 schools: response.data,
    //             });
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     // init();
    //     getSubjects(token).then(response => {
    //         console.log( 'getSubjects Response', values)
    //         if (response.error) {
    //             setValues({ ...values, error: response.error });
    //         } else {
    //             setValues({
    //                 ...values,
    //                 subjects: response.data,
    //             });
    //         }
    //     });
    // }, []);

    const handleChange = name => event => {
        const value =  event.target.value;
        formData[name] = value; 
        // setValues({ ...values, formData:value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        formData.role = 1;
        createTeacher( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    user_one: '',
                    school: '',
                    subject: '',
                    loading: false,
                    createdTeacher: "Teacher is created"
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


            
            

            <button className="btn btn-outline-primary">Create Teacher</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdTeacher ? '' : 'none' }}>
            <h2>{`${createdTeacher}`} !</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new teacher" description={`G'day ${user.first_name}, ready to add a new teacher?`}>
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

export default AddTeacher;
