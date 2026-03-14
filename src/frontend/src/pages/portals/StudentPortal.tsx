import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { PortalLayout } from "../../components/layout/PortalLayout";
import { MeshRequestModal } from "../../components/shared/MeshRequestModal";
import { useCallerProfile } from "../../hooks/useQueries";

const NAV = [
  { key: "grades", label: "My Grades" },
  { key: "schedule", label: "Schedule" },
  { key: "files", label: "Files" },
  { key: "mesh", label: "Mesh Requests" },
];

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

function GradeChip({ grade }: { grade?: string }) {
  if (!grade) return <span className="text-muted-foreground">—</span>;
  const colors: Record<string, string> = {
    A: "border-green-500/50 text-green-300",
    B: "border-blue-500/50 text-blue-300",
    C: "border-primary/50 text-primary",
    D: "border-orange-500/50 text-orange-300",
    E: "border-destructive/50 text-red-300",
  };
  return (
    <Badge
      variant="outline"
      className={`${colors[grade] ?? "border-border text-foreground"} text-xs`}
    >
      {grade}
    </Badge>
  );
}

export default function StudentPortal() {
  const [section, setSection] = useState("grades");
  const { data: profile } = useCallerProfile();
  const [files, setFiles] = useState<
    { name: string; size: string; date: string }[]
  >([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFiles((prev) => [
      ...prev,
      {
        name: f.name,
        size: `${(f.size / 1024).toFixed(1)} KB`,
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  return (
    <PortalLayout
      portalRole="student"
      navItems={NAV}
      activeSection={section}
      onSectionChange={setSection}
      username={profile?.username}
    >
      {section === "grades" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">My Grades</h2>
          <p className="text-muted-foreground text-xs">
            Read-only view of academic performance.
          </p>
          <div
            className="border border-border rounded-sm overflow-hidden"
            data-ocid="student.grades_table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-primary font-semibold text-xs uppercase tracking-wider">
                    Subject
                  </TableHead>
                  <TableHead className="text-primary font-semibold text-xs uppercase tracking-wider">
                    Grade
                  </TableHead>
                  <TableHead className="text-primary font-semibold text-xs uppercase tracking-wider">
                    Remarks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SUBJECTS.map((s, i) => (
                  <TableRow
                    key={s}
                    className="border-border hover:bg-secondary/30"
                    data-ocid={`student.grades_table.row.${i + 1}`}
                  >
                    <TableCell className="text-foreground">{s}</TableCell>
                    <TableCell>
                      <GradeChip />
                    </TableCell>
                    <TableCell className="text-muted-foreground">—</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {section === "schedule" && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Class Schedule</h2>
          <div
            className="border border-border rounded-sm overflow-x-auto"
            data-ocid="student.schedule_grid"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-primary font-semibold text-xs uppercase tracking-wider text-left px-4 py-3 w-20">
                    Period
                  </th>
                  {DAYS.map((d) => (
                    <th
                      key={d}
                      className="text-primary font-semibold text-xs uppercase tracking-wider text-left px-4 py-3"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((p) => (
                  <tr
                    key={p}
                    className="border-b border-border hover:bg-secondary/20"
                  >
                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                      {p}
                    </td>
                    {DAYS.map((d) => (
                      <td key={d} className="px-4 py-3 text-muted-foreground">
                        —
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {section === "files" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">My Files</h2>
            <label className="cursor-pointer">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span data-ocid="student.files_upload_button">
                  <Upload className="w-4 h-4 mr-2" /> Upload File
                </span>
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <p className="text-muted-foreground text-xs">
            Max file size: 1 GB per file. Decentralized storage.
          </p>
          {files.length === 0 ? (
            <div
              className="border border-border rounded-sm p-12 flex flex-col items-center gap-3 text-muted-foreground"
              data-ocid="student.files.empty_state"
            >
              <FileText className="w-10 h-10 opacity-30" />
              <p className="text-sm">No files uploaded yet.</p>
            </div>
          ) : (
            <div className="border border-border rounded-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    {["File Name", "Size", "Uploaded"].map((h) => (
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
                  {files.map((f, i) => (
                    <TableRow
                      key={f.name}
                      className="border-border hover:bg-secondary/30"
                      data-ocid={`student.files.item.${i + 1}`}
                    >
                      <TableCell className="text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        {f.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {f.size}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {f.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
      {section === "mesh" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary">
              Mesh Requests
            </h2>
            <MeshRequestModal fromRole="student" />
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
