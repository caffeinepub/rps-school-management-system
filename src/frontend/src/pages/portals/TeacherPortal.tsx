import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { MeshRequestModal } from "../../components/shared/MeshRequestModal";
import { useCallerProfile } from "../../hooks/useQueries";

const NAV = [
  { key: "grades", label: "Academic Records" },
  { key: "attendance", label: "Attendance" },
  { key: "leave", label: "Leave" },
  { key: "emergency_leave", label: "Emergency Leave" },
  { key: "substitution", label: "Substitution Tickets" },
  { key: "mesh", label: "Mesh Requests" },
];

const GRADES = ["A", "B", "C", "D", "E"];
const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
];

export default function TeacherPortal() {
  const [section, setSection] = useState("grades");
  const { data: profile } = useCallerProfile();
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [emergencyReason, setEmergencyReason] = useState("");
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const handleLeaveSubmit = () => {
    if (!leaveReason || !leaveFrom || !leaveTo) {
      toast.error("Please fill in all leave details.");
      return;
    }
    toast.success("Leave request submitted.");
    setLeaveReason("");
    setLeaveFrom("");
    setLeaveTo("");
  };

  const handleEmergencyLeave = () => {
    if (!emergencyReason) {
      toast.error("Reason is required for emergency leave.");
      return;
    }
    toast.success(
      "Emergency leave alert sent to Principal & Admin. Substitution ticket created.",
      { duration: 5000 },
    );
    setEmergencyReason("");
    setEmergencyOpen(false);
  };

  return (
    <PortalLayout
      portalRole="teacher"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "grades" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Academic Records
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter grades for each student. Leave blank if not yet assessed.
          </p>
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-primary font-semibold text-xs uppercase tracking-wider">
                    Student
                  </TableHead>
                  {SUBJECTS.map((s) => (
                    <TableHead
                      key={s}
                      className="text-primary font-semibold text-xs uppercase tracking-wider"
                    >
                      {s}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell
                    colSpan={SUBJECTS.length + 1}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="teacher.grades_table.empty_state"
                  >
                    No students enrolled.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="hidden">
            <Select data-ocid="teacher.grade_select">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {section === "attendance" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Attendance</h2>
          <div className="flex items-center gap-4">
            <Label className="text-foreground shrink-0">Date</Label>
            <Input
              type="date"
              className="bg-input border-primary text-foreground w-48"
            />
          </div>
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="teacher.attendance_table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  {["Student", "Status"].map((h) => (
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
                    colSpan={2}
                    className="text-center text-muted-foreground py-8"
                  >
                    No students in class roster.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "leave" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Leave Requests</h2>
          <div
            className="border border-border rounded-sm p-8 text-center text-muted-foreground mb-6"
            data-ocid="teacher.leave_requests.empty_state"
          >
            No leave requests submitted.
          </div>
          <div
            className="max-w-lg border border-border rounded-sm p-6 bg-card space-y-4"
            data-ocid="teacher.leave_form"
          >
            <h3 className="font-display text-primary text-lg">
              Submit Leave Request
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-foreground">From</Label>
                <Input
                  type="date"
                  value={leaveFrom}
                  onChange={(e) => setLeaveFrom(e.target.value)}
                  className="bg-input border-primary text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">To</Label>
                <Input
                  type="date"
                  value={leaveTo}
                  onChange={(e) => setLeaveTo(e.target.value)}
                  className="bg-input border-primary text-foreground"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground">Reason</Label>
              <Textarea
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                className="bg-input border-primary text-foreground"
              />
            </div>
            <Button
              onClick={handleLeaveSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Request
            </Button>
          </div>
        </div>
      )}
      {section === "emergency_leave" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Emergency Leave
          </h2>
          <div
            className="border-2 border-destructive/60 rounded-sm p-6 space-y-4"
            style={{ background: "oklch(0.15 0.06 27 / 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <div>
                <p className="text-foreground font-semibold">
                  Emergency Leave Protocol
                </p>
                <p className="text-muted-foreground text-sm">
                  Bypasses standard queue. Instant alert to Principal &amp;
                  Admin. Substitution ticket auto-created.
                </p>
              </div>
            </div>
            {!emergencyOpen ? (
              <Button
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold"
                onClick={() => setEmergencyOpen(true)}
                data-ocid="teacher.emergency_leave_button"
              >
                <AlertTriangle className="w-4 h-4 mr-2" /> Initiate Emergency
                Leave
              </Button>
            ) : (
              <div className="space-y-3">
                <Label className="text-foreground">Emergency Reason</Label>
                <Textarea
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  className="bg-input border-destructive/60 text-foreground"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleEmergencyLeave}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Send Emergency Alert
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground"
                    onClick={() => setEmergencyOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {section === "substitution" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Substitution Tickets
          </h2>
          <div
            className="border border-border rounded-sm p-8 text-center text-muted-foreground"
            data-ocid="teacher.substitution.empty_state"
          >
            No open substitution tickets assigned.
          </div>
        </div>
      )}
      {section === "mesh" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Mesh Requests
            </h2>
            <MeshRequestModal fromRole="teacher" />
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
