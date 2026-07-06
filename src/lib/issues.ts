import { Issue } from "@/lib/types";

// Sample Kauaʻi issues — the single source of truth for the demo.
// Every page (map, dashboard, detail, admin, county) reads from this list.
// Later this gets replaced by a real database (Supabase).

export const SAMPLE_ISSUES: Issue[] = [
  {
    id: "issue-1",
    title: "Kealia Beach bathroom needs cleaning",
    description:
      "The bathroom at Kealia is disgusting again and the county never fixes it.",
    category: "Beach bathroom / public facility",
    status: "Needs verification",
    urgency: "Medium",
    locationName: "Kealia Beach",
    lat: 22.1175,
    lng: -159.3,
    pinLeft: "73%",
    pinTop: "40%",
    department: "Parks and Recreation",
    confirmations: 23,
    comments: 5,
    daysOpen: 8,
    publicSummary:
      "Resident reports unsanitary bathroom conditions at Kealia Beach. Additional photos or confirmations may help verify the issue.",
    countySummary:
      "Reported public facility maintenance issue at Kealia Beach bathroom. Community confirmations indicate a recurring sanitation concern. Suggested routing: Parks and Recreation.",
  },
  {
    id: "issue-2",
    title: "Illegal dumping near Wailua Homesteads",
    description:
      "Someone dumped a pile of trash and old furniture on the side of the road near Wailua Homesteads.",
    category: "Illegal dumping",
    status: "Verified",
    urgency: "High",
    locationName: "Wailua Homesteads",
    lat: 22.06,
    lng: -159.34,
    pinLeft: "74%",
    pinTop: "46%",
    department: "Solid Waste",
    confirmations: 31,
    comments: 9,
    daysOpen: 14,
    publicSummary:
      "Residents report illegal dumping of trash and furniture near Wailua Homesteads. Issue has been confirmed by multiple community members.",
    countySummary:
      "Verified illegal dumping site near Wailua Homesteads with 31 community confirmations. Suggested routing: Solid Waste.",
  },
  {
    id: "issue-3",
    title: "Abandoned car near Kapaʻa Beach Park",
    description:
      "There's an abandoned car that's been sitting near Kapaʻa Beach Park for weeks.",
    category: "Abandoned vehicle",
    status: "Sent to county",
    urgency: "Medium",
    locationName: "Kapaʻa Beach Park",
    lat: 22.08,
    lng: -159.31,
    pinLeft: "75%",
    pinTop: "44%",
    department: "Police / Abandoned Vehicle Process",
    confirmations: 12,
    comments: 3,
    daysOpen: 21,
    publicSummary:
      "Resident reports an abandoned vehicle near Kapaʻa Beach Park that has been present for several weeks.",
    countySummary:
      "Reported abandoned vehicle near Kapaʻa Beach Park. Forwarded to county. Suggested routing: Police / Abandoned Vehicle Process.",
  },
  {
    id: "issue-4",
    title: "Large pothole near Kuhio Highway",
    description:
      "Big pothole on the road near Kuhio Highway, almost blew my tire.",
    category: "Pothole / road issue",
    status: "Verified",
    urgency: "High",
    locationName: "Near Kuhio Highway",
    lat: 22.0,
    lng: -159.36,
    pinLeft: "72%",
    pinTop: "56%",
    department: "Public Works / Roads",
    confirmations: 18,
    comments: 6,
    daysOpen: 10,
    publicSummary:
      "Residents report a large pothole near Kuhio Highway posing a hazard to vehicles. Issue confirmed by multiple community members.",
    countySummary:
      "Verified road hazard (large pothole) near Kuhio Highway with 18 confirmations. Possible state road — jurisdiction needs review. Suggested routing: Public Works / Roads or State DOT.",
  },
  {
    id: "issue-5",
    title: "Overgrown sidewalk in Līhuʻe",
    description: "The sidewalk in Līhuʻe is so overgrown you can't walk on it.",
    category: "Overgrown area",
    status: "Reported",
    urgency: "Low",
    locationName: "Līhuʻe",
    lat: 21.97,
    lng: -159.37,
    pinLeft: "33%",
    pinTop: "58%",
    department: "Public Works / Roads",
    confirmations: 6,
    comments: 1,
    daysOpen: 4,
    publicSummary:
      "Resident reports an overgrown sidewalk in Līhuʻe that is difficult to pass. Additional confirmations may help verify the issue.",
    countySummary:
      "Reported overgrown public sidewalk in Līhuʻe. Awaiting verification. Suggested routing: Public Works / Roads.",
  },
  {
    id: "issue-6",
    title: "Public access blocked near beach path",
    description:
      "The public beach access path on the North Shore is blocked off again.",
    category: "Public access issue",
    status: "Needs verification",
    urgency: "Medium",
    locationName: "North Shore Kauaʻi",
    lat: 22.22,
    lng: -159.5,
    pinLeft: "40%",
    pinTop: "28%",
    department: "Planning",
    confirmations: 9,
    comments: 4,
    daysOpen: 6,
    publicSummary:
      "Resident reports a blocked public beach access path on the North Shore of Kauaʻi. Confirmations may help verify the issue.",
    countySummary:
      "Reported blocked public beach access on the North Shore. Awaiting verification. Suggested routing: Planning / Public Works.",
  },
];

// Find a single issue by its id. Returns undefined if not found.
export function getIssueById(id: string) {
  return SAMPLE_ISSUES.find((issue) => issue.id === id);
}