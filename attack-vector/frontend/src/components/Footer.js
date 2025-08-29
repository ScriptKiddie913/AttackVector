import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cyber-dark border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="bg-cyber-primary w-6 h-6 rounded-lg"></div>
              <span className="text-xl font-bold text-cyber-primary">Attack Vector</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              A Capture The Flag platform for cybersecurity enthusiasts.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Platform</h3>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Challenges</a></li>
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Scoreboard</a></li>
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Rules</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyber-accent transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Attack Vector CTF Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;