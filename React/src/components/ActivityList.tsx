import ActivityListCard from '@/components/ActivityListCard';
import { useStore } from '@/stores/store';

export default function ActivityList() {
  const { activityStore} = useStore();

  return <>{ activityStore.activities.map((a) => <ActivityListCard key={ a.id } activity={ a } />) }</>
}