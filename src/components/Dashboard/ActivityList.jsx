import { Clock, CheckCircle, DollarSign, Calendar, FileText } from 'lucide-react';

const ActivityList = ({ activities }) => {
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
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors duration-200">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all activities →
        </button>
      </div>
    </div>
  );
};

export default ActivityList;