import { DollarSign, FolderOpen, Clock, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityList from '../components/Dashboard/ActivityList';
import EarningsChart from '../components/Dashboard/EarningsChart';
import { mockProjects, mockActivities, mockEarningsData } from '../data/mockData';

const Overview = () => {
  const activeProjects = mockProjects.filter(p => p.status === 'Active').length;
  const totalEarnings = mockProjects.reduce((sum, p) => sum + p.budget, 0);
  const tasksDue = mockProjects.filter(p => {
    const deadline = new Date(p.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  }).length;

  const projectStatusData = [
    { name: 'Active', value: mockProjects.filter(p => p.status === 'Active').length, color: '#10B981' },
    { name: 'Completed', value: mockProjects.filter(p => p.status === 'Completed').length, color: '#3B82F6' },
    { name: 'Pending', value: mockProjects.filter(p => p.status === 'Pending').length, color: '#F59E0B' },
  ];

  const projectProgressData = mockProjects.map(project => ({
    name: project.name.substring(0, 10) + '...',
    progress: project.progress,
    budget: project.budget
  }));

  const earningsTrendData = mockEarningsData.slice(-6);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={mockProjects.length}
          icon={FolderOpen}
          trend="up"
          trendValue="+2 this month"
          color="blue"
        />
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          icon={TrendingUp}
          trend="up"
          trendValue="+1 this week"
          color="green"
        />
        <StatsCard
          title="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="+15% from last month"
          color="purple"
        />
        <StatsCard
          title="Tasks Due Soon"
          value={tasksDue}
          icon={Clock}
          trend="down"
          trendValue="-2 from yesterday"
          color="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Earnings Chart */}
        <div className="lg:col-span-2">
          <EarningsChart data={mockEarningsData} />
        </div>

        {/* Project Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {projectStatusData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Trend (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'progress' ? `${value}%` : `$${value.toLocaleString()}`,
                    name === 'progress' ? 'Progress' : 'Budget'
                  ]} 
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity with Link */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Link 
              to="/activities"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all activities →
            </Link>
          </div>
          <div className="space-y-4">
            {mockActivities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors duration-200">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'payment' && <DollarSign size={16} className="text-green-500" />}
                  {activity.type === 'project_update' && <FolderOpen size={16} className="text-blue-500" />}
                  {activity.type === 'meeting' && <Clock size={16} className="text-purple-500" />}
                  {activity.type === 'proposal' && <TrendingUp size={16} className="text-orange-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
            <Link 
              to="/projects"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all Projects →
            </Link>
          </div>          
          <div className="space-y-3">
            {mockProjects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors duration-200">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                  <p className="text-xs text-gray-500">{project.client}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'Active' ? 'bg-green-100 text-green-800' :
                    project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-600">${project.budget.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Overview;