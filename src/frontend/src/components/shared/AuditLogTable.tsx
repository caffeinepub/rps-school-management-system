import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NullSafe } from "./NullSafe";

export interface AuditEntry {
  actor: string;
  action: string;
  target: string;
  oldValue?: string;
  newValue?: string;
  deviceId?: string;
  timestamp: string;
}

interface AuditLogTableProps {
  entries: AuditEntry[];
  loading?: boolean;
}

const HEADERS = [
  "Actor",
  "Action",
  "Target",
  "Old Value",
  "New Value",
  "Device ID",
  "Timestamp",
];
const SKEL_ROWS = ["skel-0", "skel-1", "skel-2"];
const SKEL_CELLS = ["c0", "c1", "c2", "c3", "c4", "c5", "c6"];

export function AuditLogTable({ entries, loading }: AuditLogTableProps) {
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {HEADERS.map((h) => (
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
          {loading ? (
            SKEL_ROWS.map((rowId) => (
              <TableRow key={rowId} className="border-border">
                {SKEL_CELLS.map((cellId) => (
                  <TableCell key={cellId}>
                    <div className="skeleton-gold h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : entries.length === 0 ? (
            <TableRow className="border-border">
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                No audit entries recorded.
              </TableCell>
            </TableRow>
          ) : (
            entries.map((e) => (
              <TableRow
                key={`${e.timestamp}-${e.actor}`}
                className="border-border hover:bg-secondary/30"
              >
                <TableCell className="text-foreground text-sm">
                  <NullSafe value={e.actor} />
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  <NullSafe value={e.action} />
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  <NullSafe value={e.target} />
                </TableCell>
                <TableCell className="text-sm">
                  <NullSafe value={e.oldValue} />
                </TableCell>
                <TableCell className="text-sm">
                  <NullSafe value={e.newValue} />
                </TableCell>
                <TableCell className="font-mono text-xs">
                  <NullSafe value={e.deviceId} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {e.timestamp}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
