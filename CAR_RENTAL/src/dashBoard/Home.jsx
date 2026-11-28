import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [city, setCity] = useState('Agra');
  const [pickupDate, setPickupDate] = useState('');

  const featuredCars = [
    {
      name: 'Hyundai Creta SX',
      category: 'SUV • Automatic',
      price: '₹2,200',
      seats: '5 Seats',
      fuel: 'Petrol',
      tag: 'Most Booked',
    },
    {
      name: 'Maruti Swift ZXI',
      category: 'Hatchback • Manual',
      price: '₹1,200',
      seats: '5 Seats',
      fuel: 'Petrol',
      tag: 'Budget Friendly',
    },
    {
      name: 'Mahindra Thar 4x4',
      category: 'Off-Road SUV • Automatic',
      price: '₹3,500',
      seats: '4 Seats',
      fuel: 'Diesel',
      tag: 'Premium',
    },
  ];

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (user?.role === 'customer') {
      navigate('/customer-dashboard');
    } else {
      navigate('/auth?role=customer');
    }
  };

  return (
    <div className="bg-slate-950 text-white">
  
      <section
        className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 py-16 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-car.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
          <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full mb-5 backdrop-blur-sm">
            Smart Fleet & Peer-to-Peer Car Rental
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Drive Your Way, or <span className="text-amber-400">Earn From Your Fleet</span>
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl text-base md:text-lg">
            Book verified self-drive cars in minutes or list your vehicles as a retailer to manage bookings and earnings effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/auth?role=customer"
                  className="px-7 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 shadow-lg transition"
                >
                  Rent a Car (Customer)
                </Link>
                <Link
                  to="/auth?role=retailer"
                  className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 shadow-lg transition"
                >
                  List Your Car (Retailer)
                </Link>
              </>
            ) : (
              <Link
                to={user.role === 'retailer' ? '/retailer-dashboard' : '/customer-dashboard'}
                className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 shadow-lg transition"
              >
                Open {user.role === 'retailer' ? 'Retailer' : 'Customer'} Dashboard →
              </Link>
            )}
          </div>

          <form
            onSubmit={handleQuickSearch}
            className="mt-12 w-full max-w-3xl bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-3 text-left"
          >
            <div>
              <label className="block text-xs text-slate-400 mb-1">Pick-up City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Pick-up Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-sm transition"
              >
                Find Available Cars
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold text-amber-400">250+</p>
            <p className="text-sm text-slate-400 mt-1">Verified Fleet Cars</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">80+</p>
            <p className="text-sm text-slate-400 mt-1">Active Car Retailers</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-amber-400">4.9 ★</p>
            <p className="text-sm text-slate-400 mt-1">Customer Rating</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">24/7</p>
            <p className="text-sm text-slate-400 mt-1">Instant Booking Support</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Popular Choices</p>
            <h2 className="text-3xl font-bold mt-1">Featured Cars Ready to Rent</h2>
          </div>
          <Link
            to={user?.role === 'customer' ? '/customer-dashboard' : '/auth?role=customer'}
            className="text-sm text-amber-400 hover:underline mt-3 md:mt-0"
          >
            View all cars →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCars.map((car, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-amber-500/15 text-amber-300 rounded-md">
                    {car.tag}
                  </span>
                  <span className="text-xs text-slate-400">{car.seats} • {car.fuel}</span>
                </div>

                <h3 className="text-xl font-bold mt-4">{car.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{car.category}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-white">{car.price}</span>
                  <span className="text-xs text-slate-400"> / day</span>
                </div>
                <Link
                  to={user?.role === 'customer' ? '/customer-dashboard' : '/auth?role=customer'}
                  className="px-4 py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-sm font-semibold rounded-lg transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/60 border-t border-slate-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Simple Workflow</p>
            <h2 className="text-3xl font-bold mt-1">Built for Both Renters & Retailers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold mb-4">
                1
              </span>
              <h3 className="text-lg font-bold">Choose Your Role</h3>
              <p className="text-sm text-slate-400 mt-2">
                Sign up as a Customer to browse available cars, or as a Retailer to list and manage your fleet.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold mb-4">
                2
              </span>
              <h3 className="text-lg font-bold">Request or Approve</h3>
              <p className="text-sm text-slate-400 mt-2">
                Customers send rental requests with dates; Retailers review and approve them directly from their dashboard.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold mb-4">
                3
              </span>
              <h3 className="text-lg font-bold">Track History & Status</h3>
              <p className="text-sm text-slate-400 mt-2">
                Both panels maintain real-time request status, booking history with date filters, and profile details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 px-6 text-center text-sm text-slate-500">
        <p className="font-semibold text-slate-300">DriveFleet — Car Rental & Fleet Management System</p>
        <p className="mt-1">Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}