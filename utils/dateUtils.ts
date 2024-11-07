export const formatMatchTime = (utcDateString: string) => {
  // Create a date object in UTC
  const utcDate = new Date(utcDateString);
  
  // Convert to local timezone and format
  const localDate = new Date(utcDate.getTime());

  const formattedDate = localDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: 'UTC'
  });

  const formattedTime = localDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: 'UTC'
  });

  return {
    date: formattedDate,
    time: formattedTime,
    timestamp: localDate.getTime(),
    isToday: isToday(localDate),
  };
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getUTCDate() === today.getUTCDate() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCFullYear() === today.getUTCFullYear();
};