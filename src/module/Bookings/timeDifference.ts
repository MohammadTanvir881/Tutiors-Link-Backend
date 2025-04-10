export const timeDifference = async (startTime: string, endTime: string) => {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  // Convert both to minutes
  const startTotalMinutes = startHour * 60 + startMin;
  const endTotalMinutes = endHour * 60 + endMin;

  // Find the difference in minutes
  const diffInMinutes = endTotalMinutes - startTotalMinutes;
  return parseFloat((diffInMinutes / 60).toFixed(2));
};
