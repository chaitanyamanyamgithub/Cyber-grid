import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Lock, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Analysis",
      description: "Our advanced machine learning models analyze patterns and characteristics to identify potential threats."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Real-time Detection",
      description: "Get instant results about the safety of URLs and emails with our real-time scanning system."
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      title: "Privacy Focused",
      description: "Your security is our priority. We don't store any submitted URLs or email content."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Continuous Updates",
      description: "Our detection systems are continuously updated to protect against the latest threats."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-20 h-20 mx-auto text-blue-500 mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Cyber Grid
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Cyber Grid is an advanced phishing detection platform that helps protect users from online threats using cutting-edge AI technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to enhance your online security?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Start using Cyber Grid today to protect yourself from phishing attempts and malicious content.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Shield className="w-5 h-5 mr-2" />
            Get Started
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;