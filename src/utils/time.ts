/**
 * Convert UTC from server to local time for the modal inputs.
 * Parses a server UTC time string (e.g., "01:30:00Z") and converts it to a local 24h string (e.g., "07:00")
 */
export const formatUTCToLocalInput = (timeStr?: string): string => {
    if (!timeStr) return '';
    if (!timeStr.endsWith('Z')) return timeStr.substring(0, 5);

    // Create a fixed epoch date string to avoid baseline day rollover bugs
    const [hours, minutes] = timeStr.replace('Z', '').split(':');
    const date = new Date(`1970-01-01T${hours}:${minutes}:00Z`);

    // Safely extract the local time using the browser's native localization API
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};

/**
 * Convert the local time from the modal input back to UTC for the server.
 * Takes the form's local time string (e.g., "07:00") and shifts it back to UTC (e.g., "01:30:00Z")
 */
export const formatLocalToUTCSubmit = (localTimeStr?: string): string => {
    if (!localTimeStr) return '';

    const [hours, minutes] = localTimeStr.split(':').map(Number);
    const now = new Date();

    // Construct the date using local wall-clock components
    const targetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
        0,
    );

    // Extract exact UTC values directly from the constructed timestamp
    const utcHours = String(targetDate.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(targetDate.getUTCMinutes()).padStart(2, '0');

    return `${utcHours}:${utcMinutes}:00Z`;
};

/**
 * Convert UTC from server to local time with AM/PM for UI display.
 * Parses a server UTC time string (e.g., "14:30:00Z") and converts it to local 12h string (e.g., "02:30 PM")
 */
export const formatUTCToLocal12h = (timeStr?: string): string => {
    if (!timeStr) return '';

    // Normalize input: Ensure it has a trailing 'Z' to be treated as UTC
    const utcStr = timeStr.endsWith('Z') ? timeStr : `${timeStr}Z`;

    // Extract hours and minutes to build a safe baseline ISO date string
    // This avoids modern runtime rollover bugs caused by sequential date mutations
    const cleanTime = utcStr.replace('Z', '');
    const [hours, minutes] = cleanTime.split(':');

    const date = new Date(`1970-01-01T${hours}:${minutes}:00Z`);

    // Check for invalid date strings
    if (isNaN(date.getTime())) return '';

    // Formats strictly to 12-hour format with AM/PM based on the user's local timezone
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
};
