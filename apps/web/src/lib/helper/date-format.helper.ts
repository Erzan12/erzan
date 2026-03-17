export const getRelativeTime = (date: string | number | Date) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const now = new Date().getTime();
  const past = new Date(date).getTime();

  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 365) {
    return rtf.format(-Math.floor(diffInDays / 365), 'year');
  }

  if (diffInDays >= 30) {
    return rtf.format(-Math.floor(diffInDays / 30), 'month');
  }

  if (diffInDays >= 1) {
    return rtf.format(-diffInDays, 'day');
  }

  if (diffInHours >= 1) {
    return rtf.format(-diffInHours, 'hour');
  }

  if (diffInMinutes >= 1) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  return "just now";
};