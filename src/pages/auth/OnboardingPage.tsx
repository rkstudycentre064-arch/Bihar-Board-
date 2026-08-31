import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';

export const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    phone: '',
    role: 'student',
    classId: '',
    mediumId: '',
    district: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        navigate('/dashboard');
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || "Failed to update profile. Please ensure all fields are correctly filled.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">I am a</label>
              <select 
                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number</label>
              <input 
                type="tel" 
                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            {formData.role === 'student' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Class</label>
                    <select 
                      className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white"
                      value={formData.classId}
                      onChange={e => setFormData({...formData, classId: e.target.value})}
                      required
                    >
                      <option value="">Select Class</option>
                      {[6,7,8,9,10,11,12].map(c => <option key={c} value={c}>Class {c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Medium</label>
                    <select 
                      className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white"
                      value={formData.mediumId}
                      onChange={e => setFormData({...formData, mediumId: e.target.value})}
                      required
                    >
                      <option value="">Select Medium</option>
                      <option value="1">हिंदी (Hindi)</option>
                      <option value="2">English</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                    placeholder="E.g., Patna"
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
