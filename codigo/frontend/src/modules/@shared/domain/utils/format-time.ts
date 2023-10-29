import { format, getTime, formatDistanceToNow } from 'date-fns';

export function fDate(date: string) {
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch {
    return '[Invalido]';
  }
}

export function fDateNow() {
  return format(new Date(), 'dd/MM/yyyy');
}

export function fDateTime(date: string) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
}

export function fTimestamp(date: string) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm p');
}

export function fToNow(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}