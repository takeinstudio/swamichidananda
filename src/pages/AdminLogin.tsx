import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { isAdminAuthenticated, setAdminAuthenticated } from "@/lib/siteData";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAdminAuthenticated()) {
    navigate("/admin", { replace: true });
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setAdminAuthenticated(true);
      navigate("/admin", { replace: true });
      return;
    }
    setError("Invalid password. Please try again.");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 12% 18%, rgba(16,26,45,0.28), transparent 40%), radial-gradient(circle at 88% 82%, rgba(0,122,255,0.22), transparent 42%)" }} />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md glass-card p-8 sm:p-10 border border-border/70 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl gradient-primary-bg flex items-center justify-center mb-5">
            <ShieldCheck className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground mb-6">Secure login for Swami Chidananda Institute of Social Sciences management console.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <LockKeyhole className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="btn-secondary w-full">
              Login to Dashboard
            </button>

            <button type="button" onClick={() => navigate("/")} className="w-full px-4 py-3 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors">
              Back to Website
            </button>

            <p className="text-xs text-muted-foreground">Demo password: admin</p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
