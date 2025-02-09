import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Link as LinkIcon, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-20 h-20 mx-auto text-blue-500 mb-6" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI-Powered Phishing Detection
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Protect yourself from malicious attacks with real-time URL and email analysis
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/url-checker"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <LinkIcon className="w-5 h-5 mr-2" />
            Check URL
          </Link>
          <Link
            to="/email-checker"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Check Email
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {[
          {
            icon: <AlertTriangle className="w-8 h-8 text-blue-500" />,
            title: "Real-time Detection",
            description: "Instant analysis of URLs and emails using advanced AI algorithms"
          },
          {
            icon: <LinkIcon className="w-8 h-8 text-blue-500" />,
            title: "Easy-to-Use Interface",
            description: "Simple and intuitive design for quick threat detection"
          },
          {
            icon: <Shield className="w-8 h-8 text-blue-500" />,
            title: "Powered by AI",
            description: "State-of-the-art machine learning models for accurate results"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;