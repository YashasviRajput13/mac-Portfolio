import React, { useEffect, useRef } from "react";

export default function VSCode() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const goBack = () => {
    window.history.back();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      // Undo functionality - you can add custom undo logic here
      console.log('Undo triggered');
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow?.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (iframe) {
        iframe.contentWindow?.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <div className="relative size-full">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="fixed top-8 left-8 z-50 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg border border-gray-600"
        title="Go Back (Alt+Left Arrow)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 1.414l-4-4a1 1 0 01-1.414-1.414L4.586 9H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001 1v3a1 1 0 001-1h-3a1 1 0 00-1-1v-3a1 1 0 00-1-1h10a1 1 0 001 1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Undo Hint */}
      <div className="fixed top-8 right-8 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-600">
        <div className="flex items-center space-x-1">
          <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">Ctrl</kbd>
          <span className="text-xs">+</span>
          <kbd className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">Z</kbd>
        </div>
        <div className="text-xs mt-1 text-gray-400">Undo</div>
      </div>

      {/* VSCode Iframe */}
      <iframe
        ref={iframeRef}
        className="size-full bg-[#202020]"
        src="https://github1s.com/YashasviRajput13/playground-macos/blob/main/README.md"
        title="VSCode"
      />
    </div>
  );
}
