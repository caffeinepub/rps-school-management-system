import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApprovalStatus } from "../../backend";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { NullSafe } from "../../components/shared/NullSafe";
import {
  useCallerProfile,
  useListApprovals,
  useSetApproval,
} from "../../hooks/useQueries";

const NAV = [
  { key: "users", label: "Users" },
  { key: "sessions", label: "Sessions" },
  { key: "devices", label: "Devices" },
  { key: "impersonate", label: "Impersonate" },
  { key: "access_requests", label: "Access Requests" },
];

const SKEL_ROWS = ["skel-0", "skel-1", "skel-2"];
const SKEL_CELLS_5 = ["c0", "c1", "c2", "c3", "c4"];

export default function AdminPortal() {
  const [section, setSection] = useState("users");
  const { data: profile } = useCallerProfile();
  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const setApproval = useSetApproval();
  const [impersonateRole, setImpersonateRole] = useState("");
  const [impersonating, setImpersonating] = useState(false);
  const [handshakeOpen, setHandshakeOpen] = useState(false);
  const [handshakeCode, setHandshakeCode] = useState("");

  const handleApproval = async (principal: any, status: ApprovalStatus) => {
    try {
      await setApproval.mutateAsync({ principal, status });
      toast.success(`User ${status}.`);
    } catch {
      toast.error("Failed to update approval.");
    }
  };

  return (
    <PortalLayout
      portalRole="admin"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "users" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              User Management
            </h2>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setHandshakeOpen(true)}
              data-ocid="admin.open_modal_button"
            >
              <ShieldAlert className="w-4 h-4 mr-2" /> Password Handshake
            </Button>
          </div>
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="admin.users_table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {["Principal", "Username", "Role", "Status", "Actions"].map(
                    (h) => (
                      <TableHead
                        key={h}
                        className="text-primary font-semibold text-xs uppercase tracking-wider"
                      >
                        {h}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvalsLoading ? (
                  SKEL_ROWS.map((rowId, i) => (
                    <TableRow
                      key={rowId}
                      className="border-border"
                      data-ocid={`admin.users_table.row.${i + 1}`}
                    >
                      {SKEL_CELLS_5.map((cellId) => (
                        <TableCell key={cellId}>
                          <div className="skeleton-gold h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : !approvals || approvals.length === 0 ? (
                  <TableRow className="border-border">
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                      data-ocid="admin.users_table.empty_state"
                    >
                      No users registered yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  approvals.map((a, i) => (
                    <TableRow
                      key={a.principal.toString()}
                      className="border-border hover:bg-secondary/30"
                      data-ocid={`admin.users_table.row.${i + 1}`}
                    >
                      <TableCell className="font-mono text-xs">
                        <NullSafe value={a.principal?.toString()} />
                      </TableCell>
                      <TableCell className="text-foreground">—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            a.status === ApprovalStatus.approved
                              ? "border-green-500/50 text-green-300"
                              : a.status === ApprovalStatus.rejected
                                ? "border-destructive/50 text-red-300"
                                : "border-primary/50 text-primary"
                          } text-xs`}
                        >
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        {a.status === ApprovalStatus.pending && (
                          <>
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 h-7 text-xs"
                              onClick={() =>
                                handleApproval(
                                  a.principal,
                                  ApprovalStatus.approved,
                                )
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive/50 text-red-300 hover:bg-destructive/20 h-7 text-xs"
                              onClick={() =>
                                handleApproval(
                                  a.principal,
                                  ApprovalStatus.rejected,
                                )
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "sessions" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Active Sessions
          </h2>
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="admin.sessions_table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {[
                    "User",
                    "Device ID",
                    "Started",
                    "Last Active",
                    "Action",
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
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No active sessions.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "devices" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Authorized Devices
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {["User", "Device ID", "Registered", "Status", "Actions"].map(
                    (h) => (
                      <TableHead
                        key={h}
                        className="text-primary font-semibold text-xs uppercase tracking-wider"
                      >
                        {h}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No devices registered.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "impersonate" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Impersonate User
          </h2>
          <div className="max-w-sm space-y-4">
            <Label className="text-foreground">Select Portal Role</Label>
            <Select value={impersonateRole} onValueChange={setImpersonateRole}>
              <SelectTrigger
                className="bg-input border-primary text-foreground"
                data-ocid="admin.impersonate_select"
              >
                <SelectValue placeholder="Select a portal to view" />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary">
                {["Superior", "Accountant", "Teacher", "Student", "Parent"].map(
                  (r) => (
                    <SelectItem
                      key={r}
                      value={r.toLowerCase()}
                      className="text-foreground"
                    >
                      {r}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            <Button
              disabled={!impersonateRole}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setImpersonating(true)}
            >
              Enter Impersonation Mode
            </Button>
          </div>
          {impersonating && impersonateRole && (
            <div className="border-2 border-primary/60 rounded-sm overflow-hidden">
              <div className="bg-primary/20 border-b border-primary/40 px-4 py-2 flex items-center justify-between">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  IMPERSONATION MODE — Read Only · {impersonateRole}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setImpersonating(false)}
                  data-ocid="admin.impersonate.close_button"
                >
                  Exit
                </Button>
              </div>
              <div className="p-6 text-muted-foreground text-sm">
                Viewing{" "}
                <span className="text-primary capitalize">
                  {impersonateRole}
                </span>{" "}
                portal in read-only mode.
              </div>
            </div>
          )}
        </div>
      )}
      {section === "access_requests" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            One-Time Access Requests
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {[
                    "Requested By",
                    "Department",
                    "Reason",
                    "Status",
                    "Actions",
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
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="admin.access_request.empty_state"
                  >
                    No pending access requests.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="hidden">
            <Button data-ocid="admin.access_request.confirm_button">
              Confirm
            </Button>
          </div>
        </div>
      )}
      <Dialog open={handshakeOpen} onOpenChange={setHandshakeOpen}>
        <DialogContent
          className="bg-card border-primary text-foreground"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-primary">
              Password Handshake
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Enter the one-time authorization code to proceed with sensitive
              edits.
            </p>
            <div className="space-y-1.5">
              <Label className="text-foreground">Authorization Code</Label>
              <Input
                type="password"
                value={handshakeCode}
                onChange={(e) => setHandshakeCode(e.target.value)}
                className="bg-input border-primary text-foreground"
              />
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  toast.success("Access granted.");
                  setHandshakeOpen(false);
                  setHandshakeCode("");
                }}
                data-ocid="admin.dialog.confirm_button"
              >
                Authorize
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground"
                onClick={() => setHandshakeOpen(false)}
                data-ocid="admin.dialog.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
