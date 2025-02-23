// import React, {useState, useEffect} from 'react'
// import { container, PostCard } from '../components/index'
// import appwriteService from "../appwrite/config";

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {}, [])
//     appwriteService.getPosts([]).then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
//   return (
//     <div className='w-full py-8'>
//         <container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </container>
//     </div>
//   )
// }

// export default AllPosts

// import React, { useState, useEffect } from "react";
// import { container, PostCard } from "../components/index";
// import appwriteService from "../appwrite/config";

// function AllPosts() {
//     const [posts, setPosts] = useState([]); // Ensure posts is always an array

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await appwriteService.getPosts(); // Remove the empty array `[]`
//                 setPosts(response?.documents || []); // Ensure it's always an array
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//                 setPosts([]); // Set an empty array on error
//             }
//         };

//         fetchPosts();
//     }, []);

//     return (
//         <div className="w-full py-8">
//             <container>
//                 <div className="flex flex-wrap">
//                     {posts.length > 0 ? (
//                         posts.map((post) => (
//                             <div key={post.$id} className="p-2 w-1/4">
//                                 <PostCard {...post} />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center w-full text-gray-500">
//                             No posts available.
//                         </div>
//                     )}
//                 </div>
//             </container>
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { container, PostCard } from "../components/index";
// import appwriteService from "../appwrite/config";
// import { useSelector } from "react-redux"; // Import useSelector

// function AllPosts() {
//     const [posts, setPosts] = useState([]);
//     const userData = useSelector((state) => state.auth.userData); // Get user data from Redux
//     const userId = userData?.$id; // Ensure userId exists

//     useEffect(() => {
//         const fetchPosts = async () => {
//             if (!userId) {
//                 console.warn("User is not logged in. Redirecting...");
//                 return;
//             }

//             try {
//                 const response = await appwriteService.getPosts(userId);
//                 setPosts(response?.documents || []);
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//                 setPosts([]);
//             }
//         };

//         fetchPosts();
//     }, [userId]);

//     return (
//         <div className="w-full py-8">
//             <container>
//                 <div className="flex flex-wrap">
//                     {posts.length > 0 ? (
//                         posts.map((post) => (
//                             <div key={post.$id} className="p-2 w-1/4">
//                                 <PostCard {...post} />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center w-full text-gray-500">
//                             No posts available.
//                         </div>
//                     )}
//                 </div>
//             </container>
//         </div>
//     );
// }



// export default AllPosts;


import React, { useState, useEffect } from "react";
import { container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData); // ✅ Fetch from Redux
    const userId = userData?.$id; 

    useEffect(() => {
        if (!userData) {
            console.log("Fetching user data...");
            dispatch(fetchUserData()); // ✅ Fetch user details if not available
        }
    }, [dispatch, userData]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!userId) {
                console.warn("User is not logged in. Redirecting...");
                setTimeout(() => navigate("/login"), 1000);
                return;
            }

            try {
                const response = await appwriteService.getPosts(userId);
                setPosts(response?.documents || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchPosts();
    }, [userId, navigate]);

    if (loading || !userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full text-gray-500">
                            No posts available.
                        </div>
                    )}
                </div>
            </container>
        </div>
    );
}

export default AllPosts;

