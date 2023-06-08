// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import CrudProvider from "../../provider/CrudProvider";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import CustomSelect from "../custom/CustomSelect";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// export default function EditInstitution() {
//   const { id } = useParams();
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [load, setLoad] = useState(false);
//   const [level, setLevel] = useState({});

//   useEffect(() => {
//     setLoad(true);
//     Promise.all([
//       CrudProvider.getItemById("LevelAPI/GetLevelById", id).then(
//         (res) => {
//           if (res) {
//             if (res.statusCode === 200) {
//               setLevel(res.result);
//             } else {
//               toast.error(res.errorMessages[0]);
//               navigate("/level");
//             }
//           }
//         }
//       ),
//     ]).then((res) => {
//       setLoad(false);
//     });
//   }, [id]);
  
//   async function handleSubmit() {
//     await CrudProvider.updateItem(
//       "LevelAPI/UpdateLeveli",
//       level
//     ).then((res) => {
//       if (res) {
//         if (res.statusCode === 200) {
//           toast.success(t("DataUpdatedSuccessfully"));
//           navigate("/institutions");
//         } else {
//           toast.error(res.errorMessages[0]);
//         }
//       }
//     });
//   }

//   const formik = useFormik({
//     initialValues: {},
//     validateOnBlur: false,
//     validateOnMount: false,
//     onSubmit: () => handleSubmit(),
//   });

  
//   return (
//     <div className='col-xl-12'>
//       <div className='card'>
//         <div className='card-body'>
//           <h3 className='mb-3'>Edit Level</h3>
//           <form onSubmit={formik.handleSubmit}>
//             <div id='progressbarwizard'>
//               <div className='progress mb-3' style={{ height: 7 }}>
//                 <div
//                   className='progress-bar progress-bar-striped progress-bar-animated bg-success'
//                   style={{ width: progessBarWidth }}
//                 />
//               </div>
//               <div className='tab-pane active' id='account-2'>
//                 <div className='row mb-3'>
//                   <label className='col-md-3 col-form-label' htmlFor='type'>
//                     Type
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='type'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           Type: e.target.value,
//                         });
//                         formik.setFieldValue("Type", e.target.value);
//                       }}
//                       value={formik.values.Type}
//                     />
//                     {formik.errors.Type && (
//                       <span className='text-danger'> {formik.errors.Type}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='reference'
//                   >
//                     Level Reference KEK
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='reference'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           LevelReferenceKEK: e.target.value,
//                         });
//                         formik.setFieldValue(
//                           "LevelReferenceKEK",
//                           e.target.value
//                         );
//                       }}
//                       value={formik.values.LevelReferenceKEK}
//                     />
//                     {formik.errors.LevelReferenceKEK && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.LevelReferenceKEK}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='description'
//                   >
//                     Detailed Description
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='description'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           DetailedDescription: e.target.value,
//                         });
//                         formik.setFieldValue(
//                           "DetailedDescription",
//                           e.target.value
//                         );
//                       }}
//                       value={formik.values.DetailedDescription}
//                     />
//                     {formik.errors.DetailedDescription && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.DetailedDescription}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='descriptor'
//                   >
//                     The Descriptor
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='email'
//                       id='descriptor'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           TheDescriptor: e.target.value,
//                         });
//                         formik.setFieldValue("TheDescriptor", e.target.value);
//                       }}
//                       value={formik.values.TheDescriptor}
//                     />
//                     {formik.errors.TheDescriptor && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.TheDescriptor}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='knowledge'
//                   >
//                     Knowledge
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='knowledge'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           Knowledge: e.target.value,
//                         });
//                         formik.setFieldValue("Knowledge", e.target.value);
//                       }}
//                       value={formik.values.Knowledge}
//                     />
//                     {formik.errors.Knowledge && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.Knowledge}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label className='col-md-3 col-form-label' htmlFor='skills'>
//                     Skills
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='skills'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           Skills: e.target.value,
//                         });
//                         formik.setFieldValue("Skills", e.target.value);
//                       }}
//                       value={formik.values.Skills}
//                     />
//                     {formik.errors.Skills && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.Skills}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='competencies'
//                   >
//                     Competencies
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='competencies'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           Competencies: e.target.value,
//                         });
//                         formik.setFieldValue("Competencies", e.target.value);
//                       }}
//                       value={formik.values.Competencies}
//                     />
//                     {formik.errors.Competencies && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.Competencies}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className='row mb-3'>
//                   <label
//                     className='col-md-3 col-form-label'
//                     htmlFor='indicators'
//                   >
//                     Level Indicators
//                   </label>
//                   <div className='col-md-9'>
//                     <input
//                       type='text'
//                       id='indicators'
//                       className='form-control'
//                       onChange={(e) => {
//                         setModel({
//                           ...model,
//                           LevelIndicators: e.target.value,
//                         });
//                         formik.setFieldValue("LevelIndicators", e.target.value);
//                       }}
//                       value={formik.values.LevelIndicators}
//                     />
//                     {formik.errors.LevelIndicators && (
//                       <span className='text-danger'>
//                         {" "}
//                         {formik.errors.LevelIndicators}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='mt-4'>
//               <Link to='/agencies' className='btn btn-danger float-start'>
//                 <i className='fe-arrow-left me-2'></i>
//                 Cancel
//               </Link>
//               <button type='submit' className='btn btn-success float-end'>
//                 <i className='fe-check me-2'></i>
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

