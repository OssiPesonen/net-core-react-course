import React, { useEffect } from 'react';
import { Spinner, Center, GridItem, Grid } from '@chakra-ui/react';
import Layout from '@/components/layouts/Layout';
import ActivityList from '@/components/ActivityList';
import ActivityDetails from '@/components/ActivityDetails';
import ActivityForm from '@/components/ActivityForm';
import { useStore } from '@/stores/store';
import { observer } from 'mobx-react-lite';

const Home = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  return (
    <Layout>
      <Grid templateColumns='repeat(6, 1fr)' gap={ 8 }>
        <GridItem colSpan={ 4 }>
          { activityStore.activities.length === 0 ? <Center><Spinner/></Center> :
            <ActivityList /> }
        </GridItem>
        <GridItem colSpan={ 2 }>
          { activityStore.selectedActivity && <ActivityDetails /> }
          { activityStore.isEdit && <ActivityForm key={ activityStore.selectedActivity?.id }/> }
        </GridItem>
      </Grid>
    </Layout>
  );
}

export default observer(Home);