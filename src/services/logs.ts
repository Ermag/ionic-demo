import { Preferences } from '@capacitor/preferences';
import { useLogsStore } from '../store';
import { type LogRecordItems } from '../store/logs';

const storageKey = 'app-logs';
const saveLogs = async (logs: LogRecordItems) => {
  /*
    The preferences plugin is ideal for our use case.
    As the app grows and there is a need for larger,
    persistent structured data, this plugin would be a good fit:
    @capacitor-community/sqlite
  */
  await Preferences.set({
    key: storageKey,
    value: JSON.stringify(logs),
  });
}

export const retrieveLogs = async () => {
  const { value } = await Preferences.get({ key: storageKey });
  return value ? JSON.parse(value) : [];
}

export const logRequests = (config: any) => {
  const { logRequest, logs } = useLogsStore();
  const { baseURL, url } = config;

  logRequest(`${baseURL}${url}`);
  // Persist the logs onto the device itself
  saveLogs(logs);

  return config;
}
