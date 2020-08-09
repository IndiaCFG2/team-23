import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getContents } from './apiCore';
var teacher_id
const TeacherHome = () => {
    const [assessments, setAssessment] = useState([]);
    const [contents, setContents] = useState([]);
    const [error, setError] = useState(false);
    const {accessToken:token, user} = isAuthenticated()

    const loadAssessments= () => {
        getAssessments(token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAssessment(data.data);
            }
        });
    };
    const loadContents= () => {
        getContents(token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setContents(data.data);
            }
        });
    };
    
    useEffect(() => {
        loadAssessments();
        loadContents();
    }, []);

    return (
        <Layout
            title="Lend a hand foundation initiative"
            description="Lend a hand foundation initiative"
            className="container-fluid">
            <h2 className="mb-4">Assessments</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Contents</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default TeacherHome;
