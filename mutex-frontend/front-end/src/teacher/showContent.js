import ReactTable from 'react-table-6'
import { API } from "../config";
import React, { useState, useEffect } from 'react';

// import React, { Component } from 'react';  
import 'react-table-6/react-table.css'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getTeacherByUserID ,createAssessment} from "./apiTeacher"
var teacher_id;
var token ;

const ShowContents = () => {
    const [data, setdata] = useState([]);
    const {accessToken:token, user} = isAuthenticated()
    // const init = () => {
        
       
    // setdata(resp)  ;
    
     const columns = [{  
       Header: 'Topic',  
       accessor: 'topic'  
       },
       {  
          Header: 'Resource URL',  
          accessor: 'resource_url'  
        },
        {  
        Header: 'Class',  
        accessor: 'period_id.name'  
        }]  
    const fetchAssignments =  () => {
    // console.log(18)
    getTeacherByUserID(token, user._id).then(async response => {
    console.log(19)

        teacher_id = response.data[0]._id;
        console.log(teacher_id)
        const resp = await fetch(`${API}/content?teacher_id=${teacher_id}&$populate=period_id`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${token}`
                        
                }
            })
            const jsonResponse = await resp.json()
            let data = jsonResponse.data;
            // const arrayProcessed = await Promise.all(data.map(async value => {
            //     const response = await fetch(`${API}/student-assessment?assessment_id=${value._id}`, {
            //             method: "GET",
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json',
            //                 Authorization: `${token}`         
            //                 }
            //             })
            //         const jsonResponses = await response.json()
            //         console.log(jsonResponses,'asas')
            //         const { total } = jsonResponses
            //         value.submissions = total
            //         return value
            //     })) 
            
            // "5f2f380549e51f7232dca36c"
            console.log(data)
            // return data
            setdata(data)
                // return jsonResponse;
                    // .then(response => {
                    //     const resp = response.json();
                    //     // const data = resp.data.filter((value) => {
                    //     //     return value.teacher_id === teacher_id
                    //     // })
                    //     // resp.data = data
                    //     return resp;
        
                    // })
                    // .catch(err => console.log(err));
    })
        
    }
    useEffect(() => {
        fetchAssignments()
    }, []);
    // const resp = fetchAssignments()
    // console.log('data', resp)
    return (  
        <Layout
        title="Contents"
        description={`G'day , ready ?`}>
        
            <div>  
                <ReactTable  
                    data={data}  
                    columns={columns}  
                    defaultPageSize = {2}  
                    pageSizeOptions = {[2,4, 6]}  
                />  
            </div>   
            </Layout>     
      )  ;
};

export default ShowContents;
