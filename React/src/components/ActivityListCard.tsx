import { Flex, Box, Heading, Text, Badge, Button } from '@chakra-ui/react';
import { Activity } from '@/models/activity';
import { formatDate } from '@/assets/utils';

interface ActivityCardProps {
  activity: Activity;
  onViewClick: (activity: Activity) => void;
  onDeleteClick: (activity: Activity) => void;
}

export default function ActivityCard({ activity, onViewClick, onDeleteClick }: ActivityCardProps) {
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
          <Flex alignItems="center" mb={4} mt={2}>
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
                    onClick={ () => onDeleteClick(activity) }>Delete</Button>
            <Button variant="outline" onClick={ () => onViewClick(activity) }>View</Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}