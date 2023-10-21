import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './PostInfo.css'
  import {BsClockHistory} from 'react-icons/bs'

function PostInfo({ postId, onClose }) {
    const [post, setPost] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`)
                setPost(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(`Failed to fetch the results`);
                setError('Error fetching post details. Please try again later.');
            }
        };

        getPost();
    }, [postId]);

    if(error){
        console.log(post)
        toast(error);
        setError("");
      }

    if (!post ) {
        return <div className='post-detail'>
        <div className='load'>Loading post details....</div>
        <BsClockHistory size={80} style={{color:'red'}}/>
        <button onClick={onClose} >Back to Search Results</button>
        </div>
    }


    return (
        <div>
            <div className="post-detail">
                <button onClick={onClose}>Back to Search Results</button>
                <h2>{post.title}</h2>
                <p className='points'>Points: {post.points}</p>
                <h3>Comments:</h3>
                <div className='ul-container'>
                <ul className='inner'>
                    {post.children.map((comment) => (
                        <li key={comment.id} dangerouslySetInnerHTML={{ __html: comment.text }} className='comments'/>
                    ))}
                </ul>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    )
}

export default PostInfo