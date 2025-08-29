import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-cyber-primary">Attack Vector</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          A Capture The Flag platform for cybersecurity enthusiasts to test their skills and compete for glory.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link to="/challenges" className="px-8 py-4 bg-cyber-primary hover:bg-cyber-secondary rounded-lg text-lg font-semibold transition-colors">
            View Challenges
          </Link>
          <Link to="/register" className="px-8 py-4 border-2 border-cyber-primary hover:bg-cyber-dark rounded-lg text-lg font-semibold transition-colors">
            Create Account
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="text-cyber-primary text-3xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Web Security</h3>
          <p className="text-gray-400">
            Test your skills against realistic web applications with vulnerabilities ranging from XSS to SQL injection.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="text-cyber-primary text-3xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Forensics</h3>
          <p className="text-gray-400">
            Dive into digital evidence and uncover hidden secrets in images, network captures, and file systems.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="text-cyber-primary text-3xl mb-4">🔐</div>
          <h3 className="text-xl font-bold mb-2">Cryptography</h3>
          <p className="text-gray-400">
            Crack codes, break ciphers, and decrypt messages using classical and modern cryptographic techniques.
          </p>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-cyber-primary mb-2">1</div>
            <h3 className="text-xl font-bold mb-2">Register</h3>
            <p className="text-gray-400">
              Create an account to get started.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-cyber-primary mb-2">2</div>
            <h3 className="text-xl font-bold mb-2">Explore</h3>
            <p className="text-gray-400">
              Browse challenges in various categories.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-cyber-primary mb-2">3</div>
            <h3 className="text-xl font-bold mb-2">Solve</h3>
            <p className="text-gray-400">
              Use your skills to solve challenges.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-cyber-primary mb-2">4</div>
            <h3 className="text-xl font-bold mb-2">Rank</h3>
            <p className="text-gray-400">
              Earn points and climb the scoreboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;