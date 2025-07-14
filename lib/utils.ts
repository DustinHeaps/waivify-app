import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToCSV(data: any[]) {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => `"${row[field] ?? ""}"`).join(",")
  );

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
