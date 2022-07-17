import Image from 'next/image';
import { Flex, Box, Heading, Text, Spacer, Button } from '@chakra-ui/react';
import { Activity } from '@/models/activity';
import { formatDate } from '@/assets/utils';
import { useStore } from '@/stores/store';


export default function ActivityCard() {
  const { activityStore } = useStore();
  const activity = activityStore.selectedActivity;

  const handleCancelView = () => {
    activityStore.setSelectedActivity(undefined);
    activityStore.setEdit(false);
  }

  const handleSetEdit = () => {
    activityStore.setEdit(true);
  }

  return (
    <Flex maxWidth="640px" mb={ 4 }>
      <Box
        w="full"
        borderWidth="1px"
        shadow="sm"
        position="relative">
        <Box w="full" height="200px" position="relative">
          <Image src={ `/images/categories/${ activity.category }.jpg` } alt={ activity.category } layout="fill"/>
        </Box>
        <Box p="6" borderBottom="1px" borderColor="gray.200">
          <Heading
            fontSize="2xl"
            as="h3"
            lineHeight="tight">
            { activity.title }
          </Heading>
          <Text color="gray.500" fontSize="sm" mb={ 4 }>
            { formatDate(activity.date) }
          </Text>
          <Text>{ activity.description }</Text>
        </Box>
        <Flex p={ 4 } gap={ 2 }>
          <Button variant="outline" width="full" onClick={handleCancelView}>Cancel</Button>
          <Spacer/>
          <Button width="full" onClick={handleSetEdit}>Edit</Button>
        </Flex>
      </Box>
    </Flex>
  )
}