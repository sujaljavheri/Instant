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


async getFilePreview(fileId) {
    try {
        const previewUrl = await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
        console.log("Generated preview URL:", previewUrl); 
        return previewUrl; 
    } catch (error) {
        console.error("Appwrite server::getFilePreview::error", error);
        console.log("i am here in getFilePreview");
        return null; 
    }
}









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