

// DEXY geometric background elements using your exact logo design
export default function DexyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large DEXY logo background - faded */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <DexyLogoLarge />
      </div>
      
      {/* Geometric nodes floating around */}
      <div className="absolute top-20 left-20 opacity-10">
        <DexyNode size="small" />
      </div>
      <div className="absolute top-40 right-32 opacity-15">
        <DexyNode size="medium" />
      </div>
      <div className="absolute bottom-32 left-1/4 opacity-10">
        <DexyNode size="small" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-20">
        <DexyNode size="medium" />
      </div>
      
      {/* Geometric framework elements */}
      <div className="absolute top-1/4 right-1/4 opacity-5">
        <DexyFramework />
      </div>
      <div className="absolute bottom-1/4 left-1/4 opacity-5 rotate-180">
        <DexyFramework />
      </div>
      
      {/* Gradient overlays matching your logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/10 via-transparent to-teal-950/10"></div>
    </div>
  );
}

// Large version of your DEXY logo for background
const DexyLogoLarge = () => (
  <div className="relative w-96 h-96">
    {/* Outer geometric framework */}
    <div className="absolute inset-0 border-8 border-teal-400/30 rounded-3xl rotate-12 transform scale-110">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
      <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
      <div className="absolute top-1/4 -left-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
      <div className="absolute top-1/4 -right-4 w-8 h-8 bg-teal-400/40 rounded-full"></div>
    </div>
    
    {/* Middle framework */}
    <div className="absolute inset-8 border-6 border-teal-500/40 rounded-2xl rotate-6">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-400/60 to-orange-600/60 rounded-2xl rotate-45"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-orange-500/80 to-orange-700/80 rounded-xl"></div>
      </div>
    </div>
    
    {/* Inner core */}
    <div className="absolute inset-16 border-4 border-teal-600/50 rounded-xl">
      <div className="w-full h-full bg-slate-900/60 rounded-xl"></div>
    </div>
  </div>
);

// Individual geometric nodes from your logo
const DexyNode = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };
  
  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-lg animate-pulse`}>
      <div className="w-full h-full bg-white/20 rounded-full"></div>
    </div>
  );
};

// Geometric framework element from your logo
const DexyFramework = () => (
  <div className="relative w-48 h-48">
    <div className="absolute inset-0 border-4 border-teal-400/20 rounded-2xl rotate-12">
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-teal-400/30 rounded-full"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400/30 rounded-full"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-400/30 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-teal-400/30 rounded-full"></div>
    </div>
    <div className="absolute inset-4 border-2 border-orange-400/20 rounded-xl rotate-6">
      <div className="w-full h-full bg-orange-400/10 rounded-xl"></div>
    </div>
  </div>
);