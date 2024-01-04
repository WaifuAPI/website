import React, { useState } from 'react';

const ModerationPopup = ({ user, onClose, onBan }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setReason('');
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSave = () => {
    if (selectedOption === 'ban' && reason.trim() !== '') {
      onBan(reason);
      onClose();
    } else {
      alert('Please provide all required information.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-96 animate__animated animate__fadeIn">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Moderation</h2>
          <div className="mb-4">
            <label className="block text-gray-800 font-bold mb-2">Select Action:</label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  name="moderationOption"
                  value="ban"
                  checked={selectedOption === 'ban'}
                  onChange={() => handleOptionChange('ban')}
                  className="mr-2"
                />
                Ban
              </label>
            </div>
          </div>

          {selectedOption === 'ban' && (
            <div className="mb-4">
              <label className="block text-gray-800 font-bold mb-2" htmlFor="banReason">
                Ban Reason:
              </label>
              <input
                type="text"
                id="banReason"
                value={reason}
                onChange={handleReasonChange}
                className="border rounded w-full py-2 px-3"
              />
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPopup;
