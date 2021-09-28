import axios from 'axios';

export const registerUser = (user)=> async dispatch =>{
     dispatch({
         type:'USER_REGISTER_REQUEST'
     })
    
     try {
       const res =  await axios.post("/api/users/signup",user);
       
         dispatch({
            type:'USER_REGISTER_SUCCESS'
            
        })
     } catch (error) {
        dispatch({
            type:'USER_REGISTER_FAILED',
            payload:error
        })
     }
}

export const loginUser = (user)=> async dispatch =>{
    dispatch({
        type:'USER_LOGIN_REQUEST'
    })
   
    try {
      const res =  await axios.post("/api/users/signin",user);
      
        dispatch({
           type:'USER_LOGIN_SUCCESS',
           payload:res.data
       })
       localStorage.setItem("jwt", res.data.token);
       localStorage.setItem('currentUser',JSON.stringify(res.data));
       window.location.href = "/";
    } catch (error) {
       dispatch({
           type:'USER_LOGIN_FAILED',
           payload:error
       })
    }
}


export const logoutUser = ()=> async dispatch =>{
    
       localStorage.removeItem('currentUser');
       window.location.href = "/login";
   
}


export const userProfile = (id)=> async dispatch =>{
    dispatch({
        type:'USER_PROFILE_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get(`/api/users/profile/${id}` ,config);
         console.log(response)
        dispatch({
           type:'USER_PROFILE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_PROFILE_FAILED',
           payload:error
       })
    }
}

export const updateUserProfile = (userData)=> async dispatch =>{
    dispatch({
        type:'UPDATE_USER_PROFILE_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post(`/api/users/updateProfile` ,userData,config);
        dispatch({
           type:'UPDATE_USER_PROFILE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'UPDATE_USER_PROFILE_FAILED',
           payload:error
       })
    }
}

export const userEducations = (id)=> async dispatch =>{
    dispatch({
        type:'USER_EDUCATIONS_REQUEST'
    })
  
    try {
        const response = await axios.get(`/api/edu/allUserEdu/${id}`);
        console.log(response)
        dispatch({
           type:'USER_EDUCATIONS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_EDUCATIONS_FAILED',
           payload:error
       })
    }
}

export const addEducation = (post)=> async dispatch =>{
    dispatch({
        type:'ADD_EDUCATION_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post('/api/edu/addEdu',post,config);
      
        dispatch({
           type:'ADD_EDUCATION_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_EDUCATION_FAILED',
           payload:error
       })
    }
}
export const addProject = (post)=> async dispatch =>{
    dispatch({
        type:'ADD_PROJECT_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post('/api/project/addProject',post,config);
      
        dispatch({
           type:'ADD_PROJECT_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_PROJECT_FAILED',
           payload:error
       })
    }
}

export const addSLanguage = (post)=> async dispatch =>{
    dispatch({
        type:'ADD_LANGUAGE_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post('/api/project/addLanguage',post,config);
      
        dispatch({
           type:'ADD_LANGUAGE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_LANGUAGE_FAILED',
           payload:error
       })
    }
}

export const userSLanguage = (id)=> async dispatch =>{
    dispatch({
        type:'USER_LANGUAGE_REQUEST'
    })
  
    try {
        const response = await axios.get(`/api/project/allUserSLan/${id}`);
       
        dispatch({
           type:'USER_LANGUAGE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_LANGUAGE_FAILED',
           payload:error
       })
    }
}

export const userProjects = (id)=> async dispatch =>{
    dispatch({
        type:'USER_PROJECTS_REQUEST'
    })
  
    try {
        const response = await axios.get(`/api/project/allUserProject/${id}`);
       
        dispatch({
           type:'USER_PROJECTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_PROJECTS_FAILED',
           payload:error
       })
    }
}

export const userSkills = (id)=> async dispatch =>{
    dispatch({
        type:'USER_SKILLS_REQUEST'
    })
  
    try {
        const response = await axios.get(`/api/skills/allUserSkill/${id}`);
       
        dispatch({
           type:'USER_SKILLS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_SKILLS_FAILED',
           payload:error
       })
    }
}
export const addASkill = (post)=> async dispatch =>{
    dispatch({
        type:'ADD_SKILL_REQUEST'
    })
  
    try {
        const response = await axios.post('/api/skills/addSkills',post);
      
        dispatch({
           type:'ADD_SKILL_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_SKILL_FAILED',
           payload:error
       })
    }
}
export const sendFriendReq = (post)=> async dispatch =>{
    dispatch({
        type:'SEND_FRIEND_REQUEST'
    })
  
    try {
        const response = await axios.post('/api/skills/sendFReq',post);
      
        dispatch({
           type:'SEND_FRIEND_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'SEND_FRINED_FAILED',
           payload:error
       })
    }
}
export const    requestedUser = ()=> async dispatch =>{
    dispatch({
        type:'USER_INVITATION_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get(`/api/skills/userInvitation` ,config);
      
        dispatch({
           type:'USER_INVITATION_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_INVITATION_FAILED',
           payload:error
       })
    }
}

export const    findUserToFollow = ()=> async dispatch =>{
    dispatch({
        type:'USER_TOFOLLOW_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get(`/api/users/findFollower` ,config);
      
        dispatch({
           type:'USER_TOFOLLOW_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_TOFOLLOW_FAILED',
           payload:error
       })
    }
}
export const followUser = (user)=> async dispatch =>{
    dispatch({
        type:'FOLLOW_USER_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.put(`/api/users/follow` ,user,config);
      
        dispatch({
           type:'FOLLOW_USER_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'FOLLOW_USER_FAILED',
           payload:error
       })
    }
}

export const rejectUser = (user)=> async dispatch =>{
  
    dispatch({
        type:'REJECT_USER_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post(`/api/users/reject` ,user,config);
      
        dispatch({
           type:'REJECT_USER_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'REJECT_USER_FAILED',
           payload:error
       })
    }
}
export const messageUser = (user)=> async dispatch =>{
  
    dispatch({
        type:'USER_MESSAGE_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post(`/api/conversations/` ,user,config);
      
        dispatch({
           type:'USER_MESSAGE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_MESSAGE_FAILED',
           payload:error
       })
    }
}