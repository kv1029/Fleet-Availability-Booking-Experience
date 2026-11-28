import { useState } from 'react';

export default function CustomerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('browse');

  const tabs = [
    { id: 'browse', label: 'Available Cars for Rent' },
    { id: 'status', label: 'Request Status' },      // Kashish
    { id: 'history', label: 'Rental History' },     // Kashish
    { id: 'profile', label: 'My Profile' },         // Kashish
  ];

  const sampleCars = [
    { id: 1, name: 'Hyundai Creta SX', type: 'SUV', price: '₹2,200/day', available: true },
    { id: 2, name: 'Maruti Swift ZXI', type: 'Hatchback', price: '₹1,200/day', available: true },
    { id: 3, name: 'Mahindra Thar 4x4', type: 'SUV', price: '₹3,500/day', available: false },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-5">
        <div className="mb-6">
          <p className="text-xs uppercase text-emerald-400 font-semibold">Customer Panel</p>
          <h2 className="text-lg font-bold truncate">{user?.name || 'Customer'}</h2>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-900 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8">
        {activeTab === 'browse' && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Cars Available to Rent</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              {sampleCars.map((car) => (
                <div key={car.id} className="p-5 bg-white rounded-xl shadow-sm border flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">
                      {car.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{car.name}</h3>
                    <p className="text-amber-600 font-semibold mt-1">{car.price}</p>
                  </div>
                  <button
                    disabled={!car.available}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold text-sm ${
                      car.available
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {car.available ? 'Request to Rent' : 'Currently Booked'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teammate Integration Slots (Kashish) */}
        {activeTab === 'status' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Booking Request Status</h2>
            <p className="text-slate-500 text-sm">Import Kashish's RequestStatus component here.</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">My Rental History</h2>
            <p className="text-slate-500 text-sm">Import Kashish's History component here.</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Customer Profile</h2>
            <p className="text-slate-600">Name: {user?.name}</p>
            <p className="text-slate-600">Email: {user?.email}</p>
          </div>
        )}
      </main>
    </div>
  );
}