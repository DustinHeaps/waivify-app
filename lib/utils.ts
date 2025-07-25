import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function flattenValue(value: any): string {
  if (!value) return "";
  if (Array.isArray(value)) {
    return value.map(flattenValue).join(" | ");
  }
  if (typeof value === "object") {
    // Pull out just relevant info for fields/signature
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");
  }
  return String(value);
}


export function convertToCSV(data: any[]) {
  if (data.length === 0) return "";

  // Collect all unique field keys from `fields`
  const allFieldKeys = Array.from(
    new Set(data.flatMap((row) => Object.keys(row.fields || {})))
  );

  const baseKeys = ["name", "date", "ipAddress", "terms", "liability", "viewedAt", "archived"];
  const headers = [...baseKeys, ...allFieldKeys];

  const rows = data.map((row) => {
    const baseValues = baseKeys.map((key) => {
      const value = row[key];
      if (value === null || value === undefined) return "";
      if (typeof value === "object") return `"${JSON.stringify(value)}"`;
      return `"${String(value).replace(/"/g, '""')}"`;
    });

    const fieldValues = allFieldKeys.map((key) => {
      const value = row.fields?.[key];
      if (value === null || value === undefined) return "";
      return `"${String(value).replace(/"/g, '""')}"`;
    });

    return [...baseValues, ...fieldValues].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}


export function downloadCSV(data: any[], filename = "Waivers.csv") {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();
}

export function getNameFieldValue(form: Record<string, string>) {
  const lowerEntries = Object.entries(form).map(([label, value]) => [
    label.toLowerCase(),
    value,
  ]);

  const owner = lowerEntries.find(([label]) => label.includes("owner name"));
  if (owner) return owner[1];

  const participant = lowerEntries.find(([label]) =>
    label.includes("participant name")
  );
  if (participant) return participant[1];

  const fullName = lowerEntries.find(([label]) => label.includes("full name"));
  return fullName ? fullName[1] : null;
}

export function getEmailFieldValue(form: Record<string, string>) {
  const lowerEntries = Object.entries(form).map(([label, value]) => [
    label.toLowerCase(),
    value,
  ]);

  const emailField = lowerEntries.find(([label]) => label.includes("email"));

  return emailField ? emailField[1] : null;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/[^a-z0-9\-]/g, "") // remove special chars except dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
}
