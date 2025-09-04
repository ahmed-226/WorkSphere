import { useState } from 'react';
import { Clock, CheckCircle, DollarSign, Calendar, FileText, Filter, Search } from 'lucide-react';
import { mockActivities } from '../data/mockData';

const Activities = () => {
  const [activities] = useState(mockActivities);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign size={20} className="text-green-500" />;
      case 'project_update':
        return <CheckCircle size={20} className="text-blue-500" />;
      case 'meeting':
        return <Calendar size={20} className="text-purple-500" />;
      case 'proposal':
        return <FileText size={20} className="text-orange-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'project_update':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      case 'proposal':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
  };

  const filteredActivities = activities
    .filter(activity => {
      const matchesType = filterType === 'all' || activity.type === filterType;
      const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const activityStats = {
    total: activities.length,
    payments: activities.filter(a => a.type === 'payment').length,
    projects: activities.filter(a => a.type === 'project_update').length,
    meetings: activities.filter(a => a.type === 'meeting').length,
    proposals: activities.filter(a => a.type === 'proposal').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
        <p className="text-gray-600 mt-1">Track all your project activities and updates.</p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{activityStats.total}</div>
            <div className="text-sm text-gray-600 mt-1">Total Activities</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activityStats.payments}</div>
            <div className="text-sm text-gray-600 mt-1">Payments</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{activityStats.projects}</div>
            <div className="text-sm text-gray-600 mt-1">Project Updates</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{activityStats.meetings}</div>
            <div className="text-sm text-gray-600 mt-1">Meetings</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{activityStats.proposals}</div>
            <div className="text-sm text-gray-600 mt-1">Proposals</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="payment">Payments</option>
              <option value="project_update">Project Updates</option>
              <option value="meeting">Meetings</option>
              <option value="proposal">Proposals</option>
            </select>
          </div>
        </div>

        {/* Activities List */}
        <div className="mt-6 space-y-4">
          {filteredActivities.map((activity) => {
            const timeInfo = formatTime(activity.timestamp);
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100">
                <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActivityTypeColor(activity.type)}`}>
                          {activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-xs text-gray-500">{timeInfo.date}</span>
                        <span className="text-xs text-gray-500">{timeInfo.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;