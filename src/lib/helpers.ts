import { IssueStatus, Urgency } from "@/lib/types";

export function statusColor(status: IssueStatus): string {
  switch (status) {
    case "Reported":
    case "Needs verification":
      return "bg-neutral-800 text-neutral-400";
    case "Verified":
      return "bg-[#7fffd4]/15 text-[#7fffd4]";
    case "Sent to county":
    case "County responded":
      return "bg-blue-500/15 text-blue-300";
    case "In progress":
      return "bg-amber-500/15 text-amber-300";
    case "Needs volunteers":
      return "bg-purple-500/15 text-purple-300";
    case "Needs funding":
      return "bg-orange-500/15 text-orange-300";
    case "Fixed":
    case "Resolved":
      return "bg-[#7fffd4]/15 text-[#7fffd4]";
    case "No response / ignored":
      return "bg-red-500/15 text-red-300";
    default:
      return "bg-neutral-800 text-neutral-400";
  }
}

export function urgencyColor(urgency: Urgency): string {
  switch (urgency) {
    case "Low":
      return "bg-neutral-800 text-neutral-400";
    case "Medium":
      return "bg-amber-500/15 text-amber-300";
    case "High":
      return "bg-red-500/15 text-red-300";
    case "Critical":
      return "bg-red-500/25 text-red-300";
    default:
      return "bg-neutral-800 text-neutral-400";
  }
}