.navbar {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
}

/* Keep nav link text white */
.navbar-nav .nav-link {
  color:  white !important;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
  border-radius: 4px;
}

/* On hover */
.navbar-nav .nav-link:hover {
  color:  white;
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Active link */
.navbar-nav .nav-item.active .nav-link {
  background-color: rgba(255, 255, 255, 0.3);
  color: white !important;
}

.navbar .nav-link,
.navbar .nav-link:focus,
.navbar .nav-link:hover,
.navbar .nav-item.active .nav-link {
  color: white !important;
}
