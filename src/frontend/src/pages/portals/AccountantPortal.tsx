import { Badge } from "@/components/ui/badge";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { MeshRequestModal } from "../../components/shared/MeshRequestModal";
import { useCallerProfile } from "../../hooks/useQueries";

const NAV = [
  { key: "ledger", label: "Ledger" },
  { key: "penalties", label: "Penalties" },
  { key: "fee_requests", label: "Fee Requests" },
  { key: "mesh", label: "Mesh Requests" },
];

interface FeeEntry {
  student: string;
  amount: string;
  type: string;
  status: string;
  date: string;
}

export default function AccountantPortal() {
  const [section, setSection] = useState("ledger");
  const { data: profile } = useCallerProfile();
  const [entries, setEntries] = useState<FeeEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<FeeEntry>>({});
  const [penaltyStudent, setPenaltyStudent] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [penaltyReason, setPenaltyReason] = useState("");

  const handleAddFee = () => {
    if (!newEntry.student || !newEntry.amount || !newEntry.type) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setEntries((prev) => [
      ...prev,
      {
        student: newEntry.student!,
        amount: newEntry.amount!,
        type: newEntry.type!,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      },
    ]);
    setNewEntry({});
    setShowAddForm(false);
    toast.success("Fee entry added.");
  };

  const handleApplyPenalty = () => {
    if (!penaltyStudent || !penaltyAmount || !penaltyReason) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Penalty applied.");
    setPenaltyStudent("");
    setPenaltyAmount("");
    setPenaltyReason("");
  };

  const statusColor = (s: string) =>
    s === "Paid"
      ? "border-green-500/50 text-green-300"
      : s === "Overdue"
        ? "border-destructive/50 text-red-300"
        : "border-primary/50 text-primary";

  return (
    <PortalLayout
      portalRole="accountant"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "ledger" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Financial Ledger
            </h2>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowAddForm(!showAddForm)}
              data-ocid="accountant.add_fee_button"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Entry
            </Button>
          </div>
          {showAddForm && (
            <div className="border border-primary/40 rounded-sm p-4 space-y-4 bg-card">
              <h3 className="font-display text-primary text-lg">
                New Fee Entry
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-foreground">Student Name</Label>
                  <Input
                    value={newEntry.student ?? ""}
                    onChange={(e) =>
                      setNewEntry((p) => ({ ...p, student: e.target.value }))
                    }
                    className="bg-input border-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Amount (₹)</Label>
                  <Input
                    type="number"
                    value={newEntry.amount ?? ""}
                    onChange={(e) =>
                      setNewEntry((p) => ({ ...p, amount: e.target.value }))
                    }
                    className="bg-input border-primary text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Type</Label>
                  <Select
                    value={newEntry.type ?? ""}
                    onValueChange={(v) =>
                      setNewEntry((p) => ({ ...p, type: v }))
                    }
                  >
                    <SelectTrigger className="bg-input border-primary text-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary">
                      <SelectItem value="Fee" className="text-foreground">
                        Fee
                      </SelectItem>
                      <SelectItem value="Penalty" className="text-foreground">
                        Penalty
                      </SelectItem>
                      <SelectItem value="Discount" className="text-foreground">
                        Discount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddFee}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Entry
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="accountant.ledger_table"
          >
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
                {entries.length === 0 ? (
                  <TableRow className="border-border">
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                      data-ocid="accountant.ledger_table.empty_state"
                    >
                      No entries recorded.
                    </TableCell>
                  </TableRow>
                ) : (
                  entries.map((e, i) => (
                    <TableRow
                      key={`${e.student}-${e.date}`}
                      className="border-border hover:bg-secondary/30"
                      data-ocid={`accountant.ledger_table.row.${i + 1}`}
                    >
                      <TableCell className="text-foreground">
                        {e.student}
                      </TableCell>
                      <TableCell className="text-foreground">
                        ₹{e.amount}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {e.type}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${statusColor(e.status)} text-xs`}
                        >
                          {e.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {e.date}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "penalties" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Apply Penalty</h2>
          <div
            className="max-w-lg border border-border rounded-sm p-6 bg-card space-y-4"
            data-ocid="accountant.penalty_form"
          >
            <div className="space-y-1.5">
              <Label className="text-foreground">Student Name</Label>
              <Input
                value={penaltyStudent}
                onChange={(e) => setPenaltyStudent(e.target.value)}
                className="bg-input border-primary text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground">Penalty Amount (₹)</Label>
              <Input
                type="number"
                value={penaltyAmount}
                onChange={(e) => setPenaltyAmount(e.target.value)}
                className="bg-input border-primary text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground">Reason</Label>
              <Textarea
                value={penaltyReason}
                onChange={(e) => setPenaltyReason(e.target.value)}
                className="bg-input border-primary text-foreground"
              />
            </div>
            <Button
              onClick={handleApplyPenalty}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Apply Penalty
            </Button>
          </div>
        </div>
      )}
      {section === "fee_requests" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">
            Fee Edit Requests
          </h2>
          <div
            className="border border-border rounded-sm p-8 text-center text-muted-foreground"
            data-ocid="accountant.fee_requests.empty_state"
          >
            No fee edit requests pending.
          </div>
        </div>
      )}
      {section === "mesh" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Mesh Requests
            </h2>
            <MeshRequestModal fromRole="accountant" />
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
