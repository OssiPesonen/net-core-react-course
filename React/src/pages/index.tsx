import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Spinner, Center, GridItem, Grid } from '@chakra-ui/react';
import Layout from '@/components/layouts/Layout';
import { Activity } from '@/models/activity';
import ActivityList from '@/components/ActivityList';
import ActivityDetails from '@/components/ActivityDetails';
import ActivityForm from '@/components/ActivityForm';
import agent from '@/assets/api-agent';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = response.map((a) => {
        return {
          ...a,
          date: format(new Date(a.date), 'yyyy-MM-dd'),
        }
      })

      setActivities(activities);
    });
  }, []);

  const handleViewClick = (a: Activity) => {
    setSelectedActivity(a);
    setEdit(false);
  }

  const handleCancelView = () => {
    setSelectedActivity(undefined);
    setEdit(false);
  }

  const handleSetEdit = () => {
    setEdit(true);
  }

  const handleAddActivity = () => {
    setSelectedActivity(undefined);
    setEdit(true);
  }

  const handleCancelEdit = () => {
    setEdit(false);
  }

  const handleDelete = (a: Activity) => {
    agent.Activities.delete(a.id).then(() => {
      setActivities([...activities.filter((activity) => activity.id !== a.id)]);
    });
  }

  return (
    <Layout onClickAddActivity={ handleAddActivity }>
      <Grid templateColumns='repeat(6, 1fr)' gap={ 8 }>
        <GridItem colSpan={ 4 }>
          { activities.length === 0 ? <Center><Spinner/></Center> :
            <ActivityList onViewClick={ handleViewClick } onDeleteClick={ handleDelete } activities={ activities }/> }
        </GridItem>
        <GridItem colSpan={ 2 }>
          { selectedActivity && <ActivityDetails activity={ selectedActivity } onCancelClick={ handleCancelView }
                                                 onEditClick={ handleSetEdit }/> }
          { isEdit &&
          <ActivityForm key={ selectedActivity?.id } onCancel={ handleCancelEdit } activity={ selectedActivity }/> }
        </GridItem>
      </Grid>
    </Layout>
  );
}
