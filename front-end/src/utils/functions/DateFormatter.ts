const formatDateTime = (date: Date, dateSeperator: string = '/', timeSeparator: string = ':', dateTimeSeparator: string = '-') => {
  date = new Date(date);
  return `${formatDate(date, dateSeperator)} ${timeSeparator} ${formatTime(date, timeSeparator)}`;
}

const formatDate = (date: Date, dateSeperator: string = '/') => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}${dateSeperator}${month}${dateSeperator}${day}`;
}

const formatTime = (date: Date, timeSeparator: string = ':') => {
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
}


export {formatDateTime, formatDate};