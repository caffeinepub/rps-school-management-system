import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROLES = [
  "Superior",
  "Admin",
  "Accountant",
  "Teacher",
  "Student",
  "Parent",
];

interface MeshRequestModalProps {
  fromRole: string;
  children?: React.ReactNode;
}

export function MeshRequestModal({
  fromRole,
  children,
}: MeshRequestModalProps) {
  const [open, setOpen] = useState(false);
  const [toRole, setToRole] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!toRole || !subject || !body) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    toast.success("Request sent successfully.");
    setOpen(false);
    setToRole("");
    setSubject("");
    setBody("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            data-ocid="mesh.open_modal_button"
          >
            <Send className="w-4 h-4 mr-2" />
            New Request
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="bg-card border-primary text-foreground max-w-lg"
        data-ocid="mesh.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-primary text-xl">
            Compose Mesh Request
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            From:{" "}
            <span className="text-primary font-medium capitalize">
              {fromRole}
            </span>
          </p>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-foreground">To Portal</Label>
            <Select value={toRole} onValueChange={setToRole}>
              <SelectTrigger
                className="bg-input border-primary text-foreground"
                data-ocid="mesh.select"
              >
                <SelectValue placeholder="Select recipient portal" />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary">
                {ROLES.filter(
                  (r) => r.toLowerCase() !== fromRole.toLowerCase(),
                ).map((r) => (
                  <SelectItem
                    key={r}
                    value={r.toLowerCase()}
                    className="text-foreground hover:bg-secondary"
                  >
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-input border-primary text-foreground"
              placeholder=""
              data-ocid="mesh.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground">Message</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-input border-primary text-foreground min-h-[120px]"
              data-ocid="mesh.textarea"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={sending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            data-ocid="mesh.submit_button"
          >
            {sending ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
