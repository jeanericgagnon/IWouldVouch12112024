import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { linkedInAuth } from '../lib/linkedin';
import { mockStore } from '../data/mockData';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const authenticatedUser = mockStore.getUserByEmailAndPassword(email, password);
      
      if (!authenticatedUser) {
        throw new Error('Invalid email or password');
      }

      setUser(authenticatedUser);
      
      const returnPath = sessionStorage.getItem('returnPath');
      if (returnPath) {
        sessionStorage.removeItem('returnPath');
        navigate(returnPath);
      } else {
        navigate(`/profile/${authenticatedUser.id}`);
      }
      
      toast.success('Signed in successfully!');
    } catch (error) {
      console.error('Email auth error:', error);
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      // In a real app, this would create a new user
      // For now, show an error since we're using mock data
      toast.error('Email signup is not available in demo mode');
      throw new Error('Email signup is not available in demo mode');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      await linkedInAuth.initiateAuth();
    } catch (error) {
      console.error('LinkedIn auth failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    navigate('/');
    toast.success('Signed out successfully');
  };

  return {
    user,
    isAuthenticated: !!user,
    signInWithEmail,
    signUpWithEmail,
    signInWithLinkedIn,
    signOut,
    navigate
  };
}