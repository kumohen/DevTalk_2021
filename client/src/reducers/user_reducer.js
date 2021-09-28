export const userRegisterReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return {
                loading:true
            }
        case 'USER_REGISTER_SUCCESS':
            return {loading:false,success:true}
        case 'USER_REGISTER_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_LOGIN_REQUEST':
            return {
                loading:true
            }
        case 'USER_LOGIN_SUCCESS':
            return {loading:false,success:true,currentUser:action.payload}
        case 'USER_LOGIN_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}


export const userProfileReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_PROFILE_REQUEST':
            return {
                loading:true
            }
        case 'USER_PROFILE_SUCCESS':
            return {loading:false,success:true,cUser:action.payload}
        case 'USER_PROFILE_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}
export const userEduReducer = (state={userEdus:[]},action)=>{
    switch(action.type){
        case 'USER_EDUCATIONS_REQUEST':
            return {
                loading:true
            }
        case 'USER_EDUCATIONS_SUCCESS':
            return {loading:false,success:true,userEdus:action.payload}
        case 'USER_EDUCATIONS_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}
export const userSkillReducer = (state={skills:[]},action)=>{
    switch(action.type){
        case 'USER_SKILLS_REQUEST':
            return {
                loading:true
            }
        case 'USER_SKILLS_SUCCESS':
            return {loading:false,success:true,skills:action.payload}
        case 'USER_SKILLS_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const userProjectReducer = (state={projects:[]},action)=>{
    switch(action.type){
        case 'USER_PROJECTS_REQUEST':
            return {
                loading:true
            }
        case 'USER_PROJECTS_SUCCESS':
            return {loading:false,success:true,projects:action.payload}
        case 'USER_PROJECTS_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const userLanguageReducer = (state={languages:[]},action)=>{
    switch(action.type){
        case 'USER_LANGUAGE_REQUEST':
            return {
                loading:true
            }
        case 'USER_LANGUAGE_SUCCESS':
            return {loading:false,success:true,languages:action.payload}
        case 'USER_LANGUAGE_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const followUserReducer = (state={folllowUsers:[]},action)=>{
    switch(action.type){
        case 'USER_TOFOLLOW_REQUEST':
            return {...state,loading:true}
        case 'USER_TOFOLLOW_SUCCESS':
            return {
                folllowUsers:action.payload,loading:false
            }    
        case 'USER_TOFOLLOW_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const invitationUserReducer = (state={invitations:[]},action)=>{
    switch(action.type){
        case 'USER_INVITATION_REQUEST':
            return {...state,loading:true}
        case 'USER_INVITATION_SUCCESS':
            return {
                invitations:action.payload,loading:false
            }    
        case 'USER_INVITATION_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}