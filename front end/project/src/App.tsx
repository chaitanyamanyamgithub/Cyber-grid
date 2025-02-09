import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Shield, Loader, RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import URLChecker from './pages/URLChecker';
import EmailChecker from './pages/EmailChecker';
import About from './pages/About';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    setLoading(false);
  }, []);

  // Auto-retry mechanism
  useEffect(() => {
    if (recaptchaError && retryCount < 3) {
      const timer = setTimeout(() => {
        handleRetry();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [recaptchaError, retryCount]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const handleVerification = (token: string | null) => {
    if (token) {
      setVerified(true);
      setRecaptchaError(false);
    }
  };

  const handleRecaptchaError = () => {
    setRecaptchaError(true);
    setRecaptchaLoaded(true);
  };

  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
    setRecaptchaError(false);
    setRetryCount(0);
  };

  const handleRetry = () => {
    setRecaptchaError(false);
    setRecaptchaLoaded(false);
    setRetryCount((prev) => prev + 1);
  };

  // Fallback verification for development
  const handleSkipVerification = () => {
    if (process.env.NODE_ENV === 'development') {
      setVerified(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
        >
          <Shield className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to Cyber Grid</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Please verify that you're human to continue</p>
          
          {!recaptchaLoaded && !recaptchaError && (
            <div className="flex justify-center mb-4">
              <Loader className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          )}
          
          <div className="flex justify-center">
            {!recaptchaError && (
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleVerification}
                theme={darkMode ? 'dark' : 'light'}
                onError={handleRecaptchaError}
                onLoad={handleRecaptchaLoad}
              />
            )}
          </div>

          {recaptchaError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 space-y-4"
            >
              <p className="text-red-500 dark:text-red-400">
                {retryCount >= 3 
                  ? "Unable to load verification. Please try again later."
                  : "There was an error loading the verification. Retrying..."}
              </p>
              {retryCount >= 3 && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              )}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={handleSkipVerification}
                  className="block w-full mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Skip Verification (Development Only)
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url-checker" element={<URLChecker />} />
            <Route path="/email-checker" element={<EmailChecker />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;