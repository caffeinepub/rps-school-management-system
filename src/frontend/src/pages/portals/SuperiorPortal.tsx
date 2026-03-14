import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { AuditLogTable } from "../../components/shared/AuditLogTable";
import { MeshRequestModal } from "../../components/shared/MeshRequestModal";
import { useCallerProfile } from "../../hooks/useQueries";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "finances", label: "Finances" },
  { key: "academic", label: "Academic Records" },
  { key: "audit", label: "Audit Logs" },
  { key: "mesh", label: "Mesh Requests" },
];

function StatCard({ label, value }: { label: string; value?: string | null }) {
  return (
    <div
      className="border border-border rounded-sm p-4 space-y-1"
      style={{ background: "oklch(0.17 0.15 264)" }}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-display text-primary">
        {value ?? <span className="text-muted-foreground">—</span>}
      </p>
    </div>
  );
}

export default function SuperiorPortal() {
  const [section, setSection] = useState("overview");
  const { data: profile } = useCallerProfile();

  return (
    <PortalLayout
      portalRole="superior"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "overview" && (
        <div className="space-y-6" data-ocid="superior.overview_section">
          <h2 className="font-display text-2xl text-primary">
            Institution Overview
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Read-only · God-Mode Access
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Students" value={null} />
            <StatCard label="Total Staff" value={null} />
            <StatCard label="Fees Collected" value={null} />
            <StatCard label="Pending Dues" value={null} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard label="Active Sessions" value={null} />
            <StatCard label="Open Requests" value={null} />
          </div>
        </div>
      )}
      {section === "finances" && (
        <div className="space-y-6" data-ocid="superior.finances_section">
          <h2 className="font-display text-2xl text-primary">
            Financial Records
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {["Student", "Amount", "Type", "Status", "Date"].map((h) => (
                    <TableHead
                      key={h}
                      className="text-primary font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No financial records available.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "academic" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Academic Records
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {[
                    "Student",
                    "Class",
                    "Mathematics",
                    "Science",
                    "English",
                    "Hindi",
                    "Social Studies",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-primary font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No academic records available.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "audit" && (
        <div className="space-y-6" data-ocid="superior.audit_logs_section">
          <h2 className="font-display text-2xl text-primary">Audit Logs</h2>
          <p className="text-xs text-muted-foreground">
            Immutable record of all system changes.
          </p>
          <AuditLogTable entries={[]} />
        </div>
      )}
      {section === "mesh" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Mesh Requests
            </h2>
            <MeshRequestModal fromRole="superior" />
          </div>
          <div
            className="border border-border rounded-sm p-8 text-center text-muted-foreground"
            data-ocid="mesh.empty_state"
          >
            No mesh requests found.
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
