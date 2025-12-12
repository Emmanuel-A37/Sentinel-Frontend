'use client';
import React from 'react';
import TopBar from '@/components/TopBar';
import Link from 'next/link';

const Help = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-100 to-white">
      <TopBar />
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">Getting Started with Sentinel</h1>

        {/* Step 1 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Step 1: Creating Your First Project</h2>
          <p className="text-gray-700 mb-6">
            Projects help you organize and monitor different applications or services.
          </p>
          <div className="space-y-4 ">
            {[
              'Navigate to your dashboard and click the "New Project" button.',
              'Enter your project name and environment (production, staging, or development).',
              'Once created, you\'ll receive a unique API key. You\'ll need this for integration.',
            ].map((text, index) => (
              <div className="flex items-start space-x-4" key={index}>
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-800">
                💡 <span className="font-semibold">Tip:</span> Create separate projects for different environments (dev, staging, prod) to keep your monitoring organized.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Step 2: Adding APIs to Monitor</h2>
          <p className="text-gray-700 mb-6">Register the API endpoints you want to track and monitor.</p>
          <div className="space-y-4">
            {[
              'Click on your project from the dashboard to view its details.',
              'Use the "Add New API" button to register a new endpoint.',
              'Specify the HTTP method (GET, POST, PUT, DELETE) and the endpoint path.',
            ].map((text, index) => (
              <div className="flex items-start space-x-4" key={index}>
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-medium mb-2 text-gray-800">Example API Endpoints:</p>
              <pre className="bg-white p-4 rounded-lg text-sm font-mono text-gray-800">
                  GET    /api/v1/users
                  POST   /api/v1/orders
                  PUT    /api/v1/products/:id
              </pre>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Step 3: Backend Integration</h2>
          <p className="text-gray-700 mb-6">
            Connect Sentinel to your backend to start tracking requests automatically. Choose your language and framework below.
          </p>

          {/* Node.js/Express */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">Node.js</span>
              Express / Koa / Fastify
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Installation</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">npm install @emmanuel_a37/sentinel</pre>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Integration</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
{`const express = require('express');
const sentinelLogger = require('@emmanuel_a37/sentinel');

const app = express();

app.use(express.json());

// Add Sentinel middleware
app.use(
  sentinelLogger({
    apiKey: 'your-api-key-here',
  })
);

app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsersFromDB();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
              </pre>
            </div>
          </div>

          {/* Python Flask */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">Python</span>
              Flask (WSGI)
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Installation</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">pip install sentinel-logger</pre>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Integration</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
{`from flask import Flask
from sentinel_logger import SentinelLogger

app = Flask(__name__)

# Wrap your WSGI app with Sentinel
app.wsgi_app = SentinelLogger(
    app.wsgi_app,
    api_key='your-api-key-here'
)

@app.route('/api/users')
def get_users():
    users = get_users_from_db()
    return {'users': users}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}
              </pre>
            </div>
          </div>

          {/* Python Django */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">Python</span>
              Django (WSGI)
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Installation</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">pip install sentinel-logger</pre>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Add to settings.py</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
{`MIDDLEWARE = [
    'sentinel_logger.django.SentinelMiddleware',  # Add this first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware
]

# Add these settings
SENTINEL_API_KEY = 'your-api-key-here'
`}
              </pre>
            </div>
          </div>


          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">Python</span>
              FastAPI / Starlette (ASGI)
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Installation</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">pip install sentinel-logger</pre>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Integration</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
{`from fastapi import FastAPI
from sentinel_logger import SentinelLoggerASGI

app = FastAPI()

# Wrap your ASGI app with Sentinel
app = SentinelLoggerASGI(
    app,
    api_key='your-api-key-here'
)

@app.get('/api/users')
async def get_users():
    users = await get_users_from_db()
    return {'users': users}

# Run with: uvicorn main:app --reload`}
              </pre>
            </div>
          </div>

        
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Best Practices</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Use environment-specific projects</li>
            <li>{`Use meaningful API paths (e.g., /api/v1/users/{id})`}</li>
            <li>Monitor full response time, from request start to finish</li>
          </ul>
        </section>

  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Troubleshooting</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-red-600 font-semibold">Requests not appearing in dashboard</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                <li>Check that your API key is correct</li>
                <li>Ensure the API endpoint is registered</li>
                <li>Check network connectivity</li>
              </ul>
            </div>           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;
