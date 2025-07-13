'use client';
import {useState, useEffect} from 'react';
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import api from '@/api/axiosconfig.js';
import { io } from "socket.io-client";

let socket;

const ApiPage = () => {
    const apiId = useParams().apiId;
    const router = useRouter();
    const [stats, setStats] = useState({});
    const [pageDetails, setPageDetails] = useState({});
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const getStatusColor = (statusCode) => {
        if (statusCode >= 200 && statusCode < 300) return "bg-green-100 text-green-800"
        if (statusCode >= 400 && statusCode < 500) return "bg-yellow-100 text-yellow-800"
        if (statusCode >= 500) return "bg-red-100 text-red-800"
        return "bg-gray-100 text-gray-800"
    }
    const formatTimestamp = (timestamp) => {
        const data =  `${new Date(timestamp).toLocaleString()}.${new Date(timestamp).getMilliseconds().toString()}`;
        return data;
    }

    const [range, setRange] = useState('all');
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);

    const getStatusChartData = () => {
        return Object?.entries(stats.statusCodeCounts).map(([code, count]) => ({ code, count }));
    };

    const getFilteredTimeData = () => {
        const now = new Date();
        let cutoff;
        if (range === '1h') cutoff = new Date(now.getTime() - 60 * 60 * 1000);
        else if (range === '24h') cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        else return stats?.responseTimeOverTime?.map(d => ({ ...d, time: new Date(d.time).toLocaleTimeString() }));

        return stats?.responseTimeOverTime
            ?.filter(d => new Date(d.time) >= cutoff)
            ?.map(d => ({ ...d, time: new Date(d.time).toLocaleTimeString() }));
    };

   


    const fetchData = async () => {
        try {
            const { data } = await api.get(`/apis/api/${apiId}?page=${currentPage}`);
            if(data){
                setPageDetails(data);
                setTotalPages(data.pagination.totalPages);
            }   
        
            } catch (error) {
                const message = error?.response?.data?.message || "Error fetching apis";
                console.log("Error: ", message)
            }
    };
    useEffect(() => {
        fetchData();

    }, [currentPage]);

    const fetchStatData = async () => {
        try {
            const { data } = await api.get(`/apis/api/${apiId}/stats`);
            if(data){
                setStats(data);               
            }   
        
            } catch (error) {
                const message = error?.response?.data?.message || "Error fetching apis";
                console.log("Error: ", message)
            }
    };
    useEffect(() => {
        fetchStatData();
    }, []);

    useEffect(() => {
        socket = io("http://localhost:4000", {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("request-logged", (data) => {
            if (data.apiId === apiId) {
            fetchData();
            fetchStatData();
            }
        });

        return () => {
            socket.disconnect();
        };
        }, []);


    useEffect(() => {
        if (stats && stats.statusCodeCounts) {
            setBarData(getStatusChartData());
            setLineData(getFilteredTimeData());
        }
    }, [stats, range]);


  return (
    <div className='w-full mt-10'>
        <div className="flex items-center space-x-29 px-9 mb-8 lg:space-x-159">
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => router.back()}>
                <FaArrowLeft />
                <span>Back to Projects</span>
            </div>
            <div>
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <div  className=" text-sm">
                        {pageDetails?.method}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 ">{pageDetails?.path}</h1>
                        
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span>
                        <span className="font-medium">{stats?.totalRequests}</span> total requests
                        </span>
                        <span>
                        <span className="font-medium">{stats?.avgResponseTime}ms</span> avg response time
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6  my-10">

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Status Code Distribution</h2>
                <ResponsiveContainer width="100%" height={258}>
                    <BarChart data={barData}>
                        <XAxis dataKey="code" label={{ value: 'Status Code', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Response Time Over Time</h2>
                    <div className="space-x-2">
                        <button onClick={() => setRange('1h')} className={`px-3 py-1 text-sm rounded cursor-pointer ${range === '1h' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1h</button>
                        <button onClick={() => setRange('24h')} className={`px-3 py-1 text-sm rounded cursor-pointer ${range === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>24h</button>
                        <button onClick={() => setRange('all')} className={`px-3 py-1 text-sm rounded cursor-pointer ${range === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="responseTime" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
         <div className='shadow-lg transition-shadow mb-13 bg-white p-5 rounded-md w-full max-w-[1200px] mx-auto '>
            <div className='px-5 pt-5'>
                <div className="flex items-center justify-between">
                    <div>
                    <div className='text-3xl font-extrabold'>Recent Requests</div>
                    <div className='text-lg '>
                        Showing {currentPage}-{totalPages} of{" "}
                        {pageDetails?.pagination?.totalRequests} requests
                    </div>
                    </div>
                    <div className="flex items-center justify-center space-x-3 ">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className='flex  items-center gap-3 bg-gray-50 text-lg rounded-lg shadow-xl px-3 py-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600'
                        >
                            <FaArrowLeft className="h-4 w-4" />
                            Previous
                        </button>
                        <span className="text-lg text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                             className='flex  items-center gap-3 bg-gray-50 text-lg rounded-lg shadow-xl px-3 py-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600'
                        >
                            Next
                            <FaArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                </div>
                <div>
                <div className="p-5 mt-8">
                    <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 font-bold text-xl text-gray-900">Method</th>
                            <th className="text-left py-3 px-4 font-bold text-xl text-gray-900">Path</th>
                            <th className="text-left py-3 px-4 font-bold text-xl text-gray-900">Status Code</th>
                            <th className="text-left py-3 px-4 font-bold text-xl text-gray-900">Response Time</th>
                            <th className="text-left py-3 px-4 font-bold text-xl text-gray-900">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageDetails?.requests?.map((request) => (
                        <tr key={request.createdAt} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                            <div  className="bg-gray-100 rounded-lg shadow-xl p-2 text-center text-base w-14">
                                {pageDetails?.method}
                            </div>
                            </td>
                            <td className="py-3 px-4 text-base">{pageDetails?.path}</td>
                            <td className="py-3 px-4 flex justify-center">
                                <div className={`${getStatusColor(request.statusCode)} rounded-2xl py-2 w-14  shadow-lg text-center `}>{request.statusCode}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-base text-center">{request.responseTime.toFixed(2)}ms</td>
                            <td className="py-3 px-4 text-base text-gray-600">{formatTimestamp(request.createdAt)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
      </div>

    </div>
  )
}

export default ApiPage