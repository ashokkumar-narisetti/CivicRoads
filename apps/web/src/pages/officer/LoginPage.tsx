import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export default function OfficerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'officer@demo.com' && password === 'officer123') {
      navigate('/officer/dashboard');
    } else {
      setError('Invalid officer credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-concrete px-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-navy transition-colors focus-ring rounded">
          <ArrowLeft className="w-4 h-4" /> Back to Citizen Portal
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-navy p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 road-line-x opacity-10 top-1/2"></div>
          <ShieldCheck className="w-12 h-12 text-blue mx-auto mb-4 relative z-10" />
          <h2 className="text-2xl font-display font-bold text-white relative z-10">Officer Portal</h2>
          <p className="text-blue/80 mt-2 text-sm relative z-10 font-mono">Restricted Access</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red/10 border border-red/20 text-red text-sm p-3 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Official Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="officer@demo.com" 
              className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue text-white py-3 rounded font-bold hover:bg-blue/90 transition-colors focus-ring shadow-sm"
          >
            Authenticate
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 font-mono">Demo: officer@demo.com / officer123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
