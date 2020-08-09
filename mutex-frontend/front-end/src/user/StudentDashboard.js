// import React from "react";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";

// const TeacherDashboard = () => {
//     const {
//         user: { _id,email,role,first_name,last_name,phonenumber}
//     } = isAuthenticated();

//     const TeacherLinks = () => {
//         return (
//             <div>
            
//             <div className="card">
//             <h4 className="card-header">Teacher Links</h4>

//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/create/student">
//                         Add Student
//                     </Link>
//                 </li>
                
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/create/content">
//                         Add Content
//                     </Link>
//                 </li>
                
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/create/assessment">
//                         Add Assessment
//                     </Link>
//                 </li>
                
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/create/class">
//                         Add Class
//                     </Link>
//                 </li>
                
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/assessments">
//                         Assignments
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/contents">
//                         My Content
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//         <div className="card">
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <Link className="nav-link" to="/share">
//                     share resources
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//         </div>
//         );
//     };

//     const TeacherInfo = () => {
//         return (
//             <div className="card mb-5">
//                 <h3 className="card-header">User Information</h3>
//                 <ul className="list-group">
//                     <li className="list-group-item">{first_name}</li>
//                     <li className="list-group-item">{email}</li>
//                     <li className="list-group-item">
//                         {role === 0 ? "Admin" : "Teacher"}
//                     </li>
//                 </ul>
//             </div>
//         );
//     };

//     return (
//         <Layout
//             title="Dashboard"
//             description={`G'day ${first_name}!`}
//             className="container-fluid"
//         >
//             <div className="row">
//                 <div className="col-3">{TeacherLinks()}</div>
//                 <div className="col-9">{TeacherInfo()}</div>
//             </div>
//         </Layout>
//     );
// };

// export default TeacherDashboard;
