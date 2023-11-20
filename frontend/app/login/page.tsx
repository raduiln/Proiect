"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUserDetails } from "@/utils/globalFunctions";
import { login } from "../api";
import Cookies from 'js-cookie';
import { FormEvent } from 'react'


const Login =  () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                username: username,
                password: password
            }
            const responseData = await login(data);
        
            Cookies.set('access_token', responseData.access_token);

            const userDetails = await getUserDetails();

            switch (userDetails.role) {
                case 'STUDENT':
                    router.push('/elevi/note');
                    break;
                case 'TEACHER':
                    router.push('/profesori/note');
                    break;
                case 'ADMIN':
                    router.push('/admin');
                    break;
                default:
                    router.push('/');
            }
        } catch (error) {
            console.error(error);
        }   
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-extrabold text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                id="username"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white p-2 w-full rounded-md hover:bg-indigo-700"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

