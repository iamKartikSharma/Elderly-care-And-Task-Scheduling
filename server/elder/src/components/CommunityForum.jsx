import React, { useState } from 'react';
import Navbar from './navbar';
const categories = [
  "General Discussions",
  "Health & Wellness",
  "Caregiving Tips",
  "Hobbies & Activities",
  "Support & Assistance"
];

const CommunityForum = ({username,userType}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetchPost();
  },[])

  const fetchPost = async()=>{
    const res= fetch("http:localhost:8000/comunity-post");
    const data = await res.json();
    setPosts(data);
  }


  const handlePostSubmit = async() => {
    const res = await fetch("http:localhost:8000/comunity-post",{
        method:"POST",
        headers:{"content-type" : "application/json"},
        body:json.stringify({
            newPost,
            username,
            selectedCategory
        })


    })
    if(res.ok){
        setSelectedCategory('');
        setNewPost('');
        fetchPost();
    }
  };

  return (
    <>
    <Navbar username={username} userType={userType} ></Navbar>
    <div className="p-4 max-w-2xl mx-auto">
    
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>
      
      {/* Category Tabs */}
      <div className="flex space-x-2 mb-4 overflow-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Post Input */}
      <div className="mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={`Share something in ${selectedCategory}...`}
        ></textarea>
        <button
          onClick={handlePostSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </div>

      {/* Posts Display */}
      <div>
        {posts.filter(post => post.category === selectedCategory).map((post, index) => (
          <div key={index} className="p-3 border rounded mb-2">
            {post.content}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CommunityForum;

