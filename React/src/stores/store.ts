import { createContext, useContext } from 'react';
import ActivityStore from '@/stores/activityStore';

export enum RequestStatus {
  NOTSTARTED = 'notstarted',
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETE = 'complete',
}

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore : new ActivityStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}