import conf from '../conf/conf.js';
import { Client, ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases =new  Databases(this.client);
        this.bucket = new Storage(this.client);   
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    user: userId,
                }
            )
        } catch (error) {
            console.log("i am here in cretePost");
            console.log("Appwrite service :: createPost:: error: ",error);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost:: error: ",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

            return true
            
        } catch (error) {
            console.log("Appwrite service :: deletePost:: error");
            return false
            
        }
    }

    async getDocument({}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.log("i am here in getDocument");
            console.log("Appwrite service:: getDocument:: error",error);
            
        }
    }
    // list all documents
  
    // async getPosts(){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             [
    //                 Query.equal('status', 'active')
    //             ],
    //         )
    //     } catch (error) {
    //         console.log("i am in ");
    //         console.log("Appwrite serive :: getPosts :: error", error);
    //         return false
    //     }
    // }

    // file upload serivices

    async uploadfile(file){
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("Appwrite server::uploadfile::error", error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true;
            
        } catch (error) {
            console.log("Appwrite server::deleteFile::error", error);
            
        }
        return false;
    }

//    async getFilePreview(fileId) {
//         try {
//              return this.bucket.getFilePreview(
//                 conf.appwriteBucketId,
//                 fileId,
//             )
            
//         } catch (error) {
//             console.log("Appwrite server::getFilePreview ::error",error);
//             console.log("i am here in getFilePreview");
//         }
//     }

// async getFilePreview(fileId) {
//     try {
//         const previewUrl = await this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         );
//         return previewUrl.href; // Ensure it returns the proper URL
//     } catch (error) {
//         console.error("Appwrite server::getFilePreview::error", error);
//         console.log("i am here in getFilePreview");
//         return null; // Fallback to null in case of an error
//     }
// }
async getFilePreview(fileId) {
    try {
        const previewUrl = await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
        console.log("Generated preview URL:", previewUrl); // Debugging
        return previewUrl; // Explicitly return the resolved URL
    } catch (error) {
        console.error("Appwrite server::getFilePreview::error", error);
        console.log("i am here in getFilePreview");
        return null; // Return null to handle errors gracefully
    }
}
// async getPosts(userId) {
    
//     console.log("UserId passed to getPosts:", userId); // Debugging
//     try {
//         return await this.databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             [
//                 // Query.equal("user", userId),
//                 Query.equal("user", [userId]),
//                 Query.equal("status", "active"),
//             ]
//         );
//     } catch (error) {
//         console.log("Appwrite service :: getPosts :: error", error);
//         return false;
//     }
// }

// async getPosts(userId) {
//     if (!userId) {
//         console.log("getPosts called with no userId");
//         return false;
//     }

//     try {
//         const response = await this.databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             [
//                 // Query.equal("user", [userId]),  // Pass userId as an array
//                 Query.equal("status", ["active"])  // Pass status as an array
//             ]
//         );
        
//         console.log("Posts retrieved successfully:", response);
//         return response;
//     } catch (error) {
//         console.error("Appwrite service :: getPosts :: error", error);
//         return false;
//     }
// }

// async getPosts(userId) {
//     if (!userId) {
//         console.error("getPosts error: userId is missing or invalid");
//         return false;
//     }

//     try {
//         const response = await this.databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             [
//                 Query.equal("user", [userId]), // Ensuring only user's posts are fetched
//                 Query.equal("status", "active"),
//             ]
//         );

//         return response?.documents || [];
//     } catch (error) {
//         console.error("Appwrite service :: getPosts :: error", error);
//         return false;
//     }
// }


// async getPosts(userId) {
//     if (!userId) {
//         console.error("getPosts error: userId is missing or invalid");
//         return []; // Return an empty array instead of throwing an error
//     }

//     try {
//         const response = await this.databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             [
//                 Query.equal("user", '6797d114001a6de8f7af'), // Remove unnecessary array brackets
//                 Query.equal("status", "active"),
//             ]
//         );

//         return response?.documents || [];
//     } catch (error) {
//         console.error("Appwrite service :: getPosts :: error", error);
//         return [];
//     }
// }


async getPosts(userId) {
    if (!userId) {
        console.error("getPosts error: userId is missing or invalid", userId);
        return false;
    }
    
    try {
        return  this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [
                Query.equal("user", userId), // Ensure correct query
                Query.equal("status", "active"),
            ]
        );
    } catch (error) {
        console.error("Appwrite service :: getPosts :: error", error);
        return false;
    }
}




}





const service = new Service()
export default service