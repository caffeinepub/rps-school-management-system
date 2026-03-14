import { Badge } from "@/components/ui/badge";

const ROLE_COLORS: Record<string, string> = {
  superior: "bg-purple-900/60 text-purple-200 border-purple-500/50",
  admin: "bg-red-900/60 text-red-200 border-red-500/50",
  accountant: "bg-teal-900/60 text-teal-200 border-teal-500/50",
  teacher: "bg-blue-900/60 text-blue-200 border-blue-500/50",
  student: "bg-green-900/60 text-green-200 border-green-500/50",
  parent: "bg-orange-900/60 text-orange-200 border-orange-500/50",
};

interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const cls =
    ROLE_COLORS[role.toLowerCase()] ?? "bg-muted text-foreground border-border";
  return (
    <Badge
      variant="outline"
      className={`${cls} capitalize text-xs font-medium border`}
    >
      {role}
    </Badge>
  );
}
