import { useState } from 'react';

export default function RetailerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Fleet Overview (Dummy)' },
    { id: 'car-add', label: 'Add New Car' },        // Krishna Jain
    { id: 'requests', label: 'Booking Requests' },  // Krishna Jain
    { id: 'history', label: 'Rental History' },     // Kumkum Budholiya
    { id: 'profile', label: 'Retailer Profile' },   // Kanishka
  ];

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-5">
        <div className="mb-6">
          <p className="text-xs uppercase text-amber-400 font-semibold">Retailer Panel</p>
          <h2 className="text-lg font-bold truncate">{user?.name || 'Car Owner'}</h2>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-900 font-semibold'
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
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Fleet Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-5 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-slate-500">Total Listed Cars</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">4</p>
              </div>
              <div className="p-5 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-slate-500">Pending Requests</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">2</p>
              </div>
              <div className="p-5 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-slate-500">Completed Trips</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">18</p>
              </div>
            </div>
          </div>
        )}

        {/* Teammate Integration Slots */}
        {activeTab === 'car-add' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Add Car Module</h2>
            <p className="text-slate-500 text-sm">Import Krishna's CarAdd component here.</p>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Customer Requests</h2>
            <p className="text-slate-500 text-sm">Import Krishna's Request component here.</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Booking History (With Date Filter)</h2>
            <p className="text-slate-500 text-sm">Import Kumkum's History component here.</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-6 bg-white rounded-xl border">
            <h2 className="text-xl font-bold mb-2">Retailer Profile</h2>
            <p className="text-slate-600">Name: {user?.name}</p>
            <p className="text-slate-600">Email: {user?.email}</p>
          </div>
        )}
      </main>
    </div>
  );
}