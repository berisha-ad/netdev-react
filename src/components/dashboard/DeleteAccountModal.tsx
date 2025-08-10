import React, { useState } from 'react';
import Modal from '../shared/Modal';
import DangerBtn from '../shared/DangerBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import Input from '../shared/Input';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteAccount: () => Promise<void>;
  isLoading?: boolean;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onDeleteAccount,
  isLoading = false
}) => {
  const [confirmationText, setConfirmationText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmationText !== 'DELETE') {
      setError('Please type DELETE to confirm account deletion');
      return;
    }

    try {
      setError(null);
      await onDeleteAccount();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
    }
  };

  const handleClose = () => {
    setConfirmationText('');
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
            Delete Account
          </h3>
          <p className="text-sm text-gray-500 text-center">
            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="font-bold text-red-600">DELETE</span> to confirm:
          </label>
          <Input
            id="confirmation"
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="DELETE"
            className="w-full"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <SecondaryBtn onClick={handleClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <DangerBtn 
            onClick={handleDelete} 
            disabled={isLoading || confirmationText !== 'DELETE'}
            className="min-w-[100px]"
          >
            {isLoading ? 'Deleting...' : 'Delete Account'}
          </DangerBtn>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal; 