import { useState } from 'react';

export default function TermsOfService() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Terms of Service Link */}
      <button
        onClick={openModal}
        className="text-teal-400 hover:text-teal-300 transition-colors text-sm underline"
      >
        Terms of Service
      </button>

      {/* Terms of Service Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-400">Terms of Service</h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-lg">×</span>
                </button>
              </div>

              {/* Content */}
              <div className="text-gray-300 space-y-4">
                <p className="text-sm text-gray-400">Last updated: July 30, 2025</p>

                <ol className="space-y-3 list-decimal list-inside">
                  <li>Users must comply with all applicable laws and regulations when using DEXY.</li>
                  <li>Users are solely responsible for the security of their wallets and private keys.</li>
                  <li>DEXY is not liable for any losses incurred due to user error or blockchain-related issues.</li>
                  <li>DEXY does not facilitate refunds or dispute resolution due to the peer-to-peer nature of transactions.</li>
                  <li>Use of the platform constitutes acceptance of these terms.</li>
                </ol>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Security and Vulnerability Reporting</h3>
                  <p className="text-sm">
                    In case you discover any exploit or vulnerability, please contact us 
                    immediately at <span className="text-teal-400">support@dexy.com</span> to submit the issue. Any 
                    unauthorized exploit or malicious activity may be prosecuted.
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm">
                    DEXY reserves the right to update these Terms of Service at any 
                    time, and users are responsible for reviewing them regularly.
                  </p>
                </div>

                {/* Accept Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={closeModal}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}