import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Card } from '../../components/ui/Card';
import { Sidebar } from '../../components/layout/Sidebar';

export const CompanyDashboard: React.FC = () => {
  const [stats] = useState({
    totalVerifications: 87,
    successfulVerifications: 79,
    failedVerifications: 8,
    pendingVerifications: 3
  });

  const statsCards = [
    {
      title: 'Total Verifications',
      value: stats.totalVerifications,
      icon: ShieldCheckIcon,
      color: 'blue',
      change: '+23%'
    },
    {
      title: 'Successful',
      value: stats.successfulVerifications,
      icon: CheckCircleIcon,
      color: 'green',
      change: '+18%'
    },
    {
      title: 'Failed',
      value: stats.failedVerifications,
      icon: XCircleIcon,
      color: 'red',
      change: '-5%'
    },
    {
      title: 'Pending',
      value: stats.pendingVerifications,
      icon: ClockIcon,
      color: 'yellow',
      change: '0%'
    }
  ];

  const recentVerifications = [
    { 
      id: 1, 
      candidate: 'Alice Johnson', 
      certificate: 'Computer Science Degree', 
      status: 'verified', 
      time: '1 hour ago' 
    },
    { 
      id: 2, 
      candidate: 'Bob Smith', 
      certificate: 'MBA Certificate', 
      status: 'failed', 
      time: '3 hours ago' 
    },
    { 
      id: 3, 
      candidate: 'Carol Davis', 
      certificate: 'Engineering Diploma', 
      status: 'verified', 
      time: '5 hours ago' 
    },
    { 
      id: 4, 
      candidate: 'David Wilson', 
      certificate: 'Marketing Certification', 
      status: 'pending', 
      time: '1 day ago' 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar type="company" />
      
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Company Verification Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Verify candidate certificates and manage verification processes
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

          {/* Recent Verifications */}
          <Card glass>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Verifications
            </h3>
            <div className="space-y-4">
              {recentVerifications.map((verification) => (
                <motion.div
                  key={verification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: verification.id * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {verification.candidate}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {verification.certificate}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                      {verification.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {verification.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card glass className="text-center">
              <ShieldCheckIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quick Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload a certificate for instant verification
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block cursor-pointer"
              >
                Start Verification
              </motion.div>
            </Card>

            <Card glass className="text-center">
              <ClockIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Batch Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Verify multiple certificates at once
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg inline-block cursor-pointer"
              >
                Coming Soon
              </motion.div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};