import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, Camera, Mic, MapPin, Shield, AlertCircle } from 'lucide-react';

export const PermissionsPage = () => {
  const [permissions, setPermissions] = useState({
    notifications: 'checking...',
    camera: 'checking...',
    microphone: 'checking...',
    location: 'checking...'
  });
  
  const checkPermissions = async () => {
    // 1. Notifications
    let notifState = 'Not Requested';
    if ('Notification' in window) {
      if (Notification.permission === 'granted') notifState = 'Allowed';
      else if (Notification.permission === 'denied') notifState = 'Denied';
      else notifState = 'Not Requested';
    } else {
      notifState = 'Unsupported';
    }
    
    // 2. Camera & Microphone (Using Permissions API if supported, else rely on manual tracking)
    let camState = 'Not Requested';
    let micState = 'Not Requested';
    try {
      if (navigator.permissions && navigator.permissions.query) {
        // Note: 'camera' and 'microphone' might not be supported in all browsers for Permissions API
        try {
          const camPerm = await navigator.permissions.query({ name: 'camera' as PermissionName });
          camState = camPerm.state === 'granted' ? 'Allowed' : camPerm.state === 'denied' ? 'Denied' : 'Not Requested';
          camPerm.onchange = () => checkPermissions();
        } catch (e) {
          camState = 'Unknown';
        }
        
        try {
          const micPerm = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          micState = micPerm.state === 'granted' ? 'Allowed' : micPerm.state === 'denied' ? 'Denied' : 'Not Requested';
          micPerm.onchange = () => checkPermissions();
        } catch (e) {
          micState = 'Unknown';
        }
      }
    } catch(e) {
      camState = 'Unknown';
      micState = 'Unknown';
    }
    
    // 3. Location
    let locState = 'Not Requested';
    if ('geolocation' in navigator && navigator.permissions) {
      try {
        const locPerm = await navigator.permissions.query({ name: 'geolocation' });
        locState = locPerm.state === 'granted' ? 'Allowed' : locPerm.state === 'denied' ? 'Denied' : 'Not Requested';
        locPerm.onchange = () => checkPermissions();
      } catch (e) {
        locState = 'Unknown';
      }
    }

    setPermissions({
      notifications: notifState,
      camera: camState,
      microphone: micState,
      location: locState
    });
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const requestNotification = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      checkPermissions();
    }
  };

  const requestMedia = async (type: 'camera' | 'microphone') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: type === 'camera',
        audio: type === 'microphone'
      });
      // Stop the tracks immediately as we just want the permission
      stream.getTracks().forEach(track => track.stop());
      checkPermissions();
    } catch (err) {
      console.warn(`Error requesting ${type}:`, err);
      checkPermissions();
    }
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => checkPermissions(),
        () => checkPermissions()
      );
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Allowed') return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded font-medium border border-emerald-200">Allowed</span>;
    if (status === 'Denied') return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded font-medium border border-red-200">Denied</span>;
    return <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded font-medium border border-slate-200">{status}</span>;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Permissions & Privacy</h1>
          <p className="text-slate-500 mt-1">Manage your device permissions for BIHAR BOARD</p>
        </div>
      </div>
      
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-800">
          We only request permissions when required by a specific feature. You can manage these settings at any time directly through your browser or device settings.
        </p>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mt-1 sm:mt-0 flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                  {getStatusBadge(permissions.notifications)}
                </div>
                <p className="text-sm text-slate-500">Receive alerts for live classes, test results, and important updates.</p>
              </div>
            </div>
            {permissions.notifications === 'Not Requested' && (
              <Button onClick={requestNotification} variant="outline" className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50">
                Enable Notifications
              </Button>
            )}
            {permissions.notifications === 'Denied' && (
              <p className="text-xs text-slate-400 shrink-0">Manage in browser settings</p>
            )}
          </CardContent>
        </Card>

        {/* Camera */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mt-1 sm:mt-0 flex-shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">Camera</h3>
                  {getStatusBadge(permissions.camera)}
                </div>
                <p className="text-sm text-slate-500">Required for live classes, doubt scanning, and document uploads.</p>
              </div>
            </div>
            {permissions.camera === 'Not Requested' && (
              <Button onClick={() => requestMedia('camera')} variant="outline" className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50">
                Allow Camera
              </Button>
            )}
            {permissions.camera === 'Denied' && (
              <p className="text-xs text-slate-400 shrink-0">Manage in browser settings</p>
            )}
          </CardContent>
        </Card>

        {/* Microphone */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mt-1 sm:mt-0 flex-shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">Microphone</h3>
                  {getStatusBadge(permissions.microphone)}
                </div>
                <p className="text-sm text-slate-500">Required for AI Tutor voice interactions and live class participation.</p>
              </div>
            </div>
            {permissions.microphone === 'Not Requested' && (
              <Button onClick={() => requestMedia('microphone')} variant="outline" className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50">
                Allow Microphone
              </Button>
            )}
            {permissions.microphone === 'Denied' && (
              <p className="text-xs text-slate-400 shrink-0">Manage in browser settings</p>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mt-1 sm:mt-0 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">Location</h3>
                  {getStatusBadge(permissions.location)}
                </div>
                <p className="text-sm text-slate-500">Used for regional leaderboards, offline center discovery, and network optimization.</p>
              </div>
            </div>
            {permissions.location === 'Not Requested' && (
              <Button onClick={requestLocation} variant="outline" className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50">
                Allow Location
              </Button>
            )}
            {permissions.location === 'Denied' && (
              <p className="text-xs text-slate-400 shrink-0">Manage in browser settings</p>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
