import React,{useState} from 'react';
import useKeypress from 'react-use-keypress';
import {Link} from "react-router-dom"
import {Modal} from "react-bootstrap"
import { useSelector,useDispatch } from 'react-redux';
import {logoutUser} from "../actions/user_action"
import Upload from './Upload';

const Navbar = () => {
  const[searchKey,setSearchKey] = useState("");
  const [show, setShow] = useState(false);
    const {currentUser} = useSelector(state => state.userLoginReducer) ;

    const userId =  currentUser ? currentUser.user._id : null ;
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    
    useKeypress('Enter', () => {
       console.log(searchKey)
    });
    
    return (
        <div style={{backgroundColor:"white",position:"absolute",width:"100%"}}>
             <Modal show={show} onHide={handleClose}>
                     <Modal.Header closeButton>
                    <Modal.Title>Create Your Post </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Upload show={show} onChange={handleClose} />
                    </Modal.Body>  
             </Modal>  
           
            <nav className="navbar fixed-top navbar-expand-lg  mb-5 navbar-white bg-white rounded "
             style={{width:"100%",margin:"auto",borderBottomColor:"1px solid black",marginBottom:"3px",height:"70px",}}>
  <div className="container-fluid" style={{width:"82%"}}>
    <Link className="navbar-brand" to="/" style={{fontFamily:"Yellowtail ",fontSize:"30px",color:"black"}}>DevTalk</Link>
    {currentUser && (
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <img src={currentUser && currentUser.user.profileImage} alt="okk" style={{height:"60px",width:"60px",borderRadius:"50%",marginTop:"-20px"}} />
       </button>
    )}
    
    <div className="input-group" style={{width:"250px",marginLeft:"100px"}}>
        <span>
       
        </span>
        <input type="text" className="form-control" placeholder="Search"  value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
    </div>
   
 
 

   
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <ul className="navbar-nav ml-auto " style={{width:"470px"}}>
      
              <div className="dropdown mt-2">
                 {currentUser && (
                   <>
                    <Link to="/" style={{color:"black"}}> <i className="far fa-home-lg-alt fa-2x" style={{marginRight:"40px"}}></i>  </Link>
                    <Link to="/jobs" style={{color:"black"}}> <i className="fas fa-shopping-bag fa-2x" style={{marginRight:"40px"}}></i></Link>
                     
               
                     <Link to="/chat" style={{color:"black"}}> <i className="fad fa-comments-alt fa-2x" style={{marginRight:"40px"}}></i></Link>
                  
                  
                     <Link to="/mynetwork" style={{color:"black"}}>  <i className="fas fa-user-friends fa-2x" style={{marginRight:"40px"}}></i></Link>
                   
                
                    <Link to="/notification" style={{color:"black"}}>  <i className="fas fa-bell fa-2x" style={{marginRight:"40px"}}></i></Link> 


                    <Link className=" dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="">
                    <img src={currentUser && currentUser.user.profileImage} alt="okk" style={{height:"50px",width:"50px",borderRadius:"50%",marginTop:"-20px"}} />
                    </Link>
                      </>
                 )}
                
                  {currentUser ? (
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     <Link className="dropdown-item" to={`/profile/${userId}`}>
                        Profile
                     </Link>
                     
                     <Link className="dropdown-item" to="/login" > <li onClick={()=> dispatch(logoutUser())} >Logout</li></Link>
                   
                   </div>
                   ) : (
                    <li className="nav-item ">
                    <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                    </li>
                   ) } 
                 
                </div>
          
              
      
       
      </ul>
    </div>
  </div>
</nav>

        </div>
    );
};

export default Navbar;