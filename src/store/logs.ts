import { defineStore } from 'pinia';

interface LogRecord {
    timestamp: number;
    label: string;
}

type RecordItems = Array<LogRecord>

interface LogsState {
  records: RecordItems;
}

export const useLogsStore = defineStore('logsStore', {
  state: (): LogsState => ({
    records: [],
  }),
  getters: {
    logs: (state) => state.records,
  },
  actions: {
    logRequest (label: string) {
      this.records.push({
        timestamp: Date.now(),
        label
      });
    }
  }
})
