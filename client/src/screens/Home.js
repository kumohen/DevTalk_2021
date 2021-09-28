import React, { useEffect } from 'react';
import Upload from "../components/Upload";
import {getAllPost} from "../actions/post_action";
import { useDispatch ,useSelector} from 'react-redux';
import CardLeft from "../components/HomePage/CardLeft"
import CardRight from "../components/HomePage/CardRight"
import PostBox from "../components/HomePage/PostBox"
import HomeCard from "../components/HomeCard";

const Home = () => {
    const dispatch = useDispatch();
    const {posts,loading} = useSelector(state => state.getAllPostReducer)
    useEffect(()=>{
        dispatch(getAllPost())
    },[posts])
   
    return (
        <div style={{backgroundColor:"rgb(244 244 245)",paddingTop:"14px"}}>
             {/* {loading && <Loading   />} */}
            <div className="row">
            <div className="col-md-1">
                  
                  </div>
                <div className="col-md-2">
                    <CardLeft  />
                </div>
                <div className="col-md-5" >
                
                   <PostBox  />
                   <HomeCard posts={posts} />

                </div>
                <div className="col-md-3" >
                     <CardRight  />
                </div>
                <div className="col-md-2">
                  
                </div>
            </div>
        </div>
    );
};

export default Home;