import React from 'react';
import {Card} from "react-bootstrap"
import { useSelector } from 'react-redux';
import backImage from "../../Images/back.png"

const CardLeft = () => {

    const {currentUser} = useSelector(state => state.userLoginReducer)
 
   
    return (
        <div style={{position:"fixed"}}>
            <Card style={{width:"294px"}}>
                <img src={backImage} alt="" style={{height:"86px",width:"294px",  position:"fixed"}}/>
                <img src={currentUser && currentUser.user && currentUser.user.profileImage } alt="mahen mondal"
                 style={{height:"90px",width:"90px",borderRadius:"50%",marginLeft:"33%",zIndex:"100",marginTop:"20px"}} />

                 <h5 style={{marginTop:"20px"}}>{currentUser && currentUser.user && currentUser.user.name } </h5>
                 <p>{currentUser && currentUser.user && currentUser.user.bio }</p>
                 <hr />
                
                 <p style={{textAlign:"start",marginLeft:"10px"}}>  Connections
                  <span style={{float:"right",marginRight:"10px",color:"blue",fontWeight:"700"}}>
                       {currentUser && currentUser.user && currentUser.user.followers.length } </span></p>
                 <p style={{textAlign:"start",marginLeft:"10px"}}><b>Grow your network</b></p>
                 <hr />
                 <p>Access exclusive tools and insights</p>
                 <p style={{fontWeight:"600"}}>Try premium for free</p>
                 <hr />
                 <div style={{display:"flex",marginLeft:"4px"}}>
                    <i className="far fa-bookmark "></i> <p style={{marginLeft:"7px"}}>
                      <b >  My itmes</b></p>
                 </div>
            </Card>    
        </div>
    );
};

export default CardLeft;