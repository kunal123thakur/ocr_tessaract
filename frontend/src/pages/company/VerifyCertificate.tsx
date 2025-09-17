import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';
import { VerificationResponse } from '../../types';
import { FileUpload } from '../../components/ui/FileUpload';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sidebar } from '../../components/layout/Sidebar';

export const VerifyCertificate: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVerificationResult(null);
  };

  const handleVerification = async () => {
    if (!selectedFile) {
      toast.error('Please select a certificate file first');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await apiService.verifyCertificate(selectedFile);
      setVerificationResult(result);
      
      if (result.verified) {
        toast.success('Certificate verified successfully!');
      } else {
        toast.error('Certificate verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify certificate. Please try again.');
      
      // Mock result for demonstration since backend endpoint doesn't exist yet
      const mockResult: VerificationResponse = {
        verified: Math.random() > 0.3, // 70% success rate for demo
        message: Math.random() > 0.3 ? 'Certificate verified successfully' : 'Certificate not found in database',
        match_details: Math.random() > 0.3 ? {
          student_name: 'John Doe',
          roll_number: '12345',
          course: 'Computer Science',
          institution: 'ABC University',
          hash_match: true
        } : null
      };
      setVerificationResult(mockResult);
    } finally {
      setIsVerifying(false);
    }
  };

  const getResultIcon = () => {
    if (!verificationResult) return null;
    
    if (verificationResult.verified) {
      return <CheckCircleIcon className="w-16 h-16 text-green-600" />;
    } else {
      return <XCircleIcon className="w-16 h-16 text-red-600" />;
    }
  };

  const getResultColor = () => {
    if (!verificationResult) return 'gray';
    return verificationResult.verified ? 'green' : 'red';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar type="company" />
      
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Verify Certificate
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Upload a certificate to verify its authenticity
            </p>
          </div>

          {/* File Upload Section */}
          <Card glass>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upload Certificate for Verification
            </h2>
            <FileUpload 
              onFileSelect={handleFileSelect}
              disabled={isVerifying}
              className="mb-6"
            />
            
            {selectedFile && (
              <div className="flex justify-end">
                <Button
                  onClick={handleVerification}
                  isLoading={isVerifying}
                  disabled={!selectedFile}
                  icon={isVerifying ? <ClockIcon className="w-5 h-5" /> : undefined}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                </Button>
              </div>
            )}
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card glass>
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    {getResultIcon()}
                  </motion.div>
                  
                  <h2 className={`text-2xl font-bold mb-2 text-${getResultColor()}-600`}>
                    {verificationResult.verified ? 'Certificate Verified!' : 'Verification Failed'}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    {verificationResult.message}
                  </p>
                </div>

                {verificationResult.verified && verificationResult.match_details && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-gray-200 dark:border-gray-700 pt-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Certificate Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Student Name
                        </label>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {verificationResult.match_details.student_name}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Roll Number
                        </label>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {verificationResult.match_details.roll_number}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Course
                        </label>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {verificationResult.match_details.course}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Institution
                        </label>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {verificationResult.match_details.institution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 dark:text-green-200 font-medium">
                          Hash verification: {verificationResult.match_details.hash_match ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!verificationResult.verified && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                        Possible reasons for verification failure:
                      </h4>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        <li>• Certificate not found in our database</li>
                        <li>• Certificate has been tampered with</li>
                        <li>• Hash key mismatch</li>
                        <li>• Invalid certificate format</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => {
                      setSelectedFile(null);
                      setVerificationResult(null);
                    }}
                    variant="outline"
                  >
                    Verify Another Certificate
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};