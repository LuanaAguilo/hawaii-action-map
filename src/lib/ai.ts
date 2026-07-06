import {
  IssueCategory,
  Urgency,
  Department,
} from "@/lib/types";

// -----------------------------------------------------------------------------
// PLACEHOLDER AI LOGIC
// These use simple keyword matching. Later, each can be replaced by a real
// AI API call (OpenAI / Claude) without changing how the rest of the app uses them.
// -----------------------------------------------------------------------------

// Suggest a category based on keywords in the description.
export function suggestCategory(description: string): IssueCategory {
  const text = description.toLowerCase();

  if (/(dump|trash|rubbish|garbage|litter)/.test(text)) return "Illegal dumping";
  if (/(car|vehicle|truck|abandoned)/.test(text)) return "Abandoned vehicle";
  if (/(pothole|road|pavement|asphalt)/.test(text)) return "Pothole / road issue";
  if (/(bathroom|restroom|toilet|facility)/.test(text)) return "Beach bathroom / public facility";
  if (/(park|playground|field)/.test(text)) return "Park maintenance";
  if (/(sidewalk|walkway|curb)/.test(text)) return "Unsafe sidewalk";
  if (/(overgrown|weeds|grass|bushes|brush)/.test(text)) return "Overgrown area";
  if (/(access|blocked|path|entry)/.test(text)) return "Public access issue";
  if (/(runoff|erosion|pollution|environment|reef|ocean)/.test(text)) return "Environmental concern";
  if (/(light|streetlight|sign|signal)/.test(text)) return "Broken sign / lighting";

  return "Other";
}

// Suggest an urgency level based on keywords and category.
export function suggestUrgency(
  description: string,
  category: IssueCategory
): Urgency {
  const text = description.toLowerCase();

  if (/(danger|hazard|unsafe|emergency|injury|accident|blew|crash)/.test(text)) {
    return "High";
  }
  if (category === "Pothole / road issue" || category === "Illegal dumping") {
    return "High";
  }
  if (/(disgusting|broken|blocked|overflowing)/.test(text)) {
    return "Medium";
  }
  return "Low";
}

// Suggest which county department should handle this category.
export function suggestDepartment(category: IssueCategory): Department {
  switch (category) {
    case "Illegal dumping":
      return "Solid Waste";
    case "Abandoned vehicle":
      return "Police / Abandoned Vehicle Process";
    case "Pothole / road issue":
      return "Public Works / Roads";
    case "Beach bathroom / public facility":
      return "Parks and Recreation";
    case "Park maintenance":
      return "Parks and Recreation";
    case "Unsafe sidewalk":
      return "Public Works / Roads";
    case "Overgrown area":
      return "Public Works / Roads";
    case "Public access issue":
      return "Planning";
    case "Environmental concern":
      return "Environmental Services";
    case "Broken sign / lighting":
      return "Public Works / Roads";
    default:
      return "Other / Needs Review";
  }
}

// Generate a clean public-facing summary.
export function generatePublicSummary(
  description: string,
  category: IssueCategory,
  location: string
): string {
  const place = location.trim() || "the reported location";
  return `Resident reports a ${category.toLowerCase()} issue at ${place}. Additional photos or confirmations may help verify the issue.`;
}

// Generate a county-facing summary.
export function generateCountySummary(
  category: IssueCategory,
  location: string,
  department: Department
): string {
  const place = location.trim() || "the reported location";
  return `Reported ${category.toLowerCase()} at ${place}. Awaiting community verification. Suggested routing: ${department}.`;
}

// Detect a possible duplicate by comparing the location/title to existing issues.
export function detectPossibleDuplicate(
  location: string,
  existingLocations: string[]
): boolean {
  const place = location.trim().toLowerCase();
  if (!place) return false;
  return existingLocations.some(
    (existing) =>
      existing.toLowerCase().includes(place) ||
      place.includes(existing.toLowerCase())
  );
}