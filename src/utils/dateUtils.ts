/**
 * Format a date to a readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

/**
 * Get the start date of the week containing the given date
 */
export const getWeekStart = (date: Date): Date => {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  const weekStart = new Date(date);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
};

/**
 * Get the end date of the week containing the given date
 */
export const getWeekEnd = (date: Date): Date => {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
};

/**
 * Format a date range for display
 */
export const formatDateRange = (start: Date, end: Date): string => {
  return `${formatDate(start.toISOString())} - ${formatDate(
    end.toISOString()
  )}`;
};

/**
 * Check if a date is within a given date range
 */
export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

/**
 * Get the last N weeks from a given date
 */
export const getLastNWeeks = (
  n: number,
  fromDate: Date = new Date()
): { start: Date; end: Date }[] => {
  const weeks = [];

  for (let i = 0; i < n; i++) {
    const date = new Date(fromDate);
    date.setDate(date.getDate() - i * 7);

    const start = getWeekStart(date);
    const end = getWeekEnd(start);

    weeks.unshift({ start, end });
  }

  return weeks;
};
