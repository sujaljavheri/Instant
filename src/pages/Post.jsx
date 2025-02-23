// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, container } from "../components/index";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPosts(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };
//     return post ? (
//         <div className="py-8">
//             <container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </container>
//         </div>
//     ) : null;
// }
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, container } from "../components";
// import { useSelector } from "react-redux";


// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData && post.user === userData.$id;





//     // useEffect(() => {
//     //     if (slug) {
//     //         appwriteService.getPosts(slug).then(async (response) => {
//     //             console.log("Fetched post:", response?.documents[slug]);
//     //             if (response?.documents?.length > 0) {
//     //                 const post = response.documents[slug];
//     //                 const previewUrl = await appwriteService.getFilePreview(post.featuredImage);
//     //                 console.log("Preview URL in component:", previewUrl);

//     //                 setPost({
//     //                     ...post,
//     //                     featuredImagePreview: previewUrl, // Add preview URL
//     //                 });
//     //             } else {
//     //                 navigate("/");
//     //             }
//     //         });
//     //     } else {
//     //         navigate("/");
//     //     }
//     // }, [slug, navigate]);

//     // useEffect(() => {
//     //     if (slug) {
//     //         appwriteService.getPosts(slug).then(async (response) => {
//     //             console.log("Slug from URL:", slug);
//     //             console.log("API response documents:", response?.documents);

//     //             if (response?.documents?.length > 0) {
//     //                 // Find the document that matches the slug
//     //                 const matchingPost = response.documents.find(
//     //                     (doc) => doc.title === slug // Match slug with title
//     //                 );

//     //                 if (matchingPost) {
//     //                     // Fetch preview URL
//     //                     const previewUrl = await appwriteService.getFilePreview(matchingPost.featuredImage);
//     //                     console.log("Preview URL in component:", previewUrl);

//     //                     // Update state
//     //                     setPost({
//     //                         ...matchingPost,
//     //                         featuredImagePreview: previewUrl, // Add preview URL to the state
//     //                     });
//     //                 } else {
//     //                     console.warn("No post found matching the slug.");
//     //                     navigate("/"); // Redirect if no match is found
//     //                 }
//     //             } else {
//     //                 console.error("No documents returned from the API.");
//     //                 navigate("/"); // Redirect if no documents are returned
//     //             }
//     //         }).catch((error) => {
//     //             console.error("Error fetching posts:", error);
//     //             navigate("/"); // Redirect on error
//     //         });
//     //     } else {
//     //         navigate("/"); // Redirect if no slug is provided
//     //     }
//     // }, [slug, navigate]);

//     // const b =appwriteService.getPosts(userData.$id);
//     // console.log(b);

//     // if(b){
//     //     useEffect(() => {
//     //         if (userData?.$id) {
//     //             console.log("userData is :", userData.$id);
//     //             appwriteService.getPosts(userData.$id).then((response) => {
//     //                 if (response?.documents?.length > 0) {
//     //                     const matchingPost = response.documents.find((doc) => doc.title === slug);
//     //                     if (matchingPost) {
//     //                         appwriteService.getFilePreview(matchingPost.featuredImage).then((previewUrl) => {
//     //                             setPost({
//     //                                 ...matchingPost,
//     //                                 featuredImagePreview: previewUrl,
//     //                             });
//     //                         });
//     //                     } else {
//     //                         navigate("/"); // Redirect if no matching post is found
//     //                     }
//     //                 } else {
//     //                     console.warn("No posts found for the user.");
//     //                     navigate("/"); // Redirect if no posts are returned
//     //                 }
//     //             }).catch((error) => {
//     //                 console.error("Error fetching user-specific posts:", error);
//     //                 navigate("/");
//     //             });
//     //         } else {
//     //             navigate("/"); // Redirect if no user is logged in
//     //         }
//     //     }, [slug, userData, navigate]);
//     // }


//     if (!userData?.$id) {
//         console.warn("User data or userId is missing.");
//         navigate("/"); // Redirect if no user is logged in
//         return;
//     }
//     else{
//         if(appwriteService.getPosts(userData.$id)){
//             console.log("i got the user id : ",userData.$id)
//              var a=1;
//         }
//         if(a==1){
//             useEffect(() => {


//                 var fetchPosts = async () => {
//                     try {
//                         console.log("userData is:", userData.$id);

//                         const response = await appwriteService.getPosts(userData.$id);

//                         if (response?.documents?.length > 0) {
//                             const matchingPost = response.documents.find((doc) => doc.title === slug);

//                             if (matchingPost) {
//                                 const previewUrl = await appwriteService.getFilePreview(matchingPost.featuredImage);
//                                 setPost({
//                                     ...matchingPost,
//                                     featuredImagePreview: previewUrl,
//                                 });
//                             } else {
//                                 console.warn("No matching post found for the provided slug.");
//                                 navigate("/"); // Redirect if no matching post is found
//                             }
//                         } else {
//                             console.warn("No posts found for the user.");
//                             navigate("/"); // Redirect if no posts are returned
//                         }
//                     } catch (error) {
//                         console.error("Error fetching user-specific posts:", error);
//                         navigate("/"); // Redirect on error
//                     }
//                 };

//                 fetchPosts();
//             }, [slug, userData, navigate]);


//         }

//     }




//     // useEffect(() => {
//     //     console.log("Post data:", post);
//     //     console.log("User data:", userData);
//     // }, [post, userData]);


//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     if (!post || !post.featuredImagePreview) {
//         return <div>Loading...</div>; // Loading state
//     }

//     return (
//         <div className="py-8">
//             <container>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

//                     <img
//                         src={post.featuredImagePreview}
//                         alt={post.title || "Default Image"}
//                         className="rounded-xl"
//                     />
//                     {/* {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )} */}

// {isAuthor && (
//     <div className="absolute right-6 top-6">
//         <Link to={`/edit-post/${post.$id}`}>
//             <Button bgColor="bg-green-500" className="mr-3">
//                 Edit
//             </Button>
//         </Link>
//         <Button bgColor="bg-red-500" onClick={deletePost}>
//             Delete
//         </Button>
//     </div>
// )}

//                 </div>
//             </container>
//         </div>
//     );
// }




import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) return;  // Prevent extra calls if user is not available
        appwriteService.getPosts(userData).then((posts) => {
            setPost(posts?.documents || []);
        });
    }, [userData]);  // Runs only when userId changes


    // useEffect(() => {
    //     if (!userData?.$id) {
    //         console.warn("User is not logged in.");
    //         navigate("/"); // Redirect if not logged in
    //         return;
    //     }

    //     const fetchPosts = async () => {
    //         try {
    //             console.log("Fetching posts for user:", userData.$id);
    //             const response = await appwriteService.getPosts(userData.$id);
    //             console.log("response : ",response)

    //             if (response) {
    //                 const matchingPost = response.find((doc) => doc.title === slug);

    //                 if (matchingPost) {
    //                     const previewUrl = await appwriteService.getFilePreview(matchingPost.featuredImage);
    //                     setPost({ ...matchingPost, featuredImagePreview: previewUrl });
    //                 } else {
    //                     console.warn("No matching post found.");
    //                     navigate("/");
    //                 }
    //             } else {
    //                 console.warn("No posts found for the user.");
    //                 navigate("/");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //             navigate("/");
    //         }
    //     };

    //     fetchPosts();
    // }, [slug, userData, navigate]);

    // useEffect(() => {
    //     if (!userData?.$id) {
    //         console.warn("User is not logged in.");
    //         navigate("/"); // Redirect if not logged in
    //         return;
    //     }

    //     const fetchPosts = async () => {
    //         try {
    //             console.log("Fetching posts for user:", userData.$id);
    //             const response = await appwriteService.getPosts(userData.$id);

    //             console.log("Response from getPosts:", response); // Debugging

    //             if (!response || !response.documents || response.documents.length === 0) {
    //                 console.warn("No posts found for the user.");
    //                 navigate("/");
    //                 return;
    //             }

    //             // FIX: Search inside response.documents (not response)
    //             const matchingPost = response.documents.find((doc) => doc.title === slug);

    //             if (matchingPost) {
    //                 const previewUrl = await appwriteService.getFilePreview(matchingPost.featuredImage);
    //                 setPost({ ...matchingPost, featuredImagePreview: previewUrl });
    //             } else {
    //                 console.warn("No matching post found.");
    //                 navigate("/");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //             navigate("/");
    //         }
    //     };

    //     fetchPosts();
    // }, [slug, userData, navigate]);

    useEffect(() => {
        if (!userData?.$id) {
            console.warn("User is not logged in.");
            navigate("/"); // Redirect if not logged in
            return;
        }

        const fetchPosts = async () => {
            try {
                console.log("Fetching posts for user:", userData.$id);
                const response = await appwriteService.getPosts(userData.$id); // Pass only the ID

                console.log("Response from getPosts:", response); // Debugging

                if (!response || !response.documents || response.documents.length === 0) {
                    console.warn("No posts found for the user.");
                    navigate("/");
                    return;
                }

                // FIX: Search inside response.documents (not response)
                // doc.title.toLowerCase() === slug.toLowerCase 
                const matchingPost = response.documents.find((doc) => doc.title.trim().toLowerCase() === decodeURIComponent(slug.trim().toLowerCase()));
                console.log("matchingPost :", matchingPost);


                if (matchingPost) {
                    const previewUrl = await appwriteService.getFilePreview(matchingPost.featuredImage);
                    setPost({ ...matchingPost, featuredImagePreview: previewUrl });
                } else {
                    console.warn("No matching post found.");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                navigate("/");
            }
        };

        fetchPosts();
    }, [slug, userData?.$id, navigate]);  // Ensure dependencies are correct



    if (!post) return <div>Loading...</div>;

    const isAuthor = post.user === userData.$id;

    return (
        <div className="py-8">
            <container>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 p-4 border rounded-xl bg-gray-500 shadow-lg relative ">
                    <div className="shadow-2xl hover:border-2 hover:border-white rounded-xl ">
                    <img src={post.featuredImagePreview} alt={post.title || "Post Image"} className="  object-cover h-96  rounded-xl shadow-md" />
                    </div>
                    
                    {/* <div class="h-16 w-36  bg-blue-400 opacity-20 ..."></div> */}
                    <div className=" text-black flex w-2/3 justify-center my-24 mr-8 ml-8 bg-slate-50 rounded-lg font-bold shadow-2xl hover:border-2 hover:border-black cursor-pointer" >
                        <p class=" overflow-hidden text-clip text-xl w-auto pl-4 ml-2 m-3 py-3 font : italic">{post.content} </p>
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 " className="mr-3 hover:border-2 hover:border-x-2">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="hover:border-2 hover:border-x-2" onClick={() => appwriteService.deletePost(post.$id).then(() => navigate("/"))}>Delete</Button>
                        </div>
                    )}
                    
                </div>
                <Button className="bg-gray-700 mt-2 font-semibold hover:border-2 hover:border-white">Scroll down to see all post ⇩⨠</Button>
            </container>
        </div>
    );
}
