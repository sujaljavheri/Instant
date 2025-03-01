import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, $createdAt }) {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Fetch the image preview URL if featuredImage is provided
        if (featuredImage) {
            appwriteservice
                .getFilePreview(featuredImage)
                .then((url) => setImagePreview(url))
                .catch((error) => {
                    console.error('Error fetching image preview:', error);
                    setImagePreview('/placeholder.png'); // Fallback image in case of error
                });
        } else {
            setImagePreview('/placeholder.png'); // Fallback image for no featuredImage
        }
    }, [featuredImage]);

    const date = new Date($createdAt);
    // Format as Month Day Year
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);


    return (
        // <Link to={`/post/${$id}`}>
        //     <div className="w-full bg-gray-100 rounded-xl py-4">
        //         <div className="w-full justify-center mb-4">
        //             {imagePreview ? (
        //                 <img
        //                     src={imagePreview}
        //                     alt={title}
        //                     className="rounded-xl"
        //                 />
        //             ) : (
        //                 <div>Loading...</div> // Optional loading state
        //             )}
        //         </div>
        //         <h2 className="text-xl font-bold">{title}</h2>
        //     </div>
        // </Link>

        <Link to={`/post/${$id}`} className="w-[300px] h-[400px]">
            <div className="w-full h-full bg-gray-100 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-2 hover:border-black ml-0">Date : {formattedDate}

                {/* Image Container */}
                <div className="w-full h-[250px] rounded-xl overflow-hidden ">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt={title}
                            className="w-full h-full object-cover rounded-xl hover:border-2 hover:border-black"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Loading...
                        </div> // Optional loading state
                    )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center mt-4">{title}</h2>
            </div>
        </Link>

    );
}

export default PostCard;
