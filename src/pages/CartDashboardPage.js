import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';

const CartDashboardPage = () => {
  const { isAuthenticated, user, cartItems, removeFromCart } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your cart</h1>
          <p>Sign in to manage items in your cart.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

  const fallbackItems = [
    {
      id: 'acc-210',
      name: 'ACC 210: Managerial Accounting',
      description: 'Learn core managerial accounting concepts, interpret financial statements.',
      price: 850
    },
    {
      id: 'bus-230',
      name: 'BUS 230: Project Management',
      description: 'Learn core managerial accounting concepts, interpret financial statements.',
      price: 850
    },
    {
      id: 'bus-310',
      name: 'BUS 310: Entrepreneurship',
      description: 'Learn core managerial accounting concepts, interpret financial statements.',
      price: 850
    }
  ];

  const items = cartItems.length > 0 ? cartItems : fallbackItems;
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="dashboard__main">
      <header className="dashboard__topbar">
        <div className="dashboard__welcome">
          <h1>
            Welcome back, <span>{formattedName}!</span>
          </h1>
        </div>
        <div className="dashboard__topbar-actions">
          <div className="dashboard__search">
            <input type="text" placeholder="Search Courses" aria-label="Search courses" />
            <FiSearch />
          </div>
          <button className="dashboard__icon-btn dashboard__icon-btn--cart" type="button" aria-label="Cart" onClick={() => navigate('/shop')}>
            <FiShoppingCart />
            {cartItems.length > 0 && <span className="dashboard__cart-badge">{cartItems.length}</span>}
          </button>
          <button className="dashboard__icon-btn" type="button" aria-label="Notifications">
            <FiBell />
          </button>
          <button className="dashboard__avatar" type="button" onClick={() => navigate('/my-account')}>
            {displayInitial}
          </button>
        </div>
      </header>

      <section className="cart">
        <h2>My Cart</h2>
        <div className="cart__list">
          {items.map((item) => {
            const title = item.name && item.code ? `${item.code}: ${item.name}` : item.name;
            return (
              <div key={item.id} className="cart__item">
                <div className="cart__item-icon">ACC</div>
                <div className="cart__item-content">
                  <div className="cart__item-title">{title}</div>
                  <div className="cart__item-desc">{item.description}</div>
                <button
                  className="cart__remove"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="cart__price">${item.price}</div>
            </div>
            );
          })}
        </div>

        <div className="cart__summary">
          <div className="cart__summary-left">
            <strong>Total</strong>
          </div>
          <div className="cart__summary-right">
            <div className="cart__total">${total}</div>
            <div className="cart__note">Add 2 more courses to save with bundles</div>
          </div>
          <button className="cart__checkout" type="button" onClick={() => navigate('/payment')}>
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartDashboardPage;
