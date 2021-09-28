import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {Modal,Button} from "react-bootstrap"
import {userSkills,addASkill} from "../actions/user_action"

const Skillscompoent = ({match}) => {
    const [showEditForm, setShowEditForm] = useState(false); 
    const[skill_name,setSkillName] = useState("")

    const dispatch = useDispatch();
    const {skills} = useSelector(state => state.userSkillReducer)
   
     useEffect(()=>{
        dispatch(userSkills(match.params.id))
     },[])

    
     const handleEditForm = ()=> setShowEditForm(false);

     const onSubmit = (e)=> {
        e.preventDefault()
        let data = {
            skill_name ,userId:match.params.id
        }
         dispatch(addASkill(data))
         setShowEditForm(false)
    }
    return (
        <div>

<div>
            <Modal show={showEditForm} onHide={handleEditForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onSubmit}>
                        <div>
                         <input required type="text" placeholder="Ex. javascript" className="form-control" 
                        value={skill_name} onChange={(e)=> setSkillName(e.target.value)}  />
                         </div>
                      
                        <div className="form-group mt-2">
                             <button className="btn btn-primary" type="submit">Save</button>
                         </div>
             </form> 
             </Modal.Body>
             <br />
             <br />
             </Modal>
            </div>
              <div  style={{display:"flex",justifyContent:"space-between"}}>
                    <h3 style={{display:"flex",marginLeft:"20px"}}>Skills and endorsements</h3>
                    <button type="button" class="btn btn-light" style={{marginRight:"100px",fontWeight:"500"}} 
                     onClick={() => setShowEditForm(true)}>Add a new skill</button>
              </div>
              
             {skills && skills.map((item,index) => {
                return (
                    <div key={item._id} className="row" style={{display:"flex"}}>
                       
                         {index % 2 > 0 ? (
                             
                             <div className="col-md-6" style={{marginTop:"-48px"}}>
                                  <p style={{textAlign:"start",marginLeft:"40px",fontSize:"20px",fontWeight:"500"}}>{item.skill_name}</p>
                             </div>
                         ):    <div className="col-md-6" style={{marginLeft:"400px",marginTop:"20px"}}>
                         <p style={{textAlign:"start",marginLeft:"40px",fontSize:"20px",fontWeight:"500"}}>{item.skill_name}</p>
                    </div> }
                        
                    </div>    
                )
            })}
        </div>
    );
};

export default Skillscompoent;