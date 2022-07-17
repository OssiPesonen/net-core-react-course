import { format } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import agent from '@/assets/api-agent';
import { Activity } from '@/models/activity';
import { RequestStatus } from './store';

interface RequestStatuses {
  list: RequestStatus,
  create: RequestStatus,
  edit: RequestStatus,
  delete: RequestStatus,
}

export default class ActivityStore {
  isEdit = false;
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  requestStatus: RequestStatuses = {
    list : RequestStatus.NOTSTARTED,
    create : RequestStatus.NOTSTARTED,
    edit : RequestStatus.NOTSTARTED,
    delete : RequestStatus.NOTSTARTED
  }

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    try {
      this.setRequestStatus('list', RequestStatus.PENDING);
      const activities = await agent.Activities.list();

      this.setActivities(
        activities.map((a) => {
          return {
            ...a,
            date : format(new Date(a.date), 'yyyy-MM-dd'),
          }
        })
      );

      this.setRequestStatus('list', RequestStatus.COMPLETE);
    } catch (e) {
      console.error(e);
      this.setRequestStatus('list', RequestStatus.FAILED);
    }
  }

  createActivity = async (activity: Activity) => {
    try {
      this.setRequestStatus('create', RequestStatus.PENDING);
      await agent.Activities.create(activity);

      // Update state. Drop the activity and then add it again.
      this.setActivities([...this.activities, activity]);
      this.setSelectedActivity(undefined);

      this.setRequestStatus('create', RequestStatus.COMPLETE);
    } catch (e) {
      this.setRequestStatus('create', RequestStatus.FAILED);
    }
  }

  editActivity = async (activity: Activity) => {
    try {
      this.setRequestStatus('edit', RequestStatus.PENDING);
      await agent.Activities.update(activity);

      // Update state. Drop the activity and then add it again.
      this.setActivities([...this.activities.filter((a) => a.id !== activity.id), activity]);

      this.setRequestStatus('edit', RequestStatus.COMPLETE);
    } catch (e) {
      console.error(e);
      this.setRequestStatus('create', RequestStatus.FAILED);
    }
  }

  deleteActivity = async (a: Activity) => {
    try {
      this.setRequestStatus('delete', RequestStatus.PENDING);
      const deleted = await agent.Activities.delete(a.id);

      if (deleted) {
        this.setActivities([...this.activities.filter((activity) => activity.id !== a.id)]);
      }
      this.setRequestStatus('delete', RequestStatus.COMPLETE);
    } catch (e) {
      console.error(e);
      this.setRequestStatus('delete', RequestStatus.FAILED);
    }
  }

  setActivities = (activities: Activity[]) => {
    this.activities = activities;
  }

  setSelectedActivity = (activity: Activity) => {
    this.selectedActivity = activity;
  }

  setEdit = (edit: boolean) => {
    this.isEdit = edit;
  }

  setRequestStatus = (key: keyof RequestStatuses, status: RequestStatus) => {
    this.requestStatus[key] = status;
  }
}