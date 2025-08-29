import React, { useState } from 'react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  
  // Mock data for demonstration
  const challenges = [
    { id: 1, title: 'SQL Injection Basics', category: 'Web', difficulty: 'Easy', points: 100, active: true },
    { id: 2, title: 'Crypto 101', category: 'Crypto', difficulty: 'Easy', points: 150, active: true },
    { id: 3, title: 'Steganography Challenge', category: 'Forensics', difficulty: 'Medium', points: 200, active: false }
  ];
  
  const users = [
    { id: 1, username: 'admin', email: 'admin@example.com', isAdmin: true, joinDate: '2023-01-01' },
    { id: 2, username: 'ctf_player', email: 'player@example.com', isAdmin: false, joinDate: '2023-01-15' }
  ];
  
  const categories = [
    { id: 1, name: 'Web', description: 'Web application exploitation challenges' },
    { id: 2, name: 'Crypto', description: 'Cryptography challenges' },
    { id: 3, name: 'Forensics', description: 'Digital forensics challenges' }
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg">
        <div className="border-b border-gray-700">
          <nav className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-6 py-4 font-medium ${activeTab === 'challenges' ? 'text-cyber-primary border-b-2 border-cyber-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Challenges
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-4 font-medium ${activeTab === 'categories' ? 'text-cyber-primary border-b-2 border-cyber-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium ${activeTab === 'users' ? 'text-cyber-primary border-b-2 border-cyber-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-medium ${activeTab === 'settings' ? 'text-cyber-primary border-b-2 border-cyber-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'challenges' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Challenges</h2>
                <button className="px-4 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors">
                  Add New Challenge
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Difficulty</th>
                      <th className="py-3 px-4 text-left">Points</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges.map((challenge, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                      >
                        <td className="py-3 px-4">{challenge.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                            {challenge.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">{challenge.difficulty}</td>
                        <td className="py-3 px-4">{challenge.points}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${challenge.active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                            {challenge.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                              Edit
                            </button>
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Categories</h2>
                <button className="px-4 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors">
                  Add New Category
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <button className="px-4 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors">
                  Add New User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-left">Username</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Join Date</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                      >
                        <td className="py-3 px-4">{user.username}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${user.isAdmin ? 'bg-purple-900 text-purple-400' : 'bg-gray-700 text-gray-300'}`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{new Date(user.joinDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                              Edit
                            </button>
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Platform Name</label>
                      <input
                        type="text"
                        defaultValue="Attack Vector CTF"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyber-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Admin Email</label>
                      <input
                        type="email"
                        defaultValue="admin@example.com"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyber-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm">Require 2FA for all admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;