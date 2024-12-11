import '../styles/Updateblogpost.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


// Assuming you have defined REACT_APP_API_URL in your .env file and it's loaded correctly
const apiUrl = process.env.REACT_APP_API_URL;

const UpdateBlogPost = () => {
  const { postId } = useParams(); // Extract the post ID from the URL
  const token = localStorage.getItem('token')
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    // Fetch the post by ID from the backend
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts/${postId} `, { headers: { Authorization: `Bearer ${token}` }, });
        setPost(response.data.post);
        
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdateBlog = async () => {
    const updatedData = {
      title: post.title,
      content: post.content,
//       imageUrl: post.imageUrl
    };

    try {
      const response = await axios.put(`${apiUrl}/api/posts/edit/${postId}`, updatedData, { headers: { Authorization: `Bearer ${token}` }, });
      console.log('Post updated successfully:', response.data);
      navigate(`/blogpostloggedin/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="update-blog-post-container">
      <header className="update-blog-post-header">
        <Link to={`/blogpostloggedin/${postId}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
        </Link>
      </header>
      <form className="update-blog-post-form" onSubmit={(e) => {
          e.preventDefault();
          handleUpdateBlog();
        }}>
        <div className="form-group">
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postContent">Content:</label>
{/*           <textarea
            id="postContent"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          /> */}
          <textarea                                                             //CHANGE
            id="postContent"
            rows={10} // Adjust rows to an appropriate value
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>

{/*         <div className="form-group">
          <label htmlFor="postImageUrl">Image URL:</label>
          <input
            type="text"
            id="postImageUrl"
            value={post.imageUrl}
            onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          />
        </div> */}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateBlogPost;