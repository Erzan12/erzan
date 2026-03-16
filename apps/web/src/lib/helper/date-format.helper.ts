export const getRelativeTime = (date: string | number | Date) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  const diffInMs = new Date(date).getTime() - new Date().getTime();
  const diffInSeconds = Math.round(diffInMs / 1000);
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);

  // 1. Logic for Years
  if (Math.abs(diffInDays) >= 365) {
    return rtf.format(Math.round(diffInDays / 365), 'year');
  } 
  // 2. Logic for Months (approx. 30 days)
  else if (Math.abs(diffInDays) >= 30) {
    return rtf.format(Math.round(diffInDays / 30), 'month');
  } 
  // 3. Logic for Days
  else if (Math.abs(diffInDays) >= 1) {
    return rtf.format(diffInDays, 'day');
  } 
  // 4. Logic for Hours
  else if (Math.abs(diffInHours) >= 1) {
    return rtf.format(diffInHours, 'hour');
  } 
  // 5. Logic for Minutes
  else if (Math.abs(diffInMinutes) >= 1) {
    return rtf.format(diffInMinutes, 'minute');
  } 
  // 6. Logic for Seconds / "Just Now"
  else {
    return 'just now'; // Or rtf.format(diffInSeconds, 'second')
  }
};