/**
 * Convert utc from server to local time for the modal inputs.
 * Parses a server UTC time string (e.g., "01:30:00Z") and converts it to a local 24h string (e.g., "07:00")
 */
export const formatUTCToLocalInput = (timeStr?: string): string => {
    if (!timeStr) return '';
    if (!timeStr.endsWith('Z')) return timeStr.substring(0, 5);

    const cleanStr = timeStr.replace('Z', '');
    const [hours, minutes] = cleanStr.split(':');

    const date = new Date();
    date.setUTCHours(parseInt(hours, 10));
    date.setUTCMinutes(parseInt(minutes, 10));
    date.setUTCSeconds(0);

    // Reads out hours and minutes according to the user's current device timezone
    const localHours = String(date.getHours()).padStart(2, '0');
    const localMinutes = String(date.getMinutes()).padStart(2, '0');

    return `${localHours}:${localMinutes}`;
};

/**
 * Convert the local time from the modal input back to utc for the server.
 * Takes the form's local time string (e.g., "07:00") and shifts it back to UTC (e.g., "01:30:00Z")
 */
export const formatLocalToUTCSubmit = (localTimeStr?: string): string => {
    if (!localTimeStr) return '';

    const [hoursStr, minutesStr] = localTimeStr.split(':');
    const targetDate = new Date();

    // Set the target date to the specific wall-clock hours/minutes chosen by the user
    targetDate.setHours(parseInt(hoursStr, 10));
    targetDate.setMinutes(parseInt(minutesStr, 10));
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);

    // Extract what that exact moment corresponds to on the global UTC clock
    const utcHours = String(targetDate.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(targetDate.getUTCMinutes()).padStart(2, '0');

    return `${utcHours}:${utcMinutes}:00Z`;
};
