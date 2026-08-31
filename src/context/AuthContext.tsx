import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, onAuthStateChanged, signInWithPopup, signInWithRedirect, 
  getRedirectResult, signOut, AuthError, deleteUser,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleAuthProvider } from '../lib/firebase';
import { FullPageLoader } from '../components/ui/FullPageLoader';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  authProvider: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  accountStatus: 'active' | 'suspended' | 'deleted';
  createdAt: any;
  updatedAt: any;
}

export interface SignInResult {
  success: boolean;
  cancelled?: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: (role?: 'student' | 'parent' | 'teacher') => Promise<SignInResult>;
  signUpWithEmail: (email: string, password: string, name: string, role?: 'student' | 'parent' | 'teacher') => Promise<SignInResult>;
  signInWithEmail: (email: string, password: string) => Promise<SignInResult>;
  resetPassword: (email: string) => Promise<SignInResult>;
  logout: () => Promise<void>;
  deleteUserAccount: () => Promise<SignInResult>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateProfile = async (
    currentUser: User, 
    role: 'student' | 'parent' | 'teacher' = 'student',
    customName?: string,
    customProvider?: string
  ) => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        setProfile(userSnap.data() as UserProfile);
      } else {
        const newProfile: Partial<UserProfile> = {
          uid: currentUser.uid,
          name: customName || currentUser.displayName || '',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
          authProvider: customProvider || (currentUser.providerData[0]?.providerId === 'password' ? 'password' : 'google'),
          role: role,
          accountStatus: 'active'
        };
        
        await setDoc(userRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        const freshSnap = await getDoc(userRef);
        setProfile(freshSnap.data() as UserProfile);
      }
    } catch (e) {
      console.error("Error fetching/creating profile:", e);
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const pendingRole = localStorage.getItem('pendingAuthRole') as any;
          await fetchOrCreateProfile(result.user, pendingRole || 'student');
          localStorage.removeItem('pendingAuthRole');
        }
      } catch (error: any) {
        console.error("Redirect auth error:", error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchOrCreateProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError): string => {
    if (error.code === 'auth/popup-closed-by-user') return 'Google sign-in was cancelled.';
    if (error.code === 'auth/popup-blocked') return 'Please allow pop-ups or try again.';
    if (error.code === 'auth/network-request-failed') return 'Network connection problem. Please try again.';
    if (error.code === 'auth/cancelled-popup-request') return 'Another sign-in request is already in progress.';
    if (error.code === 'auth/account-exists-with-different-credential') return 'An account already exists with the same email address but different sign-in credentials.';
    if (error.code === 'auth/invalid-credential') return 'Invalid credentials provided.';
    if (error.code === 'auth/operation-not-allowed') return 'This sign-in method is not enabled.';
    if (error.code === 'auth/too-many-requests') return 'Google sign-in is temporarily unavailable. Please try again later.';
    if (error.code === 'auth/email-already-in-use') return 'This email is already in use by another account.';
    if (error.code === 'auth/weak-password') return 'The password provided is too weak.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') return 'Incorrect email or password.';
    return error.message || 'Error occurred. Please try again.';
  };

  const signInWithGoogle = async (role: 'student' | 'parent' | 'teacher' = 'student'): Promise<SignInResult> => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        localStorage.setItem('pendingAuthRole', role);
        await signInWithRedirect(auth, googleAuthProvider);
        return { success: true };
      } else {
        const result = await signInWithPopup(auth, googleAuthProvider);
        await fetchOrCreateProfile(result.user, role, undefined, 'google');
        return { success: true };
      }
    } catch (error: any) {
      const authError = error as AuthError;
      return { 
        success: false, 
        cancelled: authError.code === 'auth/popup-closed-by-user' || authError.code === 'auth/cancelled-popup-request',
        error: handleAuthError(authError) 
      };
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string, role: 'student' | 'parent' | 'teacher' = 'student'): Promise<SignInResult> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update Auth Profile
      await updateProfile(userCredential.user, { displayName: name });
      // Create Database Profile
      await fetchOrCreateProfile(userCredential.user, role, name, 'password');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleAuthError(error as AuthError) };
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<SignInResult> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await fetchOrCreateProfile(userCredential.user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleAuthError(error as AuthError) };
    }
  };

  const resetPassword = async (email: string): Promise<SignInResult> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleAuthError(error as AuthError) };
    }
  };

  const deleteUserAccount = async (): Promise<SignInResult> => {
    if (!auth.currentUser) return { success: false, error: 'No user signed in' };
    try {
      const uid = auth.currentUser.uid;
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch(e) {
        console.warn("Could not delete user document, might require admin privileges.");
      }
      await deleteUser(auth.currentUser);
      setProfile(null);
      setUser(null);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete account. You may need to log in again recently to perform this action.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (error: any) {
      console.warn('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, profile, loading, 
      signInWithGoogle, signUpWithEmail, signInWithEmail, resetPassword,
      logout, deleteUserAccount 
    }}>
      {loading ? <FullPageLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
