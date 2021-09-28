import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {Modal,Button} from "react-bootstrap"
import {userEducations,addEducation} from "../actions/user_action"

const Education = ({match}) => {

    const [cour_name, setCourName] = useState("");
    const [inst_name, setInstName] = useState("");
    const [cour_type, setCourType] = useState("");
    const [study_from, setStudyFom] = useState("");
    const [study_to, setStudyTo] = useState("");

    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false);
     useEffect(()=>{
        dispatch(userEducations(match.params.id))
     },[])
     
     const {userEdus} = useSelector(state => state.userEduReducer)
     const handleEditForm = ()=> setShowEditForm(false);

     const onSubmit = (e)=> {
        e.preventDefault()
        let data = {
            cour_name,inst_name,cour_type,study_from,study_to,userId:match.params.id
        }
        dispatch(addEducation(data))
    }
    
    return (
        <div>

          <div>
            <Modal show={showEditForm} onHide={handleEditForm} animation={false}       size="lg" centered dialogClassName="modalclass"
        aria-labelledby="example-custom-modal-styling-title" >
                    <Modal.Header closeButton>
                    <Modal.Title>Add Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onSubmit}>
                         
                         <div className="edu_form">
                             <label htmlFor="">School* </label>
                            <input required type="text" placeholder="Ex. Delhi university" className="form-control edr_class" 
                            value={inst_name} onChange={(e)=> setInstName(e.target.value)}  />
                         </div>

                        <div className="edu_form">
                          <label htmlFor="">Degree </label>
                         <input required type="text" placeholder="Ex. bachelor" className="form-control edr_class" 
                          value={cour_name} onChange={(e)=> setCourName(e.target.value)}  />
                        </div>
                        
                        
                         <div className="edu_form">
                         <label htmlFor="">Field of study </label>
                         <input required type="text" placeholder="Ex. CSE" className="form-control edr_class" 
                        value={cour_type} onChange={(e)=> setCourType(e.target.value)}  />
                         </div>
                         <div className="edu_form">
                         <label htmlFor="">Start Date</label>
                            <input required type="text" placeholder="Start Date" className="form-control edr_class" 
                            value={study_from} onChange={(e)=> setStudyFom(e.target.value)}  />
                         </div>
                         <div className="edu_form">
                         <label htmlFor="">End Date </label>
                         <input required type="text" placeholder="End Date" className="form-control edr_class" 
                        value={study_to} onChange={(e)=> setStudyTo(e.target.value)}  />
                         </div>

                         
                      
                        <div className="form-group mt-2">
                             <button className="btn btn-primary" type="submit" 
                             style={{borderRadius:"25px",height:"50px",width:"90px"}}>Save</button>
                         </div>
             </form> 
             </Modal.Body>
             <br />
             <br />
             </Modal>
            </div>

            <div style={{marginTop:"-35px",float:"right",marginRight:"80px"}}>
               <i className="fal fa-plus fa-2x" onClick={() => setShowEditForm(true)}></i>
            </div>

            {userEdus && userEdus.map(item => {
                return (
                    <div key={item._id} style={{display:"flex",flexDirection:"column"}}>
                        <h4 style={{alignSelf:"flex-start",marginLeft:"170px"}}>{item.inst_name}</h4>
                        <p style={{alignSelf:"flex-start",marginLeft:"170px",fontSize:"20px"}}>{item.cour_type && item.cour_type }-{item.cour_name}</p>
                        
                    </div>    
                )
            })}
        </div>
    );
};

export default Education;