import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Auth({ setUser }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer'); // 'customer' | 'retailer'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const queryRole = searchParams.get('role');
    if (queryRole === 'retailer' || queryRole === 'customer') {
      setRole(queryRole);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    if (isLogin) {
      const found = users.find(
        (u) => u.email === formData.email && u.password === formData.password && u.role === role
      );
      if (!found) {
        setError(`Invalid credentials or no ${role} account found with this email.`);
        return;
      }
      localStorage.setItem('carRentalUser', JSON.stringify(found));
      setUser(found);
      navigate(found.role === 'retailer' ? '/retailer-dashboard' : '/customer-dashboard');
    } else {
      if (!formData.name.trim()) {
        setError('Name is required for sign up.');
        return;
      }
      const exists = users.some((u) => u.email === formData.email && u.role === role);
      if (exists) {
        setError(`A ${role} account with this email already exists.`);
        return;
      }
      const newUser = { id: Date.now(), ...formData, role };
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      localStorage.setItem('carRentalUser', JSON.stringify(newUser));
      setUser(newUser);
      navigate(role === 'retailer' ? '/retailer-dashboard' : '/customer-dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 text-sm font-semibold rounded-md transition ${
              role === 'customer' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Customer (Renter)
          </button>
          <button
            type="button"
            onClick={() => setRole('retailer')}
            className={`py-2 text-sm font-semibold rounded-md transition ${
              role === 'retailer' ? 'bg-amber-500 text-slate-900' : 'text-slate-600'
            }`}
          >
            Retailer (Car Giver)
          </button>
        </div>

        {error && (
          <p className="mt-4 p-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Kirti Vardhan"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
          >
            {isLogin ? `Login as ${role === 'retailer' ? 'Retailer' : 'Customer'}` : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="font-semibold text-amber-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}