import { Clock, CheckCircle, DollarSign, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';  

const NotificationDropdown = ({ activities, onClose }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign size={16} className="text-green-500" />;
      case 'project_update':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'meeting':
        return <Calendar size={16} className="text-purple-500" />;
      case 'proposal':
        return <FileText size={16} className="text-orange-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">Recent Activities</h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No recent activities
          </div>
        )}
      </div>
      
      <div className="px-4 py-2 border-t border-gray-100">
        <Link 
            to="/activities"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all activities →
        </Link>
      </div>

    </div>
  );
};

export default NotificationDropdown;