'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft, FaClock, FaGlobe, FaPaperPlane, FaPlus } from 'react-icons/fa'
import { LuActivity } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5';
import api from '@/api/axiosconfig.js';

const ProjectPage = () => {
  const projectId = useParams().projectid
  const router = useRouter()
  const [project, setProject] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ method: '', path: '' })
  const [notification, setNotification] = useState(null)

  const clearNotification = () => {
    setNotification(null)
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const fetchData = async () => {
        try {
          const { data } = await api.get(`/apis/${projectId}`);
          if(data){
              setProject(data);
          }   
        
          } catch (error) {
              const message = error?.response?.data?.message || "Error fetching apis";
              setNotification({ type: "error", message });
          }
  };
    useEffect(() => {
        fetchData();

    }, []);

  const handleAddApi = async () => {
    if (!formData.method || !formData.path) {
            setNotification({ type: "error", message: "All fields are required" });
            return;
        }

        try {
            const { data } = await api.post(`/apis/${projectId}`, formData);
            setNotification({ type: "success", message: data.message || "Api added" });
            fetchData();
            setIsModalOpen(false);
            setFormData({ method: "", path: "" });
        } catch (error) {
            const msg = error?.response?.data?.message || "Error creating api";
            setNotification({ type: "error", message: msg });
        }
  }

  const handleDelete = async (id) => {
      try {
          const { data } = await api.delete(`/apis/${id}`);
          setNotification({ type: "success", message: data.message || "Deleted successfully" });
          fetchData();
      } catch (error) {
          const msg = error?.response?.data?.message || "Error deleting api";
          setNotification({ type: "error", message: msg });
      }
}

  return (
    <div className="w-full mt-10 ">
      <div className="flex justify-between px-7">
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => router.back()}>
          <FaArrowLeft />
          <span>Back to Projects</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{project?.name}</h1>
          <h2 className="text-xl text-gray-600">Environment: {project?.environment}</h2>
        </div>
        <button
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 flex items-center rounded-md shadow-2xl px-4 text-xl text-white gap-4"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
          Add New Api
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 space-y-3 mt-17 px-5 mb-8">
        <div className="shadow-lg transition-shadow bg-white p-5 rounded-md w-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-xl font-medium">Total APIs</div>
            <FaGlobe size={40} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{project?.totalApis}</div>
        </div>

        <div className="shadow-lg transition-shadow bg-white p-5 rounded-md w-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-xl font-medium">Total Requests</div>
            <LuActivity size={40} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold">{project?.totalRequests?.toLocaleString()}</div>
        </div>

        <div className="shadow-lg transition-shadow bg-white p-5 rounded-md w-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-xl font-medium">Avg Response Time</div>
            <FaClock size={40} className="text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{project?.overallAvgResponseTime}ms</div>
        </div>
      </div>

      <div className="shadow-xl  bg-white my-13 pb-12 max-w-[1150px] mx-auto  rounded-md w-full ">
        <div className="flex flex-col items-center w-full py-8 px-4 lg:px-13 justify-center gap-5">
          <div className="text-2xl font-bold">APIs</div>
          <div className="text-lg">All APIs registered in this project</div>
        </div>

        <div className="px-6 flex justify-center">
          <div className="w-full max-w-3xl space-y-4">
            
            {project?.apis?.map((api) => (
              <div
                key={api.id}
                className="relative bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => handleDelete(api.id)}
                  className="absolute top-2 left-3 cursor-pointer"
                  aria-label="Delete API"
                >
                  <IoClose size={20} className="text-red-500 hover:text-red-700" />
                </button>

                <div className="flex justify-between items-center mb-2 mt-5">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded-md text-sm">
                      {api.method}
                    </span>
                    <span className="text-gray-700 font-mono text-sm">{api.path}</span>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/api/${api.id}`)
                    }
                    className="text-blue-600 cursor-pointer flex gap-2 hover:text-blue-800"
                    aria-label="View API"
                  >
                    Go to Api
                    <FaPaperPlane size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mt-5">
                  <div>
                    <span className="font-medium">{api.totalRequests}</span> requests
                  </div>
                  <div>
                    <span className="font-medium">{api.avgResponseTime}ms</span> avg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800">New Api</h3>
                <p className="text-zinc-500 text-sm">Enter api details to create</p>
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
                <label htmlFor="method" className="block text-sm font-medium text-zinc-700 mb-1">
                  Method
                </label>
                <input
                  type="text"
                  id="method"
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  placeholder="e.g. GET"
                  required
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="path" className="block text-sm font-medium text-zinc-700 mb-1">
                  Path
                </label>
                <input
                  type="text"
                  id="path"
                  name="path"
                  value={formData.path}
                  onChange={handleInputChange}
                  placeholder="e.g. /api/users"
                  required
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </form>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleAddApi}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                Create Api
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg max-w-sm z-50 ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-800'
              : 'bg-red-100 border border-red-400 text-red-800'
          }`}
          role={notification.type === 'error' ? 'alert' : 'status'}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={clearNotification}
              className={`ml-4 text-xl font-semibold leading-none ${
                notification.type === 'success'
                  ? 'text-green-800 hover:text-green-900'
                  : 'text-red-800 hover:text-red-900'
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

export default ProjectPage
