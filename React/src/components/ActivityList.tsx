import { Activity } from '@/models/activity';
import ActivityListCard from '@/components/ActivityListCard';

interface ActivityListProps {
  activities: Activity[];
  onViewClick: (activity: Activity) => void;
  onDeleteClick: (activity: Activity) => void;
}

export default function ActivityList({ activities, onViewClick, onDeleteClick }: ActivityListProps) {
  return <>{ activities.map((a) => <ActivityListCard key={ a.id } activity={ a } onViewClick={onViewClick} onDeleteClick={onDeleteClick} />) }</>
}