import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button , Input ,Logo} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/Auth' 
import {useForm} from 'react-hook-form'
import appwriteService from "../appwrite/config";




function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authservice.login(data);
            if (!session) throw new Error("Login failed.");

            console.log("User logged in successfully.");

            const userData = await authservice.getCurrentUser();
            if (!userData || !userData.$id) throw new Error("Failed to retrieve user data.");

            console.log("User Data:", userData);

            // Fetch only user posts
            const userPosts = await appwriteService.getPosts(userData.$id);
            console.log("User Posts:", userPosts);
            if (userPosts.length === 0) {
                console.warn("No active posts found for this user.");
            }

            dispatch(authLogin({ userData }));
            navigate("/");
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input label="Email:" placeholder="Enter your email" type="email" {...register("email", { required: "Email is required" })} />
                        <div className="relative">
                            <Input label="Password:" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password", { required: "Password is required" })} />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}






export default Login;


