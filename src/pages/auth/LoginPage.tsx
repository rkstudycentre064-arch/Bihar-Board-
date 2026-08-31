import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { AlertCircle, Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const LoginPage = () => {
  const { signInWithGoogle, signInWithEmail, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  
  const [authMode, setAuthMode] = useState<'main' | 'forgot'>('main');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    try {
      const res = await signInWithEmail(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Failed to sign in. Please check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        setSuccessMessage("Password reset email sent. Please check your inbox.");
      } else {
        setErrorMessage(res.error || "Failed to send reset email.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setGoogleLoading(true);
    try {
      const res = await signInWithGoogle();
      if (!res.success && !res.cancelled && res.error) {
        setErrorMessage(res.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <img src="/file_0000000031c081fb9da3fad919ad9f0c.png" alt="BIHAR BOARD" className="h-20 w-auto object-contain mb-6 z-10" width="80" height="80" />

      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl bg-white z-10 relative">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-slate-900">
            {authMode === 'main' ? 'Welcome Back' : 'Reset Password'}
          </CardTitle>
          <CardDescription className="text-slate-500">
            {authMode === 'main' 
              ? 'Sign in to continue your learning journey.' 
              : 'Enter your email to receive a password reset link.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {authMode === 'main' && (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all outline-none text-slate-900 placeholder:text-slate-400"
                      placeholder="Email Address"
                      required
                      disabled={loading || googleLoading}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all outline-none text-slate-900 placeholder:text-slate-400"
                      placeholder="Password"
                      required
                      disabled={loading || googleLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                      disabled={loading || googleLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-sm font-medium text-[#2563EB] hover:text-[#0B1F44] transition-colors"
                    disabled={loading || googleLoading}
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-[#123B8F] hover:bg-[#0B1F44] text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all mt-2"
                  disabled={loading || googleLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-medium">OR</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl relative overflow-hidden group transition-all"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                aria-label="Continue with Google"
              >
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-full">
                  {googleLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin text-slate-400" />
                      Connecting to Google...
                    </>
                  ) : (
                    <>
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                      Continue with Google
                    </>
                  )}
                </div>
              </Button>
            </>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="Email Address"
                  required
                  disabled={loading}
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full h-12 text-base font-medium bg-[#123B8F] hover:bg-[#0B1F44] text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Send Reset Link
              </Button>

              <button 
                type="button" 
                onClick={() => {
                  setAuthMode('main');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }} 
                className="w-full flex items-center justify-center text-sm text-slate-500 hover:text-slate-800 transition-colors py-2"
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>
            </form>
          )}

          <div className="text-center text-sm pt-4 border-t border-slate-100 mt-6">
            <p className="text-slate-500">Don't have an account? <Link to="/register" className="text-[#2563EB] font-semibold hover:underline">Create Account</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
