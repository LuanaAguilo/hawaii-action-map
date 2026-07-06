// The shape of every issue in the app.
// Defining this once means every page handles issues consistently,
// and TypeScript warns us if we ever miss or mistype a field.

// The fixed set of categories an issue can have.
export type IssueCategory =
  | "Illegal dumping"
  | "Abandoned vehicle"
  | "Pothole / road issue"
  | "Beach bathroom / public facility"
  | "Park maintenance"
  | "Unsafe sidewalk"
  | "Overgrown area"
  | "Public access issue"
  | "Environmental concern"
  | "Broken sign / lighting"
  | "Other";

// The fixed set of statuses an issue can move through.
export type IssueStatus =
  | "Reported"
  | "Needs verification"
  | "Verified"
  | "Sent to county"
  | "County responded"
  | "In progress"
  | "Needs volunteers"
  | "Needs funding"
  | "Fixed"
  | "Resolved"
  | "No response / ignored";

// Urgency levels.
export type Urgency = "Low" | "Medium" | "High" | "Critical";

// The county departments an issue can be routed to.
export type Department =
  | "Public Works / Roads"
  | "Parks and Recreation"
  | "Solid Waste"
  | "Planning"
  | "Environmental Services"
  | "Transportation"
  | "Water"
  | "State DOT"
  | "Police / Abandoned Vehicle Process"
  | "Other / Needs Review";

// The full shape of a single reported issue.
export interface Issue {
  id: string;                 // unique id, e.g. "issue-1"
  title: string;              // short title
  description: string;        // the resident's raw description
  category: IssueCategory;
  status: IssueStatus;
  urgency: Urgency;
  locationName: string;       // e.g. "Kealia Beach"
  lat: number;                // latitude (for the real map later)
  lng: number;                // longitude
  pinLeft: string;            // placeholder-map x position, e.g. "73%"
  pinTop: string;             // placeholder-map y position, e.g. "40%"
  department: Department;
  confirmations: number;      // how many people said "I saw this too"
  comments: number;           // comment count
  daysOpen: number;           // days since reported
  publicSummary: string;      // clean AI-style summary for residents
  countySummary: string;      // AI-style summary for the county
}