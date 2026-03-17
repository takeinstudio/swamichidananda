import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, setAdminAuthenticated } from "@/lib/siteData";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Faculty", href: "/faculty" },
  { label: "Facilities", href: "/facilities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Payments", href: "/payments" },
  { label: "Contact", href: "/contact" },
];

const getPageTitle = (pathname: string) => {
  const link = navLinks.find((l) => l.href === pathname);
  return link ? link.label : "Page";
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(isAdminAuthenticated());
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";
  const useLightHomeStyle = isHomePage && !scrolled;
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setAdminAuthed(isAdminAuthenticated());
  }, [pathname]);

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setAdminAuthed(false);
    setAdminMenuOpen(false);
    if (pathname === "/admin") {
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-white/10"
          : useLightHomeStyle
            ? "bg-[#101a2d] backdrop-blur-xl shadow-md border-b border-white/10"
            : "bg-transparent"
      }`}
    >
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 bg-white/90">
              <img src="/marketing/logo.jpeg" alt="Swami Chidananda Institute logo" className="w-full h-full object-cover" loading="eager" />
            </div>
            <div className="hidden sm:block">
              {isHomePage ? (
                <>
                  <span className={`font-heading font-bold text-sm leading-tight block ${scrolled ? "text-white" : useLightHomeStyle ? "text-white" : "text-foreground"}`}>
                    Swami Chidananda
                  </span>
                  <span className={`font-heading font-bold text-sm leading-tight block ${scrolled ? "text-white" : useLightHomeStyle ? "text-white" : "text-foreground"}`}>
                    Institute of Social Sciences
                  </span>
                  <span className={`text-xs ${scrolled ? "text-white/70" : useLightHomeStyle ? "text-white/70" : "text-muted-foreground"}`}>Bhubaneswar</span>
                </>
              ) : (
                <>
                  <span className={`font-heading font-bold text-sm leading-tight block ${scrolled ? "text-white" : useLightHomeStyle ? "text-white" : "text-foreground"}`}>
                    {pageTitle}
                  </span>
                  <span className={`text-xs ${scrolled ? "text-white/70" : useLightHomeStyle ? "text-white/70" : "text-muted-foreground"}`}>Swami Chidananda Institute</span>
                </>
              )}
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors rounded-lg after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1.5 after:h-0.5 after:origin-left after:transition-transform after:duration-300 after:ease-out ${
                    isActive
                      ? `${scrolled ? "text-white" : useLightHomeStyle ? "text-white" : "text-foreground"} after:scale-x-100 after:bg-secondary`
                      : scrolled
                        ? "text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100 after:bg-white/80"
                        : useLightHomeStyle
                          ? "text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100 after:bg-white/80"
                          : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100 after:bg-foreground/70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/apply-now"
              className="hidden sm:inline-flex items-center justify-center h-11 min-w-[140px] px-6 rounded-md whitespace-nowrap font-heading font-semibold text-sm text-secondary-foreground transition-all duration-300 gradient-secondary-bg hover:brightness-110"
            >
              Apply Now
            </Link>
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAdminMenuOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center w-11 h-11 rounded-md border transition-colors ${scrolled || useLightHomeStyle ? "border-white/20 text-white hover:bg-white/10" : "border-border text-foreground hover:bg-muted"}`}
                aria-label="Admin options"
              >
                <User className="w-5 h-5" />
              </button>
              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl p-2 z-50">
                  {!adminAuthed && (
                    <button type="button" onClick={() => { setAdminMenuOpen(false); navigate("/admin-login"); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                      Admin Login
                    </button>
                  )}
                  {adminAuthed && (
                    <>
                      <button type="button" onClick={() => { setAdminMenuOpen(false); navigate("/admin"); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                        Open Admin Dashboard
                      </button>
                      <button type="button" onClick={handleAdminLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "hover:bg-white/20 text-white" : useLightHomeStyle ? "hover:bg-white/20 text-white" : "hover:bg-muted/50 text-foreground"}`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `relative block px-4 py-3 text-sm font-medium rounded-xl transition-colors after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-2 after:h-0.5 after:origin-left after:transition-transform after:duration-300 after:ease-out ${
                      isActive
                        ? "text-white bg-white/20 after:scale-x-100 after:bg-secondary"
                        : "text-white/70 hover:text-white hover:bg-white/20 after:scale-x-0 hover:after:scale-x-100 after:bg-white/80"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/apply-now"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 h-11 rounded-md text-center text-sm font-heading font-semibold text-secondary-foreground gradient-secondary-bg leading-[44px]"
              >
                Apply Now
              </Link>
              {!adminAuthed && (
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); navigate("/admin-login"); }}
                  className="block w-full mt-2 h-11 rounded-md text-center text-sm font-heading font-semibold text-white bg-primary"
                >
                  Admin Login
                </button>
              )}
              {adminAuthed && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full mt-2 h-11 rounded-md text-center text-sm font-heading font-semibold text-white bg-primary leading-[44px]"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setMobileOpen(false); handleAdminLogout(); }}
                    className="block w-full mt-2 h-11 rounded-md text-center text-sm font-heading font-semibold text-red-500 bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
