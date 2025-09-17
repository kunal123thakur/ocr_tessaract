import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentArrowUpIcon,
  ShieldCheckIcon,
  UsersIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  type: 'admin' | 'company';
}

export const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const location = useLocation();

  const adminItems = [
    { path: '/admin', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/admin/upload', label: 'Upload Certificate', icon: DocumentArrowUpIcon },
    { path: '/admin/students', label: 'Manage Students', icon: UsersIcon },
    { path: '/admin/hash-keys', label: 'Hash Keys', icon: HashtagIcon },
  ];

  const companyItems = [
    { path: '/company', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/company/verify', label: 'Verify Certificate', icon: ShieldCheckIcon },
  ];

  const items = type === 'admin' ? adminItems : companyItems;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-16">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {type === 'admin' ? 'College Panel' : 'Company Panel'}
        </h2>
        
        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};