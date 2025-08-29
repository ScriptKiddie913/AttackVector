import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <header className="bg-cyber-dark border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-cyber-primary w-8 h-8 rounded-lg"></div>
            <Link to="/" className="text-2xl font-bold text-cyber-primary">
              Attack Vector
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-cyber-accent transition-colors">
              Home
            </Link>
            <Link to="/challenges" className="hover:text-cyber-accent transition-colors">
              Challenges
            </Link>
            <Link to="/scoreboard" className="hover:text-cyber-accent transition-colors">
              Scoreboard
            </Link>
            {isAuthenticated && (
              <Link to="/profile" className="hover:text-cyber-accent transition-colors">
                Profile
              </Link>
            )}
            {user && user.is_admin && (
              <Link to="/admin" className="hover:text-cyber-accent transition-colors">
                Admin
              </Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg bg-cyber-primary hover:bg-cyber-secondary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-lg border border-cyber-primary hover:bg-cyber-dark transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;