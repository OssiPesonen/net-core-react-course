import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Activity } from '@/models/activity';
import { formatDate } from '@/assets/utils';
import { RequestStatus, useStore } from '@/stores/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const { activityStore } = useStore();

  useEffect(() => {
    if (activityStore.requestStatus.delete === 'complete') {
      toast.info('Activity deleted');
      activityStore.setRequestStatus('delete', RequestStatus.NOTSTARTED);
    }
  }, [activityStore.requestStatus.delete]);

  const handleDelete = async (a: Activity) => {
    await activityStore.deleteActivity(a);
  }

  const handleViewClick = (a: Activity) => {
    activityStore.setSelectedActivity(a);
    activityStore.setEdit(false);
  }

  return (
    <Flex mb={ 4 }>
      <Box
        w="full"
        borderWidth="1px"
        shadow="sm"
        position="relative">
        <Box p="6">
          <Heading
            fontSize="2xl"
            as="h3"
            lineHeight="tight">
            { activity.title }
          </Heading>
          <Flex alignItems="center" mb={ 4 } mt={ 2 }>
            <Text color="gray.500">
              { formatDate(activity.date) }
            </Text>
            <Badge marginLeft="2rem">{ activity.category }</Badge>
          </Flex>
          <Text mb={ 2 }>{ activity.description }</Text>
        </Box>
        <Flex pl={ 6 } pr={ 6 } pb={ 4 } gap={ 2 } justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontWeight="semibold">{ activity.venue }</Text>
          </Box>
          <Box>
            <Button marginRight="0.5rem" variant="outline" colorScheme="red"
                    onClick={ () => handleDelete(activity) }>Delete</Button>
            <Button variant="outline" onClick={ () => handleViewClick(activity) }>View</Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default observer(ActivityCard);