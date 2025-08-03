import React from "react";

export const ModelViewer: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-light mb-4">3D Model Viewer</p>
        <p className="text-sm text-black/60">Interactive model coming soon</p>
        <div className="mt-8 grid grid-cols-2 gap-8 max-w-md mx-auto text-left">
          <div>
            <p className="text-sm text-black/40 uppercase tracking-wider mb-1">
              Range
            </p>
            <p className="text-lg">7,500 nm</p>
          </div>
          <div>
            <p className="text-sm text-black/40 uppercase tracking-wider mb-1">
              Speed
            </p>
            <p className="text-lg">Mach 0.925</p>
          </div>
          <div>
            <p className="text-sm text-black/40 uppercase tracking-wider mb-1">
              Cabin Height
            </p>
            <p className="text-lg">6.2 ft</p>
          </div>
          <div>
            <p className="text-sm text-black/40 uppercase tracking-wider mb-1">
              Passengers
            </p>
            <p className="text-lg">14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
