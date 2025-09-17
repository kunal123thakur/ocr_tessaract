import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { DocumentData } from '../../types';
import { FileUpload } from '../../components/ui/FileUpload';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sidebar } from '../../components/layout/Sidebar';

export const UploadCertificate: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<DocumentData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    try {
      const data = await apiService.uploadCertificate(selectedFile);
      setExtractedData(data);
      toast.success('Certificate processed successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to process certificate. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!extractedData) return;

    setIsSaving(true);
    try {
      // Generate a simple hash key for demonstration
      const hashKey = btoa(`${extractedData.student_name}-${Date.now()}`).slice(0, 16);
      
      const studentData = {
        ...extractedData,
        hashKey,
        verified: true,
        createdAt: new Date().toISOString()
      };

      await apiService.saveStudentDetails(studentData);
      toast.success('Student details saved successfully!');
      
      // Reset form
      setSelectedFile(null);
      setExtractedData(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save student details. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar type="admin" />
      
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Certificate
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Upload student certificates to extract and verify information
            </p>
          </div>

          {/* File Upload Section */}
          <Card glass>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Select Certificate File
            </h2>
            <FileUpload 
              onFileSelect={handleFileSelect}
              disabled={isUploading}
              className="mb-6"
            />
            
            {selectedFile && (
              <div className="flex justify-end">
                <Button
                  onClick={handleUpload}
                  isLoading={isUploading}
                  disabled={!selectedFile}
                >
                  Process Certificate
                </Button>
              </div>
            )}
          </Card>

          {/* Extracted Data Display */}
          {extractedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card glass>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Extracted Certificate Details
                  </h2>
                  <Button
                    onClick={handleSaveDetails}
                    isLoading={isSaving}
                    variant="secondary"
                  >
                    Save Details
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Student Name
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.student_name || 'Not extracted'}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Roll Number
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.roll_number || 'Not extracted'}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Course
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.course || 'Not extracted'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Institution
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.institution || 'Not extracted'}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Grade
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.grade || 'Not extracted'}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Completion
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {extractedData.date_of_completion || 'Not extracted'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw Extracted Text */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Raw Extracted Text
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg max-h-40 overflow-y-auto">
                    <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {extractedData.extracted_text}
                    </pre>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};