import React,{useEffect} from 'react';
import {requestedUser} from "../actions/user_action";
import { useDispatch ,useSelector} from 'react-redux';
import {followUser,rejectUser,findUserToFollow,messageUser} from "../actions/user_action"

const Mynetwork = () => {

    const dispatch = useDispatch() ;
    const {invitations} = useSelector(state => state.invitationUserReducer)
    useEffect(()=>{
       dispatch(requestedUser())
       dispatch(findUserToFollow())
    },[invitations])

    const {currentUser} = useSelector(state => state.userLoginReducer) ;
     const newInvitation = invitations && invitations.filter(item => item.pending_status);
     const {folllowUsers} = useSelector(state => state.followUserReducer)
     const IdArr = []
     const findInvitationListId = ()=> {
        newInvitation.forEach(item => {
            IdArr.push(item.senderId);
        })
     }
     findInvitationListId();

    const NewUserList = [] ;

    const UserListFun = ()=> {
        folllowUsers.forEach(item => {
            if(!IdArr.includes(item._id) && !item.inviList.includes(currentUser.user._id)){
                NewUserList.push(item)
            }
        })
    }
    UserListFun();
   


     const handleAccept = (user)=>{
         const dataUser = {
            receiverId:user.senderId,
            senderId:currentUser.user._id 
         }
        
       dispatch(followUser(user))
       dispatch(messageUser(dataUser))
    }
    return (
        <div>
            <h3>My network</h3>
                 
                <div className="col-md-7" style={{margin:"auto"}}>
                    <p style={{textAlign:"start",fontSize:"20px"}}> <b style={{color:"blue"}}>
                    </b> Pending invitation{ newInvitation.length === 1 ? null : 's'} </p>
                    {newInvitation && newInvitation.map(item => (
                        <div key={item._id}  style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",border:"1px solid black"}}>
                            <div className="col-md-2" style={{}}>
                               <img src={item.user_pic} alt="m"
                                style={{height:"70px",width:"70px",borderRadius:"50%",float:"right"}} />
                            </div>
                            <div className="col-md-4" style={{textAlign:"left",marginTop:"5px",marginLeft:"13px"}}>
                                <p><b>{item.user_name}</b></p>
                                <p style={{marginTop:"-15px"}}>{item.user_bio}</p>
                            </div>
                            <div className="col-md-3" style={{marginTop:"13px"}}>
                            <button className="btn btn-outline-primary" style={{marginRight:"5px"}}
                             onClick={() => handleAccept(item)} >Accept</button>
                            <button className="btn btn-outline-dark" onClick={()=>  dispatch(rejectUser(item))} >Ignore</button>
                            </div>
                           
                            <hr />
                        </div>
                    ))}
                </div>
                <div className="col-md-7"  style={{margin:"auto"}}>
                     <p>Those leader you may know</p>
                 
                     {NewUserList && NewUserList.map(item => {
                         return(
                             <div key={item._id} className="card" style={{width:"23%",float:"left",marginRight:"22px",marginBottom:"14px",paddingBottom:"15px"}}>
                                  <img src={item.profileImage} alt="mohen" style={{height:"100px",width:"100px",borderRadius:"50%",
                                   marginLeft:"30%",marginTop:"10px"
                                }} />
                                  <h4>{item.name}</h4>
                                  <p>{item.bio}</p>
                                  <button className="btn btn-outline-primary" style={{width:"60%",margin:"auto",borderRadius:"16px"}}>connect</button>
                             </div>
                         )
                     })}
                  
                </div>
            </div>
 
    );
};

export default Mynetwork;