"use client";

import React, { useState, useEffect } from 'react';
import { addUser, fetchUsers, fetchClasses, deleteUser } from '../../api';
import Sidebar from '../../sidebar';

const AddUserPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [users, setUsers] = useState([]);
    const [phone, setphone] = useState('');
    const [role, setRole] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };

        getUsers();
    }, []);

    useEffect(() => {
        const getClasses = async () => {
            const classes = await fetchClasses();
            setClasses(classes);
        };

        getClasses();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addUser({ username, password, email, name, surname, phone, role, classId: role === 'STUDENT' ? selectedClass : null });
        setUsername('');
        setPassword('');
        setEmail('');
        setName('');
        setSurname('');
        setphone('');
        setRole('');
        // Fetch users again after adding a new one
        const users = await fetchUsers();
        setUsers(users);
    };

    const handleDelete = async (id: number) => {
        await deleteUser(id);
        const users = await fetchUsers();
        setUsers(users);
    }

    return (
        <div className={`flex`}>
            <Sidebar role='ADMIN' />
            <div className='p-6 w-4/5'>
                <div className='p-6 bg-white rounded-xl shadow-md'>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Adauga Utilozator</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className='flex'>
                            <div className='pr-4'>
                                <div className='pt-4'>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className='pt-4'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parola:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className='pt-4'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='pl-4 pr-4'>
                                <div className='pt-4'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nume:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className='pt-4'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenume:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="text"
                                        id="surname"
                                        value={surname}
                                        onChange={(event) => setSurname(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className='pt-4'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon:</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        type="text"
                                        id="phone"
                                        value={phone}
                                        onChange={(event) => setphone(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='pl-4'>
                                <div className='pt-4'>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol:</label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        id="role"
                                        value={role}
                                        onChange={(event) => setRole(event.target.value)}
                                        required
                                    >
                                        <option value="">Selecteaza rolul</option>
                                        <option value="STUDENT">Student</option>
                                        <option value="TEACHER">Profesor</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                                {role === 'STUDENT' && (
                                    <div className='pt-4'>
                                        <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Clasa:</label>
                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            id="class"
                                            value={selectedClass}
                                            onChange={(event) => setSelectedClass(event.target.value)}
                                            required
                                        >
                                            <option value="">Selecteaza clasa</option>
                                            {classes.map((clasa) => (
                                                <option key={clasa.id} value={clasa.id}>{clasa.name}</option>
                                            ))}
                                        </select>
                                    </div>)}
                            </div>
                        </div>
                        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Add User</button>
                    </form>
                </div>
                <div className='pt-9'>
                    <h2 className='w-full bg-slate-500 p-3 text-slate-200'>All Users</h2>
                    <table className='min-w-full text-left text-sm'>
                        <thead className='border-b font-medium border-neutral-400'>
                            <tr>
                                <th scope='col' className='px-6 py-4' >Username</th>
                                <th scope='col' className='px-6 py-4' >Email</th>
                                <th scope='col' className='px-6 py-4' >Rol</th>
                                <th scope='col' className='px-6 py-4' >Actions</th>
                                {/* <th scope='col' className='px-6 py-4' >Clasa</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr className='border-b border-neutral-400' key={user.id}>
                                    <td className='whitespace-nowrap px-6 py-4'>{user.username}</td>
                                    <td className='whitespace-nowrap px-6 py-4'>{user.email}</td>
                                    <td className='whitespace-nowrap px-6 py-4'>{user.role}</td>
                                    <td className='whitespace-nowrap px-6 py-4'>
                                    <button className='text-red-500' onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                    {/* <td className='whitespace-nowrap px-6 py-4'>{user.class}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddUserPage;
