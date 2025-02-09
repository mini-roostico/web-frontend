/**
 * Contains utility functions used by multiple components.
 */

import { ResolvedSubject } from '@/commons/model.ts'

/** An enum representing the possible roles of a user. */
export enum Role {
  User = 'user',
  Admin = 'admin',
}

/**
 * Converts the given role string to the corresponding Role enum value or undefined if the string is not a valid role.
 * @param roleString the role string to convert
 */
export function toRole(roleString: string | null): Role | null {
  const possiblyRole = roleString?.toLowerCase() as Role
  return possiblyRole && Object.values(Role).includes(possiblyRole) ? possiblyRole : null
}

/**
 * Formats the given date as a string with the format "dd MMM yy" w.r.t. italian timezone (e.g. "01 Jan 21")
 * @param date the date to format
 * @param yearsDigit the number of digits to use for the year (2 or 4)
 */
export function formatDate(
  date: Date,
  yearsDigit: '2-digit' | 'numeric' | undefined = '2-digit',
): string {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: yearsDigit,
  }
  return new Intl.DateTimeFormat('it-IT', options).format(dateObj).toString()
}

/**
 * Formats the given time as a string with the format "hh:mm a" w.r.t. italian timezone (e.g. "01:00 PM")
 * @param date the time date to format
 */
export function formatTime(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 12-hour clock with AM/PM
  }
  return new Intl.DateTimeFormat('it-IT', options).format(date).toString()
}

/**
 * Returns the entries of the given record with the highest value.
 * @param data the record to analyze.
 */
export function highestOf(data: Record<string, number>): { key: string; value: number }[] {
  let maxEntries: { key: string; value: number }[] = []
  let maxValue = 0
  for (const [key, value] of Object.entries(data)) {
    if (value > maxValue) {
      maxValue = value
      maxEntries = [{ key, value }]
    } else if (value === maxValue) {
      maxEntries.push({ key, value })
    }
  }
  return maxEntries
}

/**
 * Capitalizes the first letter of the given string.
 * @param str the string to capitalize.
 */
export function capitalizeFirstLetter(str: string) {
  if (str === '') {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts an array of maps of keys and value into a ResolvedSubject object.
 * @param objs the objs to convert.
 */
export function convertToSubjects(objs: object[]): ResolvedSubject[] {
  return objs.map((obj, index) => {
    let name = obj['name']
    if (!name) {
      name = 'subject' + index
    }
    return {
      name: name,
      values: Object.entries(obj)
        .filter(([key]) => key !== 'name')
        .map(([key, value]) => ({
          key,
          value,
        })),
    }
  })
}

/**
 * Utility type representing an alert message type.
 */
export enum AlertType {
  INFO = 'alert-info',
  DANGER = 'alert-danger',
  SUCCESS = 'alert-success',
}
