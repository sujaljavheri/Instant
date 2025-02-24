// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "../index";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadfile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await appwriteService.uploadfile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 // const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
//                 const dbPost = await appwriteService.createPost({
//                     title: data.title,
//                     slug: data.slug,
//                     content: data.content,  // This is HTML from the RTE
//                     featuredImage: fileId,
//                     status: data.status,
//                     userId: userData.$id,
//                 });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues('slug') } />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-10"
//                      {...register("status", { required: true })}
//                 />

//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className=" mt-10 w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );

// }

// import React,{useEffect} from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Button, Input, Select } from "../index";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Editor } from "@tinymce/tinymce-react";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.slug || "",
//             content: post?.content || "", // Ensuring content remains
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);
//     const title = watch("title");

//     useEffect(() => {
//         if (title) {
//             const slug = title
//                 .toLowerCase()
//                 .replace(/[^a-z0-9\s]/g, "") // Remove special chars
//                 .trim()
//                 .replace(/\s+/g, "-"); // Replace spaces with "-"
//             setValue("slug", slug, { shouldValidate: true });
//         }
//     }, [title, setValue]);

//     const submit = async (data) => {
//         console.log("Form Data Before Submission:", data);
//         data.content = data.content.replace(/^[a-zA-Z\d\s]<p>|<\/p>$/g, "-"); 

//         if (!data.content || data.content.trim() === "") {
//             alert("Content is empty! Please add some content before submitting.");
//             return;
//         }

//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadfile(data.image[0]) : null;
//             if (file) {
//                 await appwriteService.deleteFile(post.featuredImage);
//             }
//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : post.featuredImage,
//             });
//             if (dbPost) navigate(`/post/${dbPost.$id}`);
//         } else {
//             const file = await appwriteService.uploadfile(data.image[0]);
//             if (file) {
//                 data.featuredImage = file.$id;
//                 const dbPost = await appwriteService.createPost({
//                     title: data.title,
//                     slug: data.slug,
//                     content: data.content,
//                     featuredImage: file.$id,
//                     status: data.status,
//                     userId: userData.$id,
//                 });
//                 if (dbPost) navigate(`/post/${dbPost.$id}`);
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 {/* <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                 /> */}

//                 {/* ✅ TinyMCE Editor with Corrected Focus Handling */}
//                 <Controller
//                     name="content"
//                     control={control}
//                     defaultValue={post?.content || ""}
//                     rules={{ required: "Content is required!" }}
//                     render={({ field }) => (
//                         <Editor
//                             apiKey="ndtnwezczdj7q7fbcc0ymue993yzbw2fgg3614acvtrt6t5m"
//                             value={field.value}
//                             init={{
//                                 height: 300,
//                                 menubar: false,
//                                 plugins: "lists link image",
//                                 toolbar: "bold italic | alignleft aligncenter alignright",
//                             }}
//                             onEditorChange={(newContent) => {
//                                 field.onChange(newContent);
//                                 setValue("content", newContent, { shouldValidate: true });
//                             }}
//                             onInit={(evt, editor) => {
//                                 field.ref = {
//                                     focus: () => editor.focus(), // ✅ Manually override focus method
//                                 };
//                             }}
//                         />
//                     )}
//                 />
//             </div>

//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-10"
//                     {...register("status", { required: true })}
//                 />

//                 <Button type="submit" className="mt-10 w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }


import React,{useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { ID } from "appwrite";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "", // Ensuring content remains
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const title = watch("title");

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-bold">Loading user data...</p>
            </div>
        );
    }

    useEffect(() => {
        console.log("Updated User Data from Redux:", userData);
    }, [userData]);

    useEffect(() => {
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "") // Remove special chars
                .trim()
                .replace(/\s+/g, "-"); // Replace spaces with "-"
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [title, setValue]);

    const submit = async (data) => {
         console.log("✅ Submit button clicked!");
        console.log("Form Data Before Submission:", data);
        data.content = data.content.replace(/^[a-zA-Z\d\s]<p>|<\/p>$/g, "-"); 

        if (!data.content || data.content.trim() === "") {
             console.log("✅ Empty content!");
            alert("Content is empty! Please add some content before submitting.");
            return;
        }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadfile(data.image[0]) : null;
            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await appwriteService.uploadfile(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                if (userData && userData.$id) {
                    data.userId = userData.$id;
                } else {
                    console.error("User data is not available");
                    alert("Error: User data is missing! Please log in again.");
                    return;
                }
                // data.userId = userData.$id; // this kind of both instruction should be added outside then sent to the createpost
                const dbPost = await appwriteService.createPost({
                    // documentId: ID.unique(),
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredImage: file.$id,
                    status: data.status,
                    userId: userData.$id,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {/* <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                /> */}

                {/* ✅ TinyMCE Editor with Corrected Focus Handling */}
                <Controller
                    name="content"
                    control={control}
                    defaultValue={post?.content || ""}
                    rules={{ required: "Content is required!" }}
                    render={({ field }) => (
                        <Editor
                            apiKey="ndtnwezczdj7q7fbcc0ymue993yzbw2fgg3614acvtrt6t5m"
                            value={field.value}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: "lists link image",
                                toolbar: "bold italic | alignleft aligncenter alignright",
                            }}
                            onEditorChange={(newContent) => {
                                field.onChange(newContent);
                                setValue("content", newContent, { shouldValidate: true });
                            }}
                            onInit={(evt, editor) => {
                                field.ref = {
                                    focus: () => editor.focus(), // ✅ Manually override focus method
                                };
                            }}
                        />
                    )}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-10"
                    {...register("status", { required: true })}
                />

                <Button type="submit" className="mt-10 w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
