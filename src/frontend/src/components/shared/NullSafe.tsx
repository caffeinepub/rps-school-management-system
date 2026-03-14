interface NullSafeProps {
  value: string | number | bigint | null | undefined;
  className?: string;
}

export function NullSafe({ value, className }: NullSafeProps) {
  if (value === null || value === undefined || value === "") {
    return <span className={className ?? "text-muted-foreground"}>—</span>;
  }
  return <span className={className}>{String(value)}</span>;
}
