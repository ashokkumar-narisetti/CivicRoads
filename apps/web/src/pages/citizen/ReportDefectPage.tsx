import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { citizenApi } from '../../lib/api';
import { Camera, MapPin, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ReportDefectPage() {
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleGetLocation = () => {
    setLocationStatus('locating');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latInput = document.getElementById('latitude') as HTMLInputElement;
          const lngInput = document.getElementById('longitude') as HTMLInputElement;
          if (latInput && lngInput) {
            latInput.value = position.coords.latitude.toString();
            lngInput.value = position.coords.longitude.toString();
          }
          setLocationStatus('success');
        },
        (error) => {
          console.error(error);
          setLocationStatus('error');
          alert('Unable to access location. Please enter coordinates manually if known, or ensure location services are enabled.');
        }
      );
    } else {
      setLocationStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      
      // Fallback if not populated
      if (!form.get('latitude')) form.set('latitude', '28.6139');
      if (!form.get('longitude')) form.set('longitude', '77.2090');
      
      const res = await citizenApi.reportDefect(form);
      alert(`Complaint created! ID: ${res.data.data.complaintCode}`);
      navigate('/track');
    } catch (error) {
      console.error(error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-concrete py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate hover:text-navy transition-colors mb-6 focus-ring rounded">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-navy p-6 md:p-8 text-concrete relative overflow-hidden">
            <div className="absolute top-0 right-10 bottom-0 road-line-y opacity-20 hidden sm:block"></div>
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Report a Defect</h1>
            <p className="text-slate-300">Submit a photo and location. Our AI will handle the rest.</p>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                  <input 
                    name="citizenName" 
                    required 
                    placeholder="e.g. Jane Doe"
                    className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Mobile Number</label>
                  <input 
                    name="citizenMobile" 
                    required 
                    placeholder="+91 98765 43210"
                    className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all font-mono" 
                  />
                  <p className="text-xs text-slate mt-1">Used to track your complaint later.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Defect Photo</label>
                <div className="border-2 border-dashed border-slate-300 rounded p-8 text-center hover:bg-slate-50 transition-colors relative cursor-pointer focus-within:border-yellow focus-within:ring-1 focus-within:ring-yellow">
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    required 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <Camera className="w-8 h-8 text-slate mx-auto mb-3" />
                  <p className="text-navy font-medium">Tap to take a photo or upload</p>
                  <p className="text-sm text-slate mt-1">Make sure the damage is clearly visible</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Location</label>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={handleGetLocation}
                    className="flex-1 bg-concrete border border-slate-300 text-navy py-3 px-4 rounded font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 focus-ring"
                  >
                    <MapPin className="w-5 h-5" />
                    {locationStatus === 'locating' ? 'Locating...' : locationStatus === 'success' ? 'Location Captured' : 'Get Current Location'}
                  </button>
                </div>
                {locationStatus === 'error' && (
                  <p className="text-xs text-red mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Could not get location. Ensure GPS is on.
                  </p>
                )}
                <input type="hidden" name="latitude" id="latitude" />
                <input type="hidden" name="longitude" id="longitude" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Additional Description (Optional)</label>
                <textarea 
                  name="description" 
                  placeholder="Any landmarks or extra details?"
                  className="w-full border border-slate-300 rounded p-3 h-24 focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all resize-none" 
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow text-navy py-4 rounded font-bold text-lg hover:bg-[#F2BD35] transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Report...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
