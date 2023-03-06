import { defineStore } from 'pinia';
import { retrieveLogs } from '../services/logs';

interface LogRecord {
  timestamp: number;
  label: string;
}

export type LogRecordItems = Array<LogRecord>

interface LogsState {
  records: LogRecordItems;
}

export const useLogsStore = defineStore('logsStore', {
  state: (): LogsState => ({
    records: [],
  }),
  getters: {
    logs: (state) => state.records,
  },
  actions: {
    async initLogs() {
      const savedLogs = await retrieveLogs();
      this.records = savedLogs;
    },
    logRequest(label: string) {
      this.records.push({
        timestamp: Date.now(),
        label
      })
    }
  }
})
