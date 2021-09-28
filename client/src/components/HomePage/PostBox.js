import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Modal} from "react-bootstrap"
import {addPost} from "../../actions/post_action"

const PostBox = () => {
    const {currentUser} = useSelector(state => state.userLoginReducer)
    const [showEditForm, setShowEditForm] = useState(false);
    const [imgCollection,setImgCollection] = useState("");
    const[title,setTitle] = useState("")

    const handleEditForm = ()=> setShowEditForm(false);
    const dispatch = useDispatch();
    const onFileChange = (e)=> {
        // this.setState({ imgCollection: e.target.files })
        setImgCollection(e.target.files);
     }
    const onSubmit = (e)=> {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            formData.append('imgCollection', imgCollection[key])
        }
        formData.append('title', title);
       
        dispatch(addPost(formData));
        setShowEditForm(false);
       // window.location.reload();
    }
    return (
        <div>

        <div>
        <Modal show={showEditForm} onHide={handleEditForm} animation={false}       size="lg" centered dialogClassName="modalclass"
        aria-labelledby="example-custom-modal-styling-title" >
                    <Modal.Header closeButton>
                    <Modal.Title>Create A Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                <form onSubmit ={onSubmit}>
                     <div className="form-group mb-2">
                            <input type="text" name="title" placeholder="write your content" className="form-control" onChange={e => setTitle(e.target.value)}  value={title}/>
                    </div>
                         <div className="form-group mb-2">
                            <input type="file" name="imgCollection" className="form-control" onChange={onFileChange} multiple />
                         </div>
                        <div className="form-group">
                             <button className="btn btn-primary" type="submit">Submit</button>
                         </div>
                    </form> 
             </Modal.Body>
             <br />
             <br />
             </Modal>
        </div>

        <div style={{display:"flex",backgroundColor:"white",padding:"10px",borderRadius:"5px"}}>
               <img src={currentUser && currentUser.user && currentUser.user.profileImage } alt="mahen mondal"
              style={{height:"60px",width:"60px",borderRadius:"50%",marginRight:"15px"}} />
              <button style={{height:"60px",width:"100%",borderRadius:"25px"}} onClick={() => setShowEditForm(true)}>Start A Post</button>
        </div>



        </div>
    );
};

export default PostBox;