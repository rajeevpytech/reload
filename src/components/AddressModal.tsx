import React, { useState } from 'react';
import { X, MapPin, Plus, Check, Trash2, Home, Briefcase, Building } from 'lucide-react';
import { UserAddress } from '../types';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: UserAddress[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  onAddAddress: (newAddr: Omit<UserAddress, 'id' | 'isDefault'>) => void;
  onDeleteAddress: (id: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onDeleteAddress
}) => {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [name, setName] = useState<string>('Rajeev Sharma');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [addressLine, setAddressLine] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [type, setType] = useState<'HOME' | 'WORK' | 'OTHER'>('HOME');
  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !addressLine.trim() || !city.trim() || !pincode.trim()) {
      setFormError('Please fill in all address fields.');
      return;
    }
    if (pincode.trim().length < 6) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    onAddAddress({
      name: name.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      type
    });

    setIsAddingNew(false);
    setAddressLine('');
    setCity('');
    setPincode('');
    setFormError('');
  };

  return (
    <div id="address-modal-backdrop" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#121212] border border-[#262626] rounded-t-2xl sm:rounded-xl text-white shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#151515]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-sm font-bold text-white">Delivery Addresses</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#222222]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {!isAddingNew ? (
            <>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Select delivery destination:</span>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#DFC07B] hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {addresses.map((addr) => {
                  const isSelected = addr.id === selectedAddressId;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => onSelectAddress(addr.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#1C1811] shadow-md'
                          : 'border-[#262626] bg-[#161616] hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-[#C5A059] bg-[#C5A059]'
                                : 'border-gray-500 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                          </span>
                          <span className="text-xs font-bold text-white">{addr.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#252525] text-[#C5A059] font-semibold flex items-center gap-1">
                            {addr.type === 'HOME' && <Home className="w-2.5 h-2.5" />}
                            {addr.type === 'WORK' && <Briefcase className="w-2.5 h-2.5" />}
                            {addr.type === 'OTHER' && <Building className="w-2.5 h-2.5" />}
                            {addr.type}
                          </span>
                        </div>

                        {addresses.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteAddress(addr.id);
                            }}
                            className="text-gray-500 hover:text-red-400 p-1"
                            title="Delete address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-300 mt-2 pl-6 leading-relaxed">
                        {addr.addressLine}
                      </p>
                      <p className="text-[11px] text-gray-400 pl-6 mt-0.5">
                        {addr.city} — {addr.pincode}
                      </p>
                      <p className="text-[10px] text-gray-500 pl-6 mt-0.5">Phone: {addr.phone}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmitNew} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
                <h4 className="text-xs font-bold text-[#DFC07B] uppercase tracking-wider">
                  Add New Delivery Address
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="p-2 bg-red-950/60 border border-red-800 rounded text-red-300 text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="Recipient name"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="+91 Mobile number"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">
                  Flat, Suite, Building, Street
                </label>
                <textarea
                  rows={2}
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  placeholder="e.g. Penthouse 802, Prestige Ocean Pearl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">City, State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="Mumbai, Maharashtra"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="400050"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">Address Label</label>
                <div className="flex gap-2">
                  {(['HOME', 'WORK', 'OTHER'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded border ${
                        type === t
                          ? 'bg-[#C5A059] text-black border-[#C5A059]'
                          : 'bg-[#181818] text-gray-400 border-[#2A2A2A]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#C5A059] hover:bg-[#DFC07B] text-black text-xs font-bold uppercase tracking-wider rounded mt-2 shadow-lg"
              >
                Save & Use Address
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#222222] bg-[#151515] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#262626] hover:bg-[#333333] text-xs font-semibold text-white rounded"
          >
            Confirm & Close
          </button>
        </div>
      </div>
    </div>
  );
};
