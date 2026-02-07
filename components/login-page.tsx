'use client';

import React from "react"

import { useState } from 'react';
import { Building2, Lock, Mail } from 'lucide-react';

const ROLES = [
  { id: 'admin', label: 'MMC Administrator', description: 'Full system access' },
  { id: 'ward-manager', label: 'Ward Manager', description: 'Manage ward-specific needs' },
  { id: 'field-officer', label: 'Field Officer', description: 'Verify and report needs' },
  { id: 'partner', label: 'Partner Organization', description: 'View and track projects' },
];

interface LoginPageProps {
  onLogin: (role: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('demo@example.com');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden md:block space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MMC Needs Repository</h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Community Needs Monitoring
              </h2>
              <p className="text-gray-300 text-lg">
                Track, manage, and respond to community needs across Maiduguri Municipal Council with real-time insights and data-driven decision making.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {[
                'Real-time needs tracking',
                'Geographic heat maps',
                'Multi-role access control',
                'Analytics & reporting',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-400">Select your role and access the system</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Your Role
                  </label>
                  <div className="space-y-2">
                    {ROLES.map((role) => (
                      <label
                        key={role.id}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                          selectedRole === role.id
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.id}
                          checked={selectedRole === role.id}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="w-4 h-4 accent-emerald-500"
                        />
                        <div className="ml-3">
                          <div className="text-white font-medium">{role.label}</div>
                          <div className="text-sm text-gray-400">{role.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Sign In
                </button>
              </form>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-gray-400 text-center">
                  Demo credentials pre-filled. Click Sign In to continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
