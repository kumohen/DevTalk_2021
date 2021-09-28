import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux"
import {userProfile} from "../actions/user_action"
import backImage from "../Images/back.png"
import {Modal} from "react-bootstrap"
import Education from "../components/Education"
import Skillscompoent from "../components/Skills"
import Project from "../components/Project"
import {updateUserProfile,sendFriendReq,messageUser} from "../actions/user_action";


const Profile = ({match}) => {
    const [image,setImage] = useState("");
    const [show, setShow] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showFollower, setShowFollower] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [bgImageForm, setBgImageForm] = useState(false);
    const [select,setSelect] = useState(null)
    const[name,setName] = useState("");
    const[bio,setBio] = useState("");
    const[location,setLocation] = useState("");

    const {currentUser} = useSelector(state => state.userLoginReducer) ;
    const dispatch = useDispatch();
     useEffect(()=>{
        dispatch(userProfile(match.params.id))
               setName(currentUser.user.name);
               setBio(currentUser.user.bio);
               setLocation(currentUser.user.location)
     },[currentUser])
     
     const {cUser} = useSelector(state => state.userProfileReducer)
     
    
     
     const visitedUserId = match.params.id ;
     const loginuserId =  currentUser ? currentUser.user._id : null ;

     console.log(cUser)

     const onFileChange = (e)=> {
         setImage(e.target.files[0]);
       
     }

    var followeListId = [];

    const findIdList = ()=>{
        if(cUser){
            cUser[0].followers.forEach(item => {
                followeListId.push(item.userId)
            })
        }
    } 
    findIdList();

   

     const onSubmit = (e)=> {
        e.preventDefault()
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          };
        var formData = new FormData();
       
            formData.append('image', image)
        
        axios.put("http://localhost:4000/api/users/profilePic", formData, config , {
        }).then(res => {
           
            window.location.reload()
        })
    }
    

    const onSubmitBgImage = (e)=> {
        e.preventDefault()
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          };
        var formData = new FormData();
       
            formData.append('image', image)
        
        axios.put("http://localhost:4000/api/users/bgPic", formData, config , {
        }).then(res => {
           
            window.location.reload()
        })
    }
  const  onEditSubmit = (e)=> {
      e.preventDefault();
        const data = {
            name,bio,location ,userId:loginuserId
        }
        dispatch(updateUserProfile(data))
    }

    const ArrId = [];

    const collectIdList = ()=>{
        cUser && cUser[0].followers.forEach(item => {
            ArrId.push(item.userId)
        })
    }
        
    collectIdList();

 
    
    const sendConRequest = ()=> {
        const userInfo = {
            user_name:currentUser.user.name,
            user_bio:currentUser.user.bio,
            user_pic:currentUser.user.profileImage,
            userId:match.params.id,
            senderId:currentUser.user._id 
        }
        dispatch(sendFriendReq(userInfo))
    }
     
    const handleEditForm = ()=> setShowEditForm(false);
    const handlefollower = ()=> setShowFollower(false);
    const handleProjectForm = ()=> setShowProfileForm(false);
    const handleBgImageForm = ()=> setBgImageForm(false)

    const sendMessageReq = (item)=>{
    
        const user = {
            senderId:currentUser.user._id ,
            receiverId:item.userId
        }
        dispatch(messageUser(user))
    }

    return (
        <div>
           

            <div>
            <Modal show={showEditForm} onHide={handleEditForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Intro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onEditSubmit}>

                         
                          <div className="edu_form">
                             <label htmlFor="">Name </label>
                            <input required type="text" placeholder="Name" className="form-control edr_class" 
                            value={name} onChange={(e)=> setName(e.target.value)}  />
                         </div>

                        <div className="edu_form">
                          <label htmlFor="">Bio </label>
                         <input required type="text" placeholder="Ex. bachelor" className="form-control edr_class" 
                          value={bio} onChange={(e)=> setBio(e.target.value)}  />
                        </div>
                        
                        
                         <div className="edu_form">
                         <label htmlFor="">Location </label>
                         <input required type="text" placeholder="Location" className="form-control edr_class" 
                        value={location} onChange={(e)=> setLocation(e.target.value)}  />
                         </div>

                         <div className="form-group mt-2">
                             <button className="btn btn-primary" type="submit">Update</button>
                         </div>
                   
             </form> 
             </Modal.Body>
             <br />
             <br />
             </Modal>
            </div>

            <div>
            <Modal show={showProfileForm} onHide={handleProjectForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>upload profile image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onSubmit}>

                         
                    <div className="form-group">
                        <input type="file" name="imgCollection" onChange={onFileChange}  />
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

            <div>
            <Modal show={bgImageForm} onHide={handleBgImageForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Upload background image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onSubmitBgImage}>

                         
                    <div className="form-group">
                        <input type="file" name="imgCollection" onChange={onFileChange}  />
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

            <div>
            <Modal show={showFollower} onHide={handlefollower} size="lg">
                    <Modal.Header closeButton>
                    
                 </Modal.Header>
                    <Modal.Body>
                    {visitedUserId === currentUser.user._id ? 
                        <>
                           {currentUser &&  currentUser.user && currentUser.user.followers && currentUser.user.followers.map(item => (
                          <div key={item._id} style={{display:'flex'}}>
                             
                               <div className="col-md-2">
                                   <img src={item.image} style={{height:"90px",width:"90px",borderRadius:"50%"}} alt="" />
                               </div>
                               <div style={{marginLeft:"15px"}} className="col-md-5">
                                   <p style={{textAlign:"start",fontSize:'20px',fontWeight:"900"}}>{item.name}</p>
                                   <p style={{textAlign:"start"}}>{item.bio}</p>
                                   <hr />
                               </div>
                               {/* <div style={{marginLeft:"160px"}} className="col-md-2">
                                   <button className="btn btn-success" onClick={() => sendMessageReq(item)}>message</button>
                               </div> */}
                          </div>    
                        ))}
                        </>
                    :
                    <>
                          {cUser &&   cUser[0].followers.map(item => (
                          <div key={item._id} style={{display:'flex'}}>
                             
                               <div>
                                   <img src={item.image} style={{height:"90px",width:"90px",borderRadius:"50%"}} alt="" />
                               </div>
                               <div>
                                   <p style={{textAlign:"start",fontSize:'20px',fontWeight:"900"}}>{item.name}</p>
                                   <p style={{textAlign:"start"}}>{item.bio}</p>
                                   <hr />
                               </div>
                          </div>    
                        ))}
                        </>
                    }
                   </Modal.Body>
            
             </Modal>
            </div>


            <div  style={{backgroundColor:"#EFEFE9"}}>
                <div className="col-md-9"  style={{margin:"auto"}}>
                    <div className="row" style={{display:"flex"}}>
                        <div className="col-md-9  " >
                              <div className="profile_header   mb-5 mt-4 bg-white rounded" 
                              style={{borderRadius:"15px",paddingBottom:"25px"}}>
                               
                              <div className="col-md-12" style={{display:"flex"}}>
                                    {cUser && cUser[0].bg_image    ? (
                                        <img  src={cUser[0].bg_image }  alt="kll" onClick={() => setBgImageForm(true)}
                                        style={{height:"220px",width:"100%"}}  />
                                    ):(
                                        <img  src={backImage}  alt="kll" onClick={() => setBgImageForm(true)}
                                        style={{height:"220px",width:"100%"}}  />
                                    )}
                                   
                              </div>
                              <div className="col-md-3 p-4" style={{display:"flex",marginTop:"-150px"}}>
                                    <img  src={cUser && cUser[0].profileImage}  alt="kll" onClick={() => setShowProfileForm(true)}
                                    style={{height:"190px",width:"190px",borderRadius:"50%",marginTop:"10px"}} />
                              </div>
                                                      
            <div className="upper_block" style={{alignSelf:"flex-end",marginTop:"-90px",marginLeft:"800px"}}>
                {
                    visitedUserId === loginuserId ? (
                        <button className="ml-2"  style={{height:"35px",borderBottomColor:"gray",fontWeight:"600",
                        borderColor:"gray",backgroundColor:"white",borderRadius:"5px"}}
                         onClick={() => setShowEditForm(true)} >Edit  Profile</button>
                 ): null

                }
                {visitedUserId !== loginuserId && <div style={{height:"35px"}}></div>}

                            </div>
                                <div  className="p-4 mt-3"
                                 style={{display:"flex",flexDirection:"column",alignItems:'flex-start',marginTop:"-15px"}}>
                                     
                                 <h3>{cUser && cUser[0].name}</h3>
                                <p>{cUser  && cUser[0].bio}</p>
                                <p> {cUser && cUser[0].location}, India 
                                <span style={{color:"blue",fontWeight:"600"}}> Contact info </span></p>
                                <p style={{color:"blue",fontWeight:"600"}} onClick={() => setShowFollower(true)}>  {cUser && cUser[0].followers.length} connections</p>
                              
                                </div>
                               {visitedUserId != loginuserId && (
                                    <div style={{display:"flex",alignItems:'flex-start',marginTop:"-15px",marginLeft:"20px"}}>
                                    {cUser && cUser[0].inviList.includes(loginuserId)  && !ArrId.includes(loginuserId) && (
                                        <button className="btn btn-secondary btn-lg"
                                         disabled style={{height:"45px",borderRadius:"25px",marginRight:"15px"}}
                                        > pending  </button>
                                    )}
                                     {followeListId && !followeListId.includes(loginuserId) && cUser && !cUser[0].inviList.includes(loginuserId)  && (
                                       <button className="btn btn-primary " style={{marginRight:"10px",borderRadius:"25px",height:"40px"}}
                                       onClick={()=> sendConRequest()}> Connect  </button>
                                    )}
                                   <button className="btn btn-outline-secondary"
                                    style={{height:"40px",borderRadius:"25px",marginRight:"15px"}}> Message </button>
                                    <button className="btn btn-outline-secondary" style={{height:"40px",borderRadius:"25px"}}> More</button>
                                </div>
                               )}
                                </div>

                                <div className="profile_header   mb-5 mt-4 bg-white rounded" style={{marginTop:"20px"}}>
                                     <h3 style={{display:"flex",marginLeft:"20px"}}>Education</h3>
                                      <Education  match={match} />
                                </div>   
                                

                                <div className="profile_header   mb-5 mt-4 bg-white rounded"
                                 style={{marginTop:"20px",padding:"10px",backgroundColor:"#f9fafb"}}>
                                    
                                      <Skillscompoent  match={match} />
                                </div>   

                                <div className="profile_header   mb-5 mt-4 bg-white rounded"
                                 style={{marginTop:"20px",padding:"10px",backgroundColor:"#f9fafb"}}>
                                       <h3 style={{display:"flex",marginLeft:"20px"}}>Accomplishments</h3>
                                      <Project  match={match} />
                                </div> 
                              
                        </div>
                        
                        <div className="col-md-3">
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;