import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('carRentalUser');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shadow">
      <Link to="/" className="text-xl font-bold tracking-wide text-amber-400">
        DriveFleet
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-amber-300">Home</Link>

        {!user ? (
          <Link
            to="/auth"
            className="px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400"
          >
            Login / Sign Up
          </Link>
        ) : (
          <>
            <Link
              to={user.role === 'retailer' ? '/retailer-dashboard' : '/customer-dashboard'}
              className="hover:text-amber-300"
            >
              Dashboard ({user.role})
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 rounded hover:bg-red-500 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}