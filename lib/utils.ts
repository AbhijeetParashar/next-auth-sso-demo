import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (
  inputDateTime: string,
  formatType: string
): string => {
  const inputDate = new Date(inputDateTime);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = inputDate.getFullYear();
  const month = monthNames[inputDate.getMonth()];

  // Handle different format types
  switch (formatType) {
    case "MMM YYYY":
      return `${month} ${year}`;
    // Add more cases for additional format types if needed
    default:
      throw new Error("Unsupported format type");
  }
};

export const sortObjectsByOrder = (obj: Object, key?: string) => {
  if (key) {
    const sortedArray = Object.entries(obj)
      .map(([key, value]) => ({ ...value, objectId: key }))
      .sort((a, b) => a[key] - b[key]);
    return sortedArray;
  } else {
    const sortedArray = Object.entries(obj).map(([key, value]) => ({
      ...value,
      objectId: key,
    }));
    return sortedArray;
  }
};

export const transformDataToObjectArray = (data: any) => {
  const output = [];

  for (const key in data) {
    const content = data[key];
    if (Array.isArray(content)) {
      output.push({
        label: `${key.charAt(0).toUpperCase() + key.slice(1)} (${
          content.length
        })`,
        content: content,
      });
    }
  }

  return output;
};

export const truncateString = (
  strDescription: string,
  maxLength: number
): string => {
  if (strDescription.length <= maxLength) {
    return strDescription;
  }
  return strDescription.slice(0, maxLength) + "...";
};