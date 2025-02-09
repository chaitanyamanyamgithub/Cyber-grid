import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

const EmailChecker = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<'safe' | 'phishing' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult(Math.random() > 0.5 ? 'safe' : 'phishing');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-8">
        <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Email Content Analyzer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Paste the email content to check for potential phishing attempts
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Content
            </label>
            <textarea
              id="email"
              required
              placeholder="Paste the email content here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Analyzing Content...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Analyze Email
              </>
            )}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-lg ${
              result === 'safe'
                ? 'bg-green-50 dark:bg-green-900/30'
                : 'bg-red-50 dark:bg-red-900/30'
            }`}
          >
            <div className="flex items-start">
              {result === 'safe' ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
              )}
              <div className="ml-3">
                <h3 className={`text-lg font-semibold ${
                  result === 'safe'
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {result === 'safe' ? 'Email Appears Safe' : 'Potential Phishing Detected'}
                </h3>
                <p className={`mt-2 text-sm ${
                  result === 'safe'
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {result === 'safe'
                    ? 'Our analysis suggests this email is legitimate and safe.'
                    : 'This email contains suspicious patterns commonly found in phishing attempts. Exercise caution.'}
                </p>
                {result === 'phishing' && (
                  <ul className="mt-4 space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Suspicious sender address
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Urgent or threatening language
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Requests for sensitive information
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EmailChecker;