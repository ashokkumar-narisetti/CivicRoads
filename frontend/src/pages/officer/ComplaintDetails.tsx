import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, User, Phone, Image as ImageIcon, 
  Cpu, Target, AlertTriangle, Wallet, CheckCircle2, 
  Clock, Truck, HardHat, Search, UserPlus
} from 'lucide-react';
import clsx from 'clsx';

// MOCK DATA
const COMPLAINT = {
  id: 'RD2026101',
  status: 'ASSIGNED',
  citizen: { name: 'Aarav Patel', phone: '+91 98765 43211' },
  location: { address: 'Sector 4, Main Street, Near Metro Station', lat: 28.6139, lng: 77.2090 },
  ai: { defect: 'Pothole', confidence: 94.2, severity: 'CRITICAL', dimensions: '1.2m x 0.8m x 0.15m', cost: '₹4,500' },
  engineer: { name: 'Suresh Kumar', id: 'ENG-842', phone: '+91 99887 77665', assignedAt: 'Aug 04, 10:30 AM', expectedCompletion: 'Aug 06, 05:00 PM' }
};

const TIMELINE = [
  { status: 'SUBMITTED', date: 'Aug 03, 09:30 AM', remarks: 'Complaint filed by citizen.', active: true },
  { status: 'UNDER_REVIEW', date: 'Aug 03, 09:35 AM', remarks: 'AI assessment complete. Flagged for officer review.', active: true },
  { status: 'ACCEPTED', date: 'Aug 04, 09:00 AM', remarks: 'AI results verified by Rajesh Kumar.', active: true },
  { status: 'ASSIGNED', date: 'Aug 04, 10:30 AM', remarks: 'Assigned to Suresh Kumar (Field Engineer).', active: true },
  { status: 'IN_PROGRESS', date: '-', remarks: 'Pending', active: false },
  { status: 'COMPLETED', date: '-', remarks: 'Pending', active: false },
];

export default function ComplaintDetails() {
  const { id } = useParams();
  
  // Verification State
  const [isVerified, setIsVerified] = useState(true); // Mocking that it's already verified based on timeline
  const [defectType, setDefectType] = useState(COMPLAINT.ai.defect);
  const [severity, setSeverity] = useState(COMPLAINT.ai.severity);
  
  // Status State
  const [currentStatus, setCurrentStatus] = useState(COMPLAINT.status);
  const [statusRemark, setStatusRemark] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link to="/officer/complaints" className="p-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors focus-ring">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-bold text-navy">Complaint {id || COMPLAINT.id}</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue/10 text-blue border border-blue/20">
              {currentStatus}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Submitted on Aug 03, 2026</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Citizen, Location, AI Verification */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Row 1: Citizen & Location */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Citizen Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-navy font-medium">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><User className="w-4 h-4 text-slate-500"/></div>
                  {COMPLAINT.citizen.name}
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><Phone className="w-4 h-4 text-slate-500"/></div>
                  {COMPLAINT.citizen.phone}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Location</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-navy font-medium text-sm">
                  <MapPin className="w-5 h-5 text-red shrink-0" />
                  {COMPLAINT.location.address}
                </div>
                <p className="text-xs text-slate-400 font-mono pl-7">
                  {COMPLAINT.location.lat}, {COMPLAINT.location.lng}
                </p>
                <div className="pl-7 mt-2">
                  <button className="text-xs text-blue font-semibold hover:underline">View on Google Maps</button>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Evidence */}
          <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Uploaded Evidence
            </h3>
            <div className="h-64 bg-slate-100 rounded border border-slate-200 flex items-center justify-center relative overflow-hidden group">
               {/* Placeholder for the actual uploaded image */}
               <div className="absolute inset-0 bg-navy/5 flex items-center justify-center">
                 <p className="font-mono text-slate-400">Citizen Uploaded Photo.jpg</p>
               </div>
               {/* AI Bounding box mockup */}
               <div className="absolute border-2 border-yellow border-dashed w-1/3 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow/10">
                 <div className="absolute -top-6 left-0 bg-yellow text-navy text-[10px] font-bold px-2 py-0.5">AI DETECTED: POTHOLE</div>
               </div>
            </div>
          </div>

          {/* AI Verification Module */}
          <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-navy text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Cpu className="w-5 h-5 text-blue" /> AI Analysis & Verification</h3>
              {isVerified ? (
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </span>
              ) : (
                <span className="bg-yellow/20 text-yellow px-3 py-1 rounded-full text-xs font-bold border border-yellow/50">
                  PENDING REVIEW
                </span>
              )}
            </div>
            
            <div className="p-5 grid sm:grid-cols-2 gap-8">
              {/* AI Raw Output */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">AI Prediction</h4>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1 flex items-center gap-1"><Target className="w-3.5 h-3.5"/> Defect Type</p>
                    <p className="font-bold text-navy">{COMPLAINT.ai.defect}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5"/> Severity</p>
                    <p className="font-bold text-red">{COMPLAINT.ai.severity}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Dimensions</p>
                    <p className="font-mono text-navy font-semibold">{COMPLAINT.ai.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1 flex items-center gap-1"><Wallet className="w-3.5 h-3.5"/> Est. Cost</p>
                    <p className="font-mono text-navy font-semibold">{COMPLAINT.ai.cost}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${COMPLAINT.ai.confidence}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 text-right">{COMPLAINT.ai.confidence}% Confidence</p>
                </div>
              </div>

              {/* Officer Overrides */}
              <div className="space-y-4 pl-0 sm:pl-8 sm:border-l border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Officer Verification</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">Verified Defect Type</label>
                    <select 
                      value={defectType}
                      onChange={(e) => setDefectType(e.target.value)}
                      disabled={isVerified}
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue bg-white disabled:bg-slate-50"
                    >
                      <option>Pothole</option>
                      <option>Cracked Road</option>
                      <option>Waterlogging</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1">Verified Severity</label>
                    <select 
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      disabled={isVerified}
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue bg-white disabled:bg-slate-50"
                    >
                      <option>CRITICAL</option>
                      <option>HIGH</option>
                      <option>MEDIUM</option>
                      <option>LOW</option>
                    </select>
                  </div>
                  {!isVerified && (
                    <button 
                      onClick={() => setIsVerified(true)}
                      className="w-full bg-blue text-white py-2 rounded text-sm font-bold hover:bg-blue/90 transition-colors focus-ring mt-2"
                    >
                      Confirm AI Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Engineer, Status, Timeline */}
        <div className="space-y-6">
          
          {/* Engineer Assignment Module */}
          <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><HardHat className="w-4 h-4" /> Field Engineer</span>
              <button className="text-blue hover:underline capitalize text-xs">Change</button>
            </h3>
            
            <div className="bg-slate-50 border border-slate-200 rounded p-4 flex gap-4 items-center">
              <div className="w-10 h-10 rounded bg-blue/10 text-blue flex items-center justify-center font-bold text-lg">SK</div>
              <div>
                <p className="font-bold text-navy">{COMPLAINT.engineer.name}</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{COMPLAINT.engineer.id} | {COMPLAINT.engineer.phone}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <p className="text-slate-400">Assigned Date</p>
                <p className="font-semibold text-navy mt-0.5">{COMPLAINT.engineer.assignedAt}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <p className="text-slate-400">Expected ETA</p>
                <p className="font-semibold text-navy mt-0.5">{COMPLAINT.engineer.expectedCompletion}</p>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Update Progress
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">New Status</label>
                <select 
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue bg-white"
                >
                  <option value="ASSIGNED">Assigned to Engineer</option>
                  <option value="IN_PROGRESS">Work In Progress</option>
                  <option value="COMPLETED">Repair Completed</option>
                  <option value="CLOSED">Closed / Verified</option>
                  <option value="REJECTED">Rejected (Invalid)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Officer Remarks (Required)</label>
                <textarea 
                  value={statusRemark}
                  onChange={(e) => setStatusRemark(e.target.value)}
                  placeholder="Enter notes for this status change..."
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue bg-white resize-none h-20"
                ></textarea>
              </div>
              <button 
                disabled={!statusRemark}
                className="w-full bg-navy text-white py-2 rounded text-sm font-bold hover:bg-navy/90 transition-colors focus-ring disabled:opacity-50"
              >
                Update Status Record
              </button>
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white p-5 rounded shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Complaint History
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {TIMELINE.map((event, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={clsx(
                    "flex items-center justify-center w-5 h-5 rounded-full border-2 bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow",
                    event.active ? "border-blue" : "border-slate-300"
                  )}>
                    {event.active && <div className="w-2 h-2 bg-blue rounded-full"></div>}
                  </div>
                  
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded shadow-sm border border-slate-100 bg-slate-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className={clsx("font-bold text-xs uppercase tracking-wider", event.active ? "text-navy" : "text-slate-400")}>{event.status}</span>
                      <span className="text-[10px] font-mono text-slate-400">{event.date}</span>
                    </div>
                    <p className={clsx("text-xs", event.active ? "text-slate-600" : "text-slate-400")}>{event.remarks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
