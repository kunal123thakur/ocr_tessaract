import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  UsersIcon,
  ShieldCheckIcon,
  HashtagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Card } from '../../components/ui/Card';
import { Sidebar } from '../../components/layout/Sidebar';

export const AdminDashboard: React.FC = () => {
  const [stats] = useState({
    totalStudents: 245,
    totalCertificates: 189,
    verifiedCertificates: 176,
    pendingVerifications: 13
  });

  const statsCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: UsersIcon,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Certificates Uploaded',
      value: stats.totalCertificates,
      icon: DocumentArrowUpIcon,
      color: 'emerald',
      change: '+8%'
    },
    {
      title: 'Verified Certificates',
      value: stats.verifiedCertificates,
      icon: ShieldCheckIcon,
      color: 'green',
      change: '+15%'
    },
    {
      title: 'Hash Keys Generated',
      value: stats.totalCertificates,
      icon: HashtagIcon,
      color: 'purple',
      change: '+8%'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Certificate uploaded', student: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Hash key generated', student: 'Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Certificate verified', student: 'Mike Johnson', time: '6 hours ago' },
    { id: 4, action: 'Student profile updated', student: 'Sarah Wilson', time: '1 day ago' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar type="admin" />
      
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              College Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage certificates, students, and verification processes
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover glass>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </p>
                        <p className={`text-sm mt-1 text-${stat.color}-600`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900 p-3 rounded-xl`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Charts and Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card glass>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Verification Trends
                </h3>
                <ChartBarIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">Connect to your analytics service</p>
                </div>
              </div>
            </Card>

            <Card glass>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: activity.id * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.student}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};