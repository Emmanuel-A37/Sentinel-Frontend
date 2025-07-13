'use client';
import { FaCopy, FaGlobe, FaPaperPlane, FaPlus } from 'react-icons/fa';
import { LuActivity } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import api from '@/api/axiosconfig.js';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({method : "", path : ""});

    const [notification, setNotification] = useState(null);
    
    const clearNotification = () => {
        setNotification(null);
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                clearNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name] : value});
  }

  const fetchData = async () => {
       try {
          const { data } = await api.get('/projects');
          if(data){
             setProjects(data);
          }   
        
          } catch (error) {
              const message = error?.response?.data?.message || "Error fetching projects";
              setNotification({ type: "error", message });
          }
  };
    useEffect(() => {
        fetchData();

    }, []);

    const handleCopy = (e, apiKey) => {
        e.preventDefault();
            navigator.clipboard.writeText(apiKey);
            setNotification({type : "success", message : "Copied Api Key"});
        };

    const handleAddProject = async () => {
        if (!formData.name || !formData.environment) {
            setNotification({ type: "error", message: "All fields are required" });
            return;
        }

        try {
            const { data } = await api.post('/projects', formData);
            setNotification({ type: "success", message: data.message || "Project added" });
            setProjects(prev => [...prev, data]); 
            setIsModalOpen(false);
            setFormData({ name: "", environment: "" });
        } catch (error) {
            const msg = error?.response?.data?.message || "Error creating project";
            setNotification({ type: "error", message: msg });
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await api.delete(`/projects/${id}`);
            setNotification({ type: "success", message: data.message || "Deleted successfully" });
            fetchData();
        } catch (error) {
            const msg = error?.response?.data?.message || "Error deleting project";
            setNotification({ type: "error", message: msg });
        }
    };


  return (
    <div className='w-full mt-10 '>
        <div className='flex justify-between px-7'>
            <div>
                <h1 className="text-4xl font-bold text-gray-900" >Projects</h1>
                <h2 className="text-xl  text-gray-600">Manage your API monitoring projects</h2>
            </div>
            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 flex items-center rounded-md shadow-2xl px-4 text-xl text-white gap-4"  onClick={() => setIsModalOpen(true)}>
                <FaPlus />
                New Project
            </button>
        </div>
        {
            projects?.length === 0 && (
                <div className='w-full mt-50 flex items-center justify-center'>
                    <h3 className='font-extrabold text-3xl'>Add a project , <span className='text-blue-400'>need help? Go to the help section.</span></h3>
                </div>
            )
        }
        <div className='grid lg:grid-cols-3 mt-18  grid-cols-1  px-5 space-y-5 space-x-3'>
            {
                projects?.map((project) => (
                    <div key={project.id} >
                        <div className="shadow-lg transition-shadow  bg-white p-5 rounded-md w-full  ">
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl">Project Name: {project.name}</h3>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    aria-label="Close"
                                    className="cursor-pointer text-red-600"
                                    >
                                    <IoClose className="w-6 h-6" />
                                </button>
                            </div>
                            <div className='text-xl my-2'>
                            Environment: <span className="font-medium">{project.environment}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                   <span className='text-lg font-semibold'>Api key :</span> <span className="text-base font-mono text-gray-600">{project.apiKey}</span>
                                </div>
                                <FaCopy size={22} className='text-blue-500 cursor-pointer' onClick={(e) => handleCopy(e, project.apiKey)}/>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center space-x-2">
                                    <FaGlobe size={38} className=" text-blue-600" />
                                    <div>
                                        <div className="text-lg font-medium">{project.apiCount || 0}</div>
                                        <div className="text-base text-gray-500">APIs</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <LuActivity size={38} className=" text-green-600" />
                                    <div>
                                        <div className="text-lg font-medium">{project.totalRequests || 0}</div>
                                        <div className="text-base text-gray-500">Requests</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <Link href={`/project/${project.id}`}>
                                        <FaPaperPlane size={38} className=" text-blue-600" />
                                        <div className="text-lg font-medium">To Project</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
                ))
            }
        </div>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
                <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <div>
                    <h3 className="text-xl font-semibold text-zinc-800">New Project</h3>
                    <p className="text-zinc-500 text-sm">Enter project details to create</p>
                    </div>
                    <button
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close"
                    className="cursor-pointer text-gray-600"
                    >
                    <IoClose className="w-6 h-6" />
                    </button>
                </div>

                <form className="space-y-4">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sentinel Project"
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>

                    <div>
                    <label htmlFor="environment" className="block text-sm font-medium text-zinc-700 mb-1">
                        Environment
                    </label>
                    <input
                        type="text"
                        id="environment"
                        name="environment"
                        value={formData.environment}
                        onChange={handleInputChange}
                        placeholder="e.g. production"
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>
                </form>

                <div className="mt-6 flex justify-end">
                    <button
                    type="button"
                    onClick={handleAddProject}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-2 rounded-md text-sm font-medium"
                    >
                    Create Project
                    </button>
                </div>
                </div>
            </div>
            )}

        {notification && (
            <div
                className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg max-w-sm z-50 ${notification.type === "success"
                    ? "bg-green-100 border border-green-400 text-green-800"
                    : "bg-red-100 border border-red-400 text-red-800"
                    }`}
                role={notification.type === "error" ? "alert" : "status"}
            >
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <button
                        onClick={clearNotification}
                        className={`ml-4 text-xl font-semibold leading-none ${notification.type === "success"
                            ? "text-green-800 hover:text-green-900"
                            : "text-red-800 hover:text-red-900"
                            } focus:outline-none`}
                        aria-label="Close notification"
                    >
                        &times;
                    </button>
                </div>
            </div>
        )}

    </div>
  )
}

export default HomePage