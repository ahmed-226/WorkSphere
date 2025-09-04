import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Settings, 
  Menu, 
  X,
  BarChart3,
  User,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Activities', href: '/activities', icon: Activity },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors duration-200"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-primary-800 to-primary-900 shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:z-10
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-primary-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-primary-600" />
              </div>
              <h1 className="text-xl font-bold text-white">WorkSphere</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                    ${isActive(item.href)
                      ? 'bg-white text-primary-700 shadow-lg transform scale-105'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white hover:translate-x-1'
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`mr-3 transition-colors duration-200 ${
                      isActive(item.href) ? 'text-primary-600' : 'text-primary-200 group-hover:text-white'
                    }`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-700">
            <div className="text-xs text-primary-300 text-center">
              © 2025 WorkSphere
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;