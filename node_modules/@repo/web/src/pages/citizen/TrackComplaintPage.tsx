import { useState } from 'react';
import { Link } from 'react-router-dom';
import { citizenApi } from '../../lib/api';
import { Search, ArrowLeft, Clock, FileSearch, CheckCircle2, AlertTriangle, Truck } from 'lucide-react';
import clsx from 'clsx';

const STATUS_ORDER = ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'];

const StatusIcon = ({ status, active }: { status: string, active: boolean }) => {
  const props = { className: clsx("w-5 h-5", active ? "text-navy" : "text-slate-400") };
  switch (status) {
    case 'SUBMITTED': return <Clock {...props} />;
    case 'UNDER_REVIEW': return <FileSearch {...props} />;
    case 'ASSIGNED': return <AlertTriangle {...props} />;
    case 'IN_PROGRESS': return <Truck {...props} />;
    case 'COMPLETED': return <CheckCircle2 {...props} />;
    default: return <Clock {...props} />;
  }
};

export default function TrackComplaintPage() {
  const [query, setQuery] = useState('');
  const [complaints, setComplaints] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await citizenApi.trackComplaint(query.trim());
      setComplaints(res.data.data);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
      alert('Error fetching complaints');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-concrete py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate hover:text-navy transition-colors mb-6 focus-ring rounded">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-navy text-concrete">
            <h1 className="text-2xl font-display font-bold mb-2">Track Complaint</h1>
            <p className="text-slate-300">Enter your Complaint ID or mobile number to see real-time status.</p>
          </div>
          
          <form onSubmit={handleSearch} className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. RD2026123456 or +9198..."
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow font-mono"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-yellow text-navy px-8 py-3 rounded font-bold hover:bg-[#F2BD35] transition-colors focus-ring disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
        </div>

        {hasSearched && complaints.length === 0 && (
          <div className="text-center py-12 bg-white rounded border border-slate-200 text-slate">
            No complaints found matching "{query}".
          </div>
        )}

        <div className="space-y-8">
          {complaints.map(complaint => {
            const currentIdx = STATUS_ORDER.indexOf(complaint.status);
            const isRejected = complaint.status === 'REJECTED';

            return (
              <div key={complaint.id} className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate mb-1">Complaint ID</p>
                    <p className="font-mono text-xl font-bold text-navy">{complaint.complaintCode}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-slate mb-1">Filed On</p>
                    <p className="font-mono text-navy">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-b border-slate-100 grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">AI Defect Type</p>
                    <p className="text-navy font-medium">{complaint.defectType || 'Pending Assessment'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">Severity</p>
                    <p className={clsx("font-medium font-mono", 
                      complaint.severity === 'CRITICAL' ? 'text-red' : 'text-navy'
                    )}>
                      {complaint.severity || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">Municipality</p>
                    <p className="text-navy font-medium">{complaint.municipality?.name || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="p-6 md:p-8 relative">
                  <h3 className="font-display font-bold text-navy mb-8">Status Timeline</h3>
                  
                  {isRejected ? (
                    <div className="bg-red/10 border border-red/20 rounded p-4 text-red flex gap-3">
                      <AlertTriangle className="w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">Complaint Rejected</p>
                        <p className="text-sm mt-1">This complaint was reviewed and marked as rejected. It may be out of jurisdiction or a duplicate.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Motif Road Line as background track */}
                      <div className="absolute top-5 left-6 right-6 road-line-x opacity-20 -z-10 hidden sm:block"></div>
                      
                      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-0">
                        {STATUS_ORDER.map((statusStep, idx) => {
                          const isReached = currentIdx >= idx;
                          const isCurrent = currentIdx === idx;
                          
                          return (
                            <div key={statusStep} className="flex sm:flex-col items-center sm:w-1/5 gap-4 sm:gap-3 text-left sm:text-center">
                              {/* Mobile line connector */}
                              {idx !== 0 && (
                                <div className={clsx(
                                  "absolute left-[23px] -top-6 bottom-6 w-0.5 sm:hidden -z-10",
                                  isReached ? "bg-navy" : "road-line-y opacity-20"
                                )}></div>
                              )}
                              
                              <div className={clsx(
                                "w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white z-10 transition-colors duration-500",
                                isCurrent ? "border-yellow ring-4 ring-yellow/20" : 
                                isReached ? "border-navy" : "border-slate-200"
                              )}>
                                <StatusIcon status={statusStep} active={isReached} />
                              </div>
                              
                              <div>
                                <p className={clsx(
                                  "font-semibold text-sm",
                                  isReached ? "text-navy" : "text-slate-400"
                                )}>
                                  {statusStep.replace('_', ' ')}
                                </p>
                                {isCurrent && (
                                  <p className="text-xs text-slate font-mono mt-1">Current phase</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
