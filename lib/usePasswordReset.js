import { sendPasswordResetEmail} from 'firebase/auth';
import { useState } from 'react';

export const usePasswordReset = () => {
    const [state, setState] = useState({
      isLoading: false,
      error: null,
    })
    const sendPasswordReset = ({ email = '' }) =>
  sendPasswordResetEmail(email)

    const handlePasswordReset = async (values) => {
      setState({ isLoading: true, error: null })
      try {
        await sendPasswordReset(values)
        setState({ isLoading: false, error: null })
      } catch (error) {
        setState({ isLoading: false, error })
        throw error
      }
    }
    return [handlePasswordReset, { ...state }]
  }