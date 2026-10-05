import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import './nav.css'
const NavBar = () => {

  const { user, setUser } = useContext(UserContext)

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav className="navbar">
      <div className="container px-0">
        <div className="nav-content">

          <Link to="/" className="nav-logo">
            <img
              src="/images/bakery.png"
              alt="ArtBakery"
            />
          </Link>

          <div className="nav-links desktop-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/posts" className="nav-link">
              Gallery
            </Link>

            <Link to="/request" className="nav-link">
              Request Order
            </Link>
            <Link to="/requests" className="nav-link">
              My Requests
            </Link>


            <Link to="/orders" className="nav-link">
              My Orders
            </Link>
          </div>

          {user ? (
            <div className="auth-column desktop-nav">
              <span className="nav-greeting">
                Hello {user.username}
              </span>

              <Link
                to="/"
                onClick={handleSignOut}
                className="auth-signout"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="auth-column desktop-nav">
              <Link to="/sign-up" className="auth-signup">
                Sign Up
              </Link>

              <Link to="/sign-in" className="auth-signin">
                Sign In
              </Link>
            </div>
          )}

          <button
            className="navbar-toggler mobile-menu-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            aria-label="Open navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileMenuLabel">
              ArtBakery
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">

            <div className="mobile-nav-links">
              <Link
                to="/"
                className="mobile-nav-link"
              >
                Home
              </Link>

              <Link
                to="/posts"
                className="mobile-nav-link"
              >
                Gallery
              </Link>

              <Link
                to="/request"
                className="mobile-nav-link"

              >
                Request Order
              </Link>
              <Link
                to="/requests"
                className="mobile-nav-link"
              >
                My Requests
              </Link>
              <Link
                to="/orders"
                className="mobile-nav-link"
              >
                My Orders
              </Link>
            </div>

            <div className="mobile-auth">
              {user ? (
                <>
                  <span className="mobile-greeting">
                    Hello {user.username}
                  </span>

                  <Link
                    to="/"
                    onClick={handleSignOut}
                    className="mobile-auth-signout"                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="mobile-auth-signup">
                    Sign Up
                  </Link>

                  <Link
                    to="/sign-in"
                    className="mobile-auth-signin"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </nav>
  )




};


export default NavBar;