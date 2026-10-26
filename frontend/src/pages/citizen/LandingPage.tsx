import { Link } from 'react-router-dom';
import { Camera, MapPin, Cpu, Send, Search, ShieldCheck, HelpCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow selection:text-navy">
      {/* 1. Header (sticky) */}
      <header className="sticky top-0 z-50 bg-concrete/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Abstract logo/wordmark */}
            <div className="w-8 h-8 bg-navy flex items-center justify-center rounded">
              <div className="w-4 h-1 bg-yellow"></div>
            </div>
            <span className="font-display font-bold text-xl text-navy">CivicRoads</span>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/officer/login" 
              className="text-sm font-medium text-blue hover:text-blue/80 transition-colors focus-ring px-3 py-2 rounded-md"
            >
              Officer Login
            </Link>
            <Link 
              to="/admin/login" 
              className="text-sm font-medium text-blue border border-blue hover:bg-blue/5 transition-colors focus-ring px-4 py-2 rounded-md hidden sm:block"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <section 
          className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-navy"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-navy/90"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              Report a damaged road. We detect it, assess it, and route it to the right municipal officer.
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow">
              A fast, AI-powered public service to keep our civic infrastructure safe and functional. No account required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link 
                to="/report" 
                className="bg-yellow text-navy px-8 py-4 rounded font-semibold text-lg hover:bg-[#F2BD35] transition-colors focus-ring shadow-sm"
              >
                Report a Defect
              </Link>
              <Link 
                to="/track" 
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded font-semibold text-lg hover:bg-white/10 transition-colors focus-ring"
              >
                Track a Complaint
              </Link>
            </div>
            {/* Grounding Road Line Motif */}
            <div className="w-full max-w-2xl mx-auto road-line-x opacity-40 text-yellow"></div>
          </div>
        </section>

        {/* 3. What this platform is */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-6">Built for Transparency & Speed</h2>
            <p className="text-lg text-slate leading-relaxed">
              Citizens simply report road damage by taking a photo. An automated AI model detects the defect, assesses its severity, and estimates repair costs. 
              The report is instantly routed to the correct municipal officer based on GPS coordinates—with no manual sorting needed. 
              You can track progress transparently using your Complaint ID, without ever needing to create an account.
            </p>
          </div>
        </section>

        {/* 4. How it works (Timeline) */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-navy mb-16 text-center">How It Works</h2>
          
          <div className="relative max-w-5xl mx-auto">
            {/* The Road Line serving as the timeline track (hidden on small screens, vertical on md+) */}
            <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-ml-px road-line-y opacity-20"></div>

            <div className="space-y-12">
              {/* Step 01 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
                <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 pr-0 md:pr-12 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-navy mb-2">01. Snap a Photo</h3>
                  <p className="text-slate">Take or upload a clear photo of the damaged road or pothole.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-concrete border-2 border-navy rounded-full flex items-center justify-center z-10 group-hover:bg-yellow transition-colors">
                  <Camera className="text-navy w-6 h-6" />
                </div>
                <div className="md:w-5/12 order-3"></div>
              </div>

              {/* Step 02 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
                <div className="md:w-5/12 order-2 md:order-1"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-concrete border-2 border-navy rounded-full flex items-center justify-center z-10 group-hover:bg-yellow transition-colors">
                  <MapPin className="text-navy w-6 h-6" />
                </div>
                <div className="md:w-5/12 text-left order-3 pl-20 md:pl-12 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-navy mb-2">02. Auto-Location</h3>
                  <p className="text-slate">Your location is captured automatically via GPS to ensure accurate routing.</p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
                <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 pr-0 md:pr-12 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-navy mb-2">03. AI Assessment</h3>
                  <p className="text-slate">Our AI detects the defect and estimates severity and repair cost instantly.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-concrete border-2 border-navy rounded-full flex items-center justify-center z-10 group-hover:bg-yellow transition-colors">
                  <Cpu className="text-navy w-6 h-6" />
                </div>
                <div className="md:w-5/12 order-3"></div>
              </div>

              {/* Step 04 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
                <div className="md:w-5/12 order-2 md:order-1"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-concrete border-2 border-navy rounded-full flex items-center justify-center z-10 group-hover:bg-yellow transition-colors">
                  <Send className="text-navy w-6 h-6" />
                </div>
                <div className="md:w-5/12 text-left order-3 pl-20 md:pl-12 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-navy mb-2">04. Instant Routing</h3>
                  <p className="text-slate">Your complaint is instantly routed to the correct municipal officer.</p>
                </div>
              </div>

              {/* Step 05 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
                <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-20 md:pl-0 pr-0 md:pr-12 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-navy mb-2">05. Track Progress</h3>
                  <p className="text-slate">Check status updates anytime using your unique Complaint ID or mobile number.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-concrete border-2 border-navy rounded-full flex items-center justify-center z-10 group-hover:bg-yellow transition-colors">
                  <Search className="text-navy w-6 h-6" />
                </div>
                <div className="md:w-5/12 order-3"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Instructions / Tips */}
        <section className="py-16 bg-navy text-concrete">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-8 h-8 text-yellow" />
              <h2 className="text-2xl font-display font-bold">Guidelines for Reporting</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-6 text-lg">
              <li className="flex gap-3">
                <span className="text-yellow font-mono">01</span>
                <span>Take photos in clear daylight, close enough to show the defect's scale.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow font-mono">02</span>
                <span>Allow location access in your browser for accurate municipality routing.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow font-mono">03</span>
                <span>Provide a valid mobile number—it's used to securely look up your status.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow font-mono">04</span>
                <span>Submit only one defect per complaint for accurate AI estimation.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. Trust/Transparency Strip */}
        <section className="py-10 bg-yellow text-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              <span>No login required to submit or track reports.</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-navy/20"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              <span>Automatically routed to the verified local authority.</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-navy/20"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              <span>Full status transparency via Complaint ID.</span>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-concrete border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-navy flex items-center justify-center rounded">
                <div className="w-3 h-0.5 bg-yellow"></div>
              </div>
              <span className="font-display font-bold text-lg text-navy">CivicRoads</span>
            </div>
            <p className="text-sm text-slate">
              Automated road defect detection and reporting infrastructure.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <h4 className="font-bold text-navy mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate">
                <li><Link to="/report" className="hover:text-navy transition-colors focus-ring rounded">Report a Defect</Link></li>
                <li><Link to="/track" className="hover:text-navy transition-colors focus-ring rounded">Track Complaint</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-navy mb-4">Official Access</h4>
              <ul className="space-y-2 text-sm text-slate">
                <li><Link to="/officer/login" className="hover:text-blue transition-colors focus-ring rounded">Officer Login</Link></li>
                <li><Link to="/admin/dashboard" className="hover:text-blue transition-colors focus-ring rounded">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 text-xs text-slate flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} CivicRoads System.</p>
          <p className="font-mono">For official municipal use — Pilot program</p>
        </div>
      </footer>
    </div>
  );
}
