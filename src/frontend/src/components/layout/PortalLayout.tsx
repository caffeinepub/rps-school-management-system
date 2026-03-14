import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { RoleBadge } from "../shared/RoleBadge";

interface NavItem {
  label: string;
  key: string;
}

interface PortalLayoutProps {
  portalRole: string;
  navItems: NavItem[];
  activeSection: string;
  onSectionChange: (key: string) => void;
  children: React.ReactNode;
  username?: string;
}

export function PortalLayout({
  portalRole,
  navItems,
  activeSection,
  onSectionChange,
  children,
  username,
}: PortalLayoutProps) {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar flex flex-col border-r border-sidebar-border transform transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-sidebar-border">
          <p className="font-display text-primary text-xs font-semibold tracking-widest uppercase">
            RPS International
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            Sector 50, Gurugram
          </p>
          <div className="mt-3">
            <RoleBadge role={portalRole} />
          </div>
          {username && (
            <p className="text-foreground text-sm mt-2 truncate">{username}</p>
          )}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => {
                onSectionChange(item.key);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-sm text-sm transition-all duration-150 ${
                activeSection === item.key
                  ? "text-primary border-l-2 border-primary bg-sidebar-accent pl-[10px] font-medium"
                  : "text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: presentation overlay
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center gap-4 px-6 bg-background shrink-0">
          <button
            type="button"
            className="lg:hidden text-muted-foreground hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary font-medium capitalize">
              {portalRole}
            </span>
            <span>/</span>
            <span className="capitalize">
              {activeSection.replace(/_/g, " ")}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
