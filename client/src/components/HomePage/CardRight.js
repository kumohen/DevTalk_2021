import React,{useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import {requestedUser,followUser,findUserToFollow,sendFriendReq} from "../../actions/user_action"

const CardRight = () => {

    const dispatch = useDispatch() ;
    const {invitations} = useSelector(state => state.invitationUserReducer)
    useEffect(()=>{
       dispatch(requestedUser())
       dispatch(findUserToFollow())
    },[invitations])

     
     const newInvitation = invitations && invitations.filter(item => item.pending_status);
     const {currentUser} = useSelector(state => state.userLoginReducer) ;
     const {folllowUsers} = useSelector(state => state.followUserReducer)
     const IdArr = []
     const findInvitationListId = ()=> {
        newInvitation && newInvitation.forEach(item => {
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
       dispatch(followUser(user))
    }
   
   
    const handleConnectReq = (item)=>{
        const userInfo = {
            user_name:currentUser.user.name,
            user_bio:currentUser.user.bio,
            user_pic:currentUser.user.profileImage,
            userId:item._id,
            senderId:currentUser.user._id 
        }
        
        dispatch(sendFriendReq(userInfo))
    }
    return (
        <div style={{backgroundColor:"white",width:'480px',padding:"15px",borderRadius:"15px",position:"fixed"}}>
       
                <p style={{textAlign:"start",fontSize:"20px"}}><b> People you may know </b></p>
                 
                     {NewUserList && NewUserList.map(item => {
                         return(
                             <div key={item._id} style={{display:"flex",marginBottom:"10px"}}>
                                 <div>
                                 <img src={item.profileImage} alt="mohen" style={{height:"80px",width:"80px",borderRadius:"50%",
                                  
                                }} />
                                 </div>

                                 <div style={{marginLeft:"15px"}}>
                                 <p style={{textAlign:"start",fontSize:"20px"}}>{item.name}</p>
                                  <p style={{textAlign:"start",marginTop:"-11px"}}>{item.bio}</p>
                                  <button className="btn btn-outline-primary" onClick={() => handleConnectReq(item)}
                                  style={{width:"100px",borderRadius:"16px",float:"left",marginTop:"-10px"}}>connect</button>
                                 </div>
                                  
                                 
                             </div>
                         )
                     })}
                  
            
            </div>
 
    );
};

export default CardRight;