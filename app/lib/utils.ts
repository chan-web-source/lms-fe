import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';
import type { AuthUser } from '~/types/Auth';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRedirectPathFromRoleIds(roleIds: number[]): string {
  if (roleIds.includes(1)) {
    Cookies.set('dashboard_role_id', '1');
    return '/admin/user-management';
  } else if (roleIds.includes(7) || roleIds.includes(2)) {
    Cookies.set('dashboard_role_id', '7');
    return '/licensing/application-management';
  }
  // other users
  else if (roleIds.length > 0) {
    return '/user/my-profile';
  } else return '/auth/login';
}

export function getRedirectPathFromToken(): string | null {
  const token = Cookies.get('auth_token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<AuthUser>(token);
    const roleIds = decoded.role_ids ?? [];

    if (!roleIds.length) return null;

    return getRedirectPathFromRoleIds(roleIds);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const handleDownload = (format: 'csv' | 'excel', logs: any) => {
  if (logs.length === 0) {
    alert('No data to download');
    return;
  }

  const mappedLogs = logs.map((log: any) => ({
    log_id: log.id,
    timestamp: log.created_at,
    'user full name': `${log.first_name ?? ''} ${log.surname ?? ''}`.trim(),
    module: log.category,
    action: log.action,
    ip_address: log.ip_address,
  }));

  if (format === 'csv') {
    const csv = Papa.unparse(mappedLogs);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'log-report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    const worksheet = XLSX.utils.json_to_sheet(mappedLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'log-report.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const formatDate = (date: string, type: string | 'timedate' = 'date') => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  if (type === 'datetime') {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
  } else if (type === 'datetime-dash') {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} . ${hours}:${minutes}:${seconds}`;
  } else if (type === 'timedate') {
    const dateObj = new Date(date);
    // Convert UTC time to local time
    const localDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
    let timeString = localDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    timeString = timeString
      .replace(/:\d{2}/, '')
      .replace(' ', '')
      .toUpperCase();
    const day = localDate.getDate();
    const month = localDate.toLocaleString('en-US', { month: 'long' });
    const year = localDate.getFullYear();
    return `${timeString} ${day} ${month} ${year}`;
  }
  return `${month}/${day}/${year}`;
};

export function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const buildDocsFromIndividualData = (data?: any) => {
  const docs = [];

  if (data?.passport_document) {
    docs.push({
      docType: 'Passport',
      doc: data.passport_document,
    });
  }

  if (data?.driver_license_document) {
    docs.push({
      docType: 'Driver’s License',
      doc: data.driver_license_document,
    });
  }

  if (data?.national_id_document) {
    docs.push({
      docType: 'National ID',
      doc: data.national_id_document,
    });
  }

  // Fill empty slots up to MAX_DOCS (3)
  while (docs.length < 3) {
    docs.push({ docType: '', doc: '' });
  }

  return docs;
};
