// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
// import {container, PostCard} from '../components/index'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])

//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </container>
//         </div>
//     )
// }

// export default Home

import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { container, PostCard, Frame, Frame2,Typewriter } from "../components/index";
import { useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";


function AnimatedBall() {
    const ballRef = useRef(null);

    useEffect(() => {
        gsap.to(ballRef.current, { x: 500, duration: 2, repeat: -1, yoyo: true });
    }, []);

    return <div ref={ballRef} className="w-16 h-16 bg-black rounded-full"></div>;

}

function Home() {
    const [posts, setPosts] = useState([]); // Ensure the default state is an empty array



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                setPosts(response?.documents || []); // Ensure it's always an array
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]); // Fallback to an empty array in case of an error
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%]  motion-blur-in-[10px] motion-delay-[0.38s]/scale motion-duration-[0.38s]/opacity motion-duration-[1.20s]/rotate motion-duration-[0.15s]/blur motion-delay-[0.60s]/blur motion-ease-spring-bouncier">
                            <h1 className="text-5xl font-bold text-black cursor-pointer  ">
                                "Wellcome to Instant "
                            </h1>

                            <h1 className="motion-preset-seesaw text-5xl mt-2">🐦‍🔥🔥🐦‍🔥</h1>
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <Frame className="mt-10 w-1/2" />
                        </div>
                        <div className="mt-0 flex justify-end items-center h-[60vh] w-full">
                        <img
                                className=" w-[300px] h-[300px]"
                                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd4MmNiYTZ5OWg3bDZneG51NmY5d2F6NDc1a2J3ZHV2a2lvcHBqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H96ocZHSpu4mWCnlaw/giphy.gif"
                                alt="Animated Sticker"
                            />
                        </div> */}





                        
                        <div className="flex  w-full ">
                            {/* Frame remains in the same position */}
                            <Frame className="  flex justify-start w-1/2" />
                            {/* Image on the right with margin-right */}
                            <img className="w-[200px] h-[200px] mt-56 mr-24 " src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjN6eHp6eGg1eTc2eDZrbG1qZ3lucDZpeDFxa3E1ZWFvY2k2YmlzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/6G9CO87NIWAaVdtA7K/giphy.gif"></img>
                            
                            <img
                                className="w-[300px] h-[300px] mr-28 mt-20"
                                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd4MmNiYTZ5OWg3bDZneG51NmY5d2F6NDc1a2J3ZHV2a2lvcHBqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H96ocZHSpu4mWCnlaw/giphy.gif"
                                alt="Animated Sticker"
                            />
                            
                        </div>



                    </div>

                    <div className="flex mb-5 mr-4">
                        <img
                            className="w-[300px] h-[300px] ml-28 mt-20"
                            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTVtZ3B2dHFkaWp1aGlxNGNoYmpuM2tiY2pxcGtzcXJxZGRidWs5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fGFKUlrGTf3Hl8Mqsq/giphy.gif"
                            alt="Animated Sticker"
                        />
                        <img
                        className="w-[120px] h-[120px] ml-0 mt-60"
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdncwNWh4ampvZXFndm1jZHZvYWxyZ3QwdDk4cmZnOWgwYnprYWhiMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/dzOEK6rZ8uGKAcY8dN/giphy.gif">
                        
                        </img>

                        <Frame2 />
                    </div>

                    
                    <div className="flex justify-center items-center bg-white rounded-2xl w-3/5 ml-72 h-20 mt-36">
                    <h1 className="text-3xl text-slate-700 font-bold motion-preset-typewriter-[42] motion-duration-[8s] "> 
                        <p>Connect With Your Digital Dairy Instant‼️</p>
                        <p className="motion-preset-seesaw">📗📗</p>
                        </h1> 
                    
                    {/* <Typewriter/> */}
                    </div>
                    

                </container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </container>
        </div>
    );
}

export default Home;
export { AnimatedBall };
