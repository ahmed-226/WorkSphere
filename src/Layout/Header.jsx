import { useState, useRef, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { mockUser, mockActivities } from '../data/mockData';
import NotificationDropdown from '../components/NotificationDropdown';
import profileImage from '../assets/profile.jpg';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg border-b border-primary-800 z-20">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile menu space + Search bar */}
        <div className="flex-1 max-w-md ml-12 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects, clients..."
              className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <Bell size={20} />
              {mockActivities.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
            
            {showNotifications && (
              <NotificationDropdown 
                activities={mockActivities.slice(0, 3)} 
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {!imageError ? (
                <img
                  src={profileImage}
                  alt={mockUser.name}
                  className="w-8 h-8 rounded-full ring-2 ring-white/30 object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 rounded-full ring-2 ring-white/30 bg-white/20 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-white">{mockUser.name}</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 max-h-80 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-primary-100">
                  <div className="flex items-center space-x-3">
                    {!imageError ? (
                      <img
                        src={profileImage}
                        alt={mockUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center">
                        <User size={20} className="text-primary-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{mockUser.name}</p>
                      <p className="text-xs text-gray-600 truncate">{mockUser.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <a 
                    href="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User size={16} className="mr-3 text-primary-600" />
                    Profile Settings
                  </a>
                  <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;