import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {Modal,Button,Dropdown} from "react-bootstrap"
import {userProjects,addProject,addSLanguage,userSLanguage} from "../actions/user_action"

const Project = ({match}) => {

    const [p_title, setP_Title] = useState("");
    const [p_desc,setP_Desc ] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [p_link, setPLink] = useState("");
    const [lan_type, setLanType] = useState("");
    const [item,setItem] = useState(" ")

    const dispatch = useDispatch();

    const [showEditForm, setShowEditForm] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showLangForm, setShowLangForm] = useState(false);

     useEffect(()=>{
         dispatch(userProjects(match.params.id))
         dispatch(userSLanguage(match.params.id))
     },[])
     
     const {projects} = useSelector(state => state.userProjectReducer)
     const {languages} = useSelector(state => state.userLanguageReducer)
     const handleEditForm = ()=> setShowEditForm(false);
     const handleProjectForm = ()=> setShowProjectForm(false);
     const handleLanguageForm = ()=> setShowLangForm(false);

     const onSubmit = (e)=> {
        e.preventDefault()
        let data = {
            p_title ,p_desc, start_time,end_time,p_link,userId:match.params.id
        }
        dispatch(addProject(data))
    }
     
    
    const onSubmitLanguage = (e)=> {
        e.preventDefault();
          const data = {
            lan_skill: item,lan_name:lan_type,userId:match.params.id
          }
          dispatch(addSLanguage(data))
    }
    return (
        <div>

          <div>
            <Modal show={showEditForm} onHide={handleEditForm}>
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Accomplishments</Modal.Title> */}
                    </Modal.Header>

                    <Modal.Body>
                        <Button variant="primary" onClick={() => setShowProjectForm(true)}>Project</Button>{' '}
                        <Button variant="secondary" onClick={() => setShowLangForm(true)}>Language</Button>{' '}
             
                   </Modal.Body>
             <br />
             <br />
             </Modal>
            </div>


          
            <div className="project_list">
            <Modal show={showProjectForm} onHide={handleProjectForm}  size="lg" centered dialogClassName="modalclass">
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Accomplishments</Modal.Title> */}
                    </Modal.Header>

                    <Modal.Body>
                      <h3>Add Project</h3>
                       
<form onSubmit ={onSubmit}>
                        <div className="edu_form">
                         <input required type="text" placeholder="Project Title" className="form-control edr_class" 
                        value={p_title} onChange={(e)=> setP_Title(e.target.value)}  />
                         </div>
                        
                         <div className="edu_form">
                            <input required type="text" placeholder="Project discription" className="form-control edr_class" 
                            value={p_desc} onChange={(e)=> setP_Desc(e.target.value)}  />
                         </div>
     
                         <div className="edu_form">
                         <input required type="text" placeholder="project start date" className="form-control edr_class" 
                        value={start_time} onChange={(e)=> setStartTime(e.target.value)}  />
                         </div>
                          
                         <div className="edu_form">
                            <input required type="text" placeholder="project end Date" className="form-control edr_class" 
                            value={end_time} onChange={(e)=> setEndTime(e.target.value)}  />
                         </div>

                         <div className="edu_form">
                         <input required type="text" placeholder="Project Link" className="form-control edr_class" 
                        value={p_link} onChange={(e)=> setPLink(e.target.value)}  />
                         </div>
                        
                      
                        <div className="form-group mt-2">
                             <button className="btn btn-primary" type="submit">Submit</button>
                         </div>
             </form> 
             
                   </Modal.Body>
             <br />
             <br />
             </Modal>
            </div>

             
            <div className="project_list">
            <Modal show={showLangForm} onHide={handleLanguageForm} size="lg">
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Accomplishments</Modal.Title> */}
                    </Modal.Header>

                    <Modal.Body>
                    <h3>Add Language</h3>
                    
               <form onSubmit ={onSubmitLanguage}>
                        <div>
                         <input required type="text" placeholder="Your Language" className="form-control edr_class" 
                        value={lan_type} onChange={(e)=> setLanType(e.target.value)}  />
                         </div>
                        
                         <div >
                         <select value={item} onChange={(e) => setItem(e.target.value)} className="form-control edr_class" >
                                <option value="Elementary proficiency">Elementary proficiency</option>
                                <option value="Limited working proficiency">Limited working proficiency</option>
                                <option value="Full professional proficiency">Full professional proficiency</option>
                                <option value="Professional working proficiency">Professional working proficiency</option>
                                <option value="Native or bilingual proficiency">Native or bilingual proficiency</option>
                            </select>
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


          {/* <button type="button" class="btn btn-primary"  onClick={() => setShowEditForm(true)}>+</button> */}
          <div style={{marginTop:"-45px",float:"right"}}>

     
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
            <i className="fal fa-plus fa-2x"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                <Button variant="light" onClick={() => setShowProjectForm(true)}>Project</Button>{' '}
                       
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                <Button variant="light" onClick={() => setShowLangForm(true)}>Language</Button>{' '}
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">

                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>


            <div className="row">
          
                <div className="col-md-1">
                    <h1 style={{color:"#0a66c2"}}>{projects && projects.length}</h1>
                </div>
                <div className="col-md-11" >
                      <p style={{textAlign:"start",color:"#0a66c2",fontSize:20}}>Projects</p>
                      {projects && projects.map(item => {
                return (
                    <div key={item._id} style={{display:"flex",flexDirection:"column"}}>
                        <h4 style={{alignSelf:"flex-start"}}>{item.p_title}</h4>
                        <p style={{alignSelf:"flex-start",fontSize:"20px",textAlign:"justify"}}>{item.p_desc }</p>
                        <p style={{alignSelf:"flex-start",fontSize:"20px"}}>
                            {item. start_time} -{item.end_time}</p>
                            <p style={{textAlign:"start",fontSize:18}}><a href={item.p_link} style={{textDecoration:"none"}}>See Project</a></p>
                            <hr />
                    </div>    
                )
            })}
                </div>
            </div>
         
           
            <hr />
            <div className="row">
         
                <div className="col-md-1">
                    <h1 style={{color:"#0a66c2"}}>{languages && languages.length}</h1>
                </div>
                <div className="col-md-11" >
                      <p style={{textAlign:"start",color:"#0a66c2",fontSize:20}}>Languages</p>
                      {languages && languages.map(item => {
                          return (
                              <div key={item._id}>
                                  <p style={{textAlign:"start",marginTop:"10px",marginBottom:"10px"}}> <b>{item.lan_name}</b>
                                   - {item.lan_skill && item.lan_skill}</p>
                                  <hr />
                              </div>    
                          )
                      })}
                </div>
            </div>


        </div>
    );
};

export default Project;


