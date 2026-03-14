import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgePercent, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { ChatThread } from "../../components/shared/ChatThread";
import { MeshRequestModal } from "../../components/shared/MeshRequestModal";
import { useCallerProfile } from "../../hooks/useQueries";

const NAV = [
  { key: "fees", label: "Fee Summary" },
  { key: "children", label: "My Children" },
  { key: "progress", label: "Progress" },
  { key: "chat", label: "Chat" },
  { key: "mesh", label: "Mesh Requests" },
];

export default function ParentPortal() {
  const [section, setSection] = useState("fees");
  const { data: profile } = useCallerProfile();

  return (
    <PortalLayout
      portalRole="parent"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "fees" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Fee Summary</h2>
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="parent.fee_table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {[
                    "Child",
                    "Class",
                    "Fee Type",
                    "Amount",
                    "Status",
                    "Due Date",
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
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="parent.fee_table.empty_state"
                  >
                    No fee records available.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="border border-primary/20 rounded-sm p-4 bg-card flex items-center gap-3">
            <BadgePercent className="w-5 h-5 text-primary" />
            <div>
              <p className="text-foreground text-sm font-medium">
                Sibling Discount
              </p>
              <p className="text-muted-foreground text-xs">
                Sibling discount status:{" "}
                <span className="text-muted-foreground">—</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {section === "children" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">My Children</h2>
          <div
            className="border border-border rounded-sm p-8 flex flex-col items-center gap-3 text-muted-foreground"
            data-ocid="parent.children_list"
          >
            <Users className="w-10 h-10 opacity-30" />
            <p className="text-sm">No children linked to your account.</p>
            <p className="text-xs">Contact Admin to link student profiles.</p>
          </div>
        </div>
      )}
      {section === "progress" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Academic Progress
          </h2>
          <div className="border border-border rounded-sm p-8 flex flex-col items-center gap-3 text-muted-foreground">
            <GraduationCap className="w-10 h-10 opacity-30" />
            <p className="text-sm">
              No academic data available for linked children.
            </p>
          </div>
        </div>
      )}
      {section === "chat" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Chat with Teacher
          </h2>
          <ChatThread targetName="Class Teacher" />
        </div>
      )}
      {section === "mesh" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Mesh Requests
            </h2>
            <MeshRequestModal fromRole="parent" />
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
