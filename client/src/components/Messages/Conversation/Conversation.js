import axios from "axios";
import React,{ useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
   


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/api/users/profile/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);



  //console.log(conversation)

 
  
  return (
    <div className={currentUser ? "currentUser" : null}  style={{marginTop:"20px",display:"flex"}}>
      <img src={user && user[0].profileImage} alt="mahen mondal" style={{height:"60px",width:"60px",borderRadius:"50%"}}/>
      <p style={{fontSize:"20px",marginTop:"10px",marginLeft:"4px"}}>{user && user[0].name}</p>
    </div>
  );
}