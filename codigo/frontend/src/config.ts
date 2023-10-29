// API
// ----------------------------------------------------------------------

import { PATH_DASHBOARD } from "./modules/dashboard/dashboard-paths";

export const NFSE_API_URL = process.env.REACT_APP_NFSE_API_URL || '';
export const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL || '';

export const CURRENT_VERSION = process.env.REACT_APP_CURRENT_VERSION || '';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

export interface DefaultSettings {
  themeMode: string;
  themeDirection: string;
  themeColorPresets: string;
  themeLayout: string;
  themeStretch: boolean;
}

export const defaultSettings: DefaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeLayout: 'vertical',
  themeStretch: false,
};

// DESIGN
export const HEADER = {
  DASHBOARD_HEIGHT: 60,
};

export const NAVBAR = {
  DASHBOARD_HEIGHT: 64,
  DASHBOARD_ITEM_HEIGHT: 50
};

export const CONTENT = {
  OFFSET_TOP: 30
}