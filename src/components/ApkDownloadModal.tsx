import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  Share2,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  QrCode,
  ArrowDownToLine,
  HelpCircle
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'instant' | 'apk' | 'qr';
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'apk'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'instant' | 'apk' | 'qr'>(initialTab);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Sync tab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://ais-pre-6722rqpery4v2xn4rq2dam-860955784950.asia-southeast1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentAppUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const pwabuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentAppUrl)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentAppUrl)}&color=C5A059&bgcolor=141414&margin=10`;

  return (
    <div
      id="apk-download-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg bg-[#111111] border border-[#2B2B2B] rounded-t-2xl sm:rounded-2xl text-white shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-gradient-to-r from-[#181510] via-[#141414] to-[#121212]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-[#DFC07B]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#DFC07B]">
                  MOBILE INSTALL &amp; APK
                </span>
                <span className="px-1.5 py-0.2 rounded bg-green-900/60 text-green-300 text-[9px] font-bold uppercase">
                  Ready
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-white">
                Install RELOAD CASUAL on Phone
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#252525] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#222222] bg-[#141414] px-3 pt-2 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'instant'
                ? 'border-[#C5A059] text-[#DFC07B]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Tap Install (WebAPK)</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'apk'
                ? 'border-[#C5A059] text-[#DFC07B]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Direct .APK Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'qr'
                ? 'border-[#C5A059] text-[#DFC07B]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR on Phone</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-1">
          {activeTab === 'instant' && (
            <div className="space-y-3.5">
              {/* Feature highlight */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1C1811] via-[#151515] to-[#121212] border border-[#C5A059]/40 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DFC07B]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Android WebAPK Technology
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  When installed from your mobile browser, Android automatically creates a
                  certified <strong>WebAPK</strong> with dedicated home screen icon, splash screen,
                  and standalone fullscreen experience without address bars.
                </p>
              </div>

              {/* Install Trigger Button */}
              {isInstalled ? (
                <div className="p-3 rounded-lg bg-green-950/40 border border-green-700/50 flex items-center gap-2.5 text-green-300 text-xs">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />
                  <span>RELOAD CASUAL is already installed as a standalone mobile application!</span>
                </div>
              ) : isInstallable ? (
                <button
                  onClick={install}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFC07B] via-[#C5A059] to-[#9E7D3B] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.99] transition"
                >
                  <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
                  <span>Install App on this Device Now</span>
                </button>
              ) : isIOS ? (
                <div className="p-3.5 bg-[#171717] rounded-xl border border-[#2B2B2B] space-y-2 text-xs">
                  <h4 className="font-bold text-[#DFC07B] flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    iOS Safari Installation Instructions
                  </h4>
                  <ol className="list-decimal list-inside text-gray-300 space-y-1.5 leading-relaxed pl-1">
                    <li>
                      Tap the <strong>Share</strong> button at the bottom of Safari.
                    </li>
                    <li>
                      Scroll down and select <strong>"Add to Home Screen"</strong>.
                    </li>
                    <li>
                      Tap <strong>"Add"</strong> in the top-right corner. The app icon will appear
                      on your phone.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="p-3.5 bg-[#171717] rounded-xl border border-[#2B2B2B] space-y-2.5 text-xs">
                  <h4 className="font-bold text-[#DFC07B] flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    How to install on Android Chrome / Browser
                  </h4>
                  <ol className="list-decimal list-inside text-gray-300 space-y-1.5 leading-relaxed pl-1">
                    <li>
                      Open this web app in <strong>Google Chrome</strong> on your phone.
                    </li>
                    <li>
                      Tap the <strong>three dots (⋮)</strong> menu in the upper right.
                    </li>
                    <li>
                      Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </li>
                    <li>
                      Android will generate the official <strong>WebAPK</strong> in seconds!
                    </li>
                  </ol>
                </div>
              )}

              {/* Benefits Checklist */}
              <div className="p-3 bg-[#151515] rounded-xl border border-[#222222] text-xs space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  Why Install as App?
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#DFC07B]" />
                    <span>Instant offline loading</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#DFC07B]" />
                    <span>No browser URL bar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#DFC07B]" />
                    <span>Zero phone storage waste</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#DFC07B]" />
                    <span>Automatic updates</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#171717] border border-[#2B2B2B] space-y-2">
                <h4 className="font-bold text-[#DFC07B] flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  Generate Standalone Android Package (.APK / .AAB)
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Because this application is configured with a production-ready Web App Manifest
                  and compliant icons, you can convert it into an Android <strong>.apk</strong> file
                  for manual sideloading or Google Play deployment using Microsoft's open-source
                  tool <strong>PWABuilder</strong>.
                </p>
              </div>

              {/* Step 1: Copy Link */}
              <div className="p-3 bg-[#141414] rounded-xl border border-[#222222] space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Step 1: Your Live Application URL
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentAppUrl}
                    className="flex-1 bg-[#0E0E0E] border border-[#2B2B2B] rounded-lg px-2.5 py-1.5 text-xs text-gray-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 bg-[#222222] hover:bg-[#333333] rounded-lg text-xs font-semibold text-white flex items-center gap-1 transition"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Open PWABuilder */}
              <div className="p-3 bg-[#141414] rounded-xl border border-[#222222] space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Step 2: Generate Signed APK in 60 seconds
                </span>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Click below to open PWABuilder. Tap <strong>"Package for Android"</strong>, select
                  <strong>"Download APK"</strong> or <strong>"Test APK"</strong>, and it will build
                  a signed package ready to install on any Android phone.
                </p>
                <a
                  href={pwabuilderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#C5A059] hover:bg-[#DFC07B] text-black font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <span>Open PWABuilder for Android APK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Step 3: Sideload instructions */}
              <div className="p-3 bg-[#141414] rounded-xl border border-[#222222] space-y-1.5 text-gray-300">
                <span className="text-[10px] uppercase font-bold text-[#DFC07B] block">
                  Step 3: Installing the APK on your Phone
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400">
                  <li>Download the generated <code>.apk</code> file onto your phone.</li>
                  <li>Tap the downloaded file in your Notification panel or Files app.</li>
                  <li>If prompted, allow <em>"Install unknown apps"</em> for your browser or file manager.</li>
                  <li>Tap <strong>Install</strong>, and launch RELOAD CASUAL like any native Android app!</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="text-center space-y-3 py-2">
              <div className="inline-block p-3 rounded-2xl bg-[#141414] border border-[#C5A059]/40 shadow-xl">
                <img
                  src={qrCodeUrl}
                  alt="Scan QR code to open on phone"
                  className="w-48 h-48 rounded-xl object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="max-w-xs mx-auto space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Scan with Phone Camera
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Point your smartphone camera at this QR code to instantly open the live app,
                  then tap <strong>"Install App"</strong> to place it on your home screen!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#222222] bg-[#141414] flex justify-between items-center text-xs">
          <span className="text-[11px] text-gray-500">Android &amp; iOS PWA Certified</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#252525] hover:bg-[#303030] text-gray-200 font-semibold rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
