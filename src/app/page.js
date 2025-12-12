import { BsShield } from "react-icons/bs";
import { FiZap } from "react-icons/fi";
import { FaCode, FaPython, FaNodeJs } from "react-icons/fa";
import { SiPython, SiJavascript } from "react-icons/si";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-100 to-white">

      <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <BsShield className="text-blue-700" size={32} />
          <h1 className="text-gray-900 font-bold text-3xl">Sentinel</h1>
        </div>
        <div className="space-x-13 ">
        <Link href="/login">
          <button className="bg-gray-200 text-blue-600 hover:bg-blue-300 hover:text-gray-50 cursor-pointer  text-xl px-6 py-2 rounded-md shadow-lg transition duration-200">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-600 hover:text-blue-300 hover:bg-gray-50 cursor-pointer text-white text-xl px-6 py-2 rounded-md shadow-lg transition duration-200">
            Get Started
          </button>
        </Link>
        </div>
      </header>


      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Track Every API Request <span className="text-blue-600">With Precision</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sentinel provides real-time monitoring and analytics for your APIs. Get insights into performance, track
          errors, and optimize your endpoints effortlessly.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="rounded-md shadow-2xl bg-white">
            <div className="p-8 text-center">
              <FiZap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Real-time Monitoring</h3>
              <p className="text-gray-600 text-lg">
                Monitor your API requests in real-time with detailed analytics and performance metrics.
              </p>
            </div>
          </div>

          <div className="rounded-md shadow-2xl bg-white">
            <div className="p-8 text-center">
              <FaCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Easy Integration</h3>
              <p className="text-gray-600 text-lg">
                Simple package installation with minimal configuration. Available for Node.js and Python.
              </p>
            </div>
          </div>

          <div className="rounded-md shadow-2xl bg-white">
            <div className="p-8 text-center">
              <BsShield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 text-lg">
                Enterprise-grade security with reliable uptime monitoring for your critical APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Quick Installation</h2>
        <p className="text-center text-gray-600 mb-12">Choose your stack and get started in seconds</p>
        

        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaNodeJs className="text-green-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Node.js / Express</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-2xl rounded-md p-6">
              <h3 className="text-xl font-semibold mb-4">1. Install the Package</h3>
              <div className="bg-gray-900 text-lg text-green-400 p-4 rounded-lg font-mono w-full overflow-x-auto">
                npm install @emmanuel_a37/sentinel
              </div>
            </div>

            <div className="bg-white shadow-2xl rounded-md p-6">
              <h3 className="text-xl font-semibold mb-4">2. Initialize in Your App</h3>
              <div className="bg-gray-900 text-blue-300 p-4 rounded-lg font-mono text-sm w-full overflow-x-auto">
                <div className="text-purple-400">const</div> sentinelLogger{" "}
                <div className="text-purple-400">= require</div>
                <span className="text-green-300">('@emmanuel_a37/sentinel')</span>
                <br />
                <br />
                app.<span className="text-purple-400">use</span>(
                <span className="text-blue-300">sentinelLogger</span>
                {`({`}
                <br />
                &nbsp;&nbsp;apiKey: <span className="text-green-300">'your-api-key'</span>
                <br />
                {`})`});
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <SiPython className="text-blue-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Python (Flask / Django / FastAPI)</h3>
          </div>
          

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white shadow-2xl rounded-md p-6">
              <h3 className="text-xl font-semibold mb-4">1. Install via pip</h3>
              <div className="bg-gray-900 text-lg text-green-400 p-4 rounded-lg font-mono w-full overflow-x-auto">
                pip install sentinel-logger
              </div>
            </div>

            <div className="bg-white shadow-2xl rounded-md p-6">
              <h3 className="text-xl font-semibold mb-4">2. Flask Setup</h3>
              <div className="bg-gray-900 text-blue-300 p-4 rounded-lg font-mono text-sm w-full overflow-x-auto">
                <div className="text-purple-400">from</div> sentinel_logger{" "}
                <div className="text-purple-400">import</div> SentinelLogger
                <br />
                <br />
                app.wsgi_app = <span className="text-blue-300">SentinelLogger</span>(
                <br />
                &nbsp;&nbsp;app.wsgi_app,
                <br />
                &nbsp;&nbsp;api_key=<span className="text-green-300">'your-key'</span>
                <br />
                )
              </div>
            </div>
          </div>

          <div className="bg-white shadow-2xl rounded-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">FastAPI Setup (ASGI)</h3>
            <div className="bg-gray-900 text-blue-300 p-4 rounded-lg font-mono text-sm w-full overflow-x-auto">
              <div className="text-purple-400">from</div> sentinel_logger{" "}
              <div className="text-purple-400">import</div> SentinelLoggerASGI
              <br />
              <br />
              app = <span className="text-blue-300">SentinelLoggerASGI</span>(
              <br />
              &nbsp;&nbsp;app,
              <br />
              &nbsp;&nbsp;api_key=<span className="text-green-300">'your-key'</span>
              <br />
              )
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Supported Frameworks</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-3">
                <SiJavascript className="text-yellow-500" size={20} />
                <h4 className="font-semibold text-gray-900">JavaScript / Node.js</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Express.js</li>
                <li>✓ Koa</li>
                <li>✓ Fastify</li>
                <li>✓ Any Node.js framework</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-3">
                <SiPython className="text-blue-600" size={20} />
                <h4 className="font-semibold text-gray-900">Python</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Flask (WSGI)</li>
                <li>✓ Django (WSGI)</li>
                <li>✓ FastAPI (ASGI)</li>
                <li>✓ Starlette, Quart, Bottle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BsShield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">Sentinel</span>
          </div>
          <p className="text-gray-400 mb-2">© 2025 Sentinel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}