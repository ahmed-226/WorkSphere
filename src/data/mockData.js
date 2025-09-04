export const mockUser = {
  id: 1,
  name: "Ahmed Mahmoud",
  email: "ahmed.mahmoud@example.com",
  avatar: "/src/assets/profile.jpg",
  joinDate: "2023-01-15",
  totalEarnings: 45000,
  completedProjects: 12
};

export const mockProjects = [
  {
    id: 1,
    name: "E-commerce Website",
    client: "TechCorp Inc.",
    status: "Active",
    deadline: "2024-02-15",
    budget: 15000,
    progress: 75
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "StartupXYZ",
    status: "Completed",
    deadline: "2024-01-30",
    budget: 12000,
    progress: 100
  },
  {
    id: 3,
    name: "Brand Identity Design",
    client: "CreativeAgency",
    status: "Pending",
    deadline: "2024-03-01",
    budget: 8000,
    progress: 25
  },
  {
    id: 4,
    name: "WordPress Plugin",
    client: "WebSolutions",
    status: "Active",
    deadline: "2024-02-28",
    budget: 5000,
    progress: 60
  },
  {
    id: 5,
    name: "UI/UX Consultation",
    client: "TechStartup",
    status: "Completed",
    deadline: "2024-01-20",
    budget: 3000,
    progress: 100
  }
];

export const mockActivities = [
  {
    id: 1,
    type: "project_update",
    description: "Completed wireframes for E-commerce project",
    timestamp: "2024-01-28T12:30:00Z"
  },
  {
    id: 2,
    type: "payment",
    description: "Received payment for Mobile App Development",
    timestamp: "2024-01-28T11:15:00Z"
  },
  {
    id: 3,
    type: "project_update",
    description: "Started working on Brand Identity Design",
    timestamp: "2024-01-27T16:20:00Z"
  },
  {
    id: 4,
    type: "meeting",
    description: "Client meeting scheduled for WordPress Plugin",
    timestamp: "2024-01-27T13:45:00Z"
  },
  {
    id: 5,
    type: "proposal",
    description: "Submitted proposal for UI/UX Consultation",
    timestamp: "2024-01-26T10:30:00Z"
  }
];

export const mockEarningsData = [
  { month: 'Jan', earnings: 4200 },
  { month: 'Feb', earnings: 3800 },
  { month: 'Mar', earnings: 5100 },
  { month: 'Apr', earnings: 4600 },
  { month: 'May', earnings: 5400 },
  { month: 'Jun', earnings: 4900 },
  { month: 'Jul', earnings: 5800 },
  { month: 'Aug', earnings: 6200 },
  { month: 'Sep', earnings: 5600 },
  { month: 'Oct', earnings: 6800 },
  { month: 'Nov', earnings: 7200 },
  { month: 'Dec', earnings: 6500 }
];