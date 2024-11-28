export const generateGroupId = (groupName: string): string => {
  const timestamp = Date.now();
  const cleanName = groupName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 6);
  const randomStr = Math.random().toString(36).substring(2, 5);

  return `${cleanName}-${randomStr}-${timestamp}`;
};
