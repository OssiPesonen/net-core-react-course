import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import { RequestStatus, useStore } from '@/stores/store';
import { Activity } from '@/models/activity';
import { toast } from 'react-toastify';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const activity = activityStore.selectedActivity;

  useEffect(() => {
    if (activityStore.requestStatus.edit === 'complete') {
      toast.success('Successfully updated activity');
      activityStore.setRequestStatus('edit', RequestStatus.NOTSTARTED);
    }

    if (activityStore.requestStatus.create === 'complete') {
      toast.success('Successfully added activity');
      activityStore.setRequestStatus('create', RequestStatus.NOTSTARTED);
    }
  }, [activityStore.requestStatus.edit, activityStore.requestStatus.create]);

  const handleCancelEdit = () => {
    activityStore.setEdit(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Build the obj. Set a GUID for create request here.
    const data: Activity = {
      id : uuidv4(),
      title : formData.get('title') as string,
      description : formData.get('description') as string,
      category : formData.get('category') as string,
      date : formData.get('date') as string,
      venue : formData.get('venue') as string,
      city : formData.get('city') as string,
    };

    if (activity?.id) {
      data.id = activity.id;
      await activityStore.editActivity(data);
    } else {
      await activityStore.createActivity(data);
    }
  }

  return (
    <Box
      p={ 6 }
      w="full"
      borderWidth="1px"
      shadow="sm"
      position="relative">
      <Heading fontSize="lg" as="h4" mb={ 4 }>
        { activity ? 'Edit activity' : 'Create activity' }
      </Heading>
      <form onSubmit={ handleSubmit }>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id='title' type='text' name='title' defaultValue={ activity?.title }/>
        </FormControl>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea id='description' name='description' defaultValue={ activity?.description }/>
        </FormControl>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Input id='category' type='text' name='category' defaultValue={ activity?.category }/>
        </FormControl>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='date'>Date</FormLabel>
          <Input id='date' type='date' name='date' defaultValue={ activity?.date }/>
        </FormControl>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='city'>City</FormLabel>
          <Input id='city' type='text' name="city" defaultValue={ activity?.city }/>
        </FormControl>
        <FormControl mb={ 2 }>
          <FormLabel htmlFor='venue'>Venue</FormLabel>
          <Input id='venue' type='text' name='venue' defaultValue={ activity?.venue }/>
        </FormControl>
        <Flex mt={ 4 } gap={ 4 }>
          <Button
            w="full"
            variant="outline"
            type="button"
            onClick={ handleCancelEdit }
            disabled={ activityStore.requestStatus.create === 'pending' || activityStore.requestStatus.edit === 'pending' }
          >
            Cancel
          </Button>
          <Button
            w="full"
            type="submit"
            colorScheme="teal"
            isLoading={ activityStore.requestStatus.create === 'pending' || activityStore.requestStatus.edit === 'pending' }
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default observer(ActivityForm);