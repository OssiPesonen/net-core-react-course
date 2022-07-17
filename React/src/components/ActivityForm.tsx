import React from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import { Activity } from '@/models/activity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import agent from '@/assets/api-agent';

interface ActivityFormProps {
  activity?: Activity;
  onCancel?: () => void;
}

export default function ActivityForm({ onCancel, activity }: ActivityFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      agent.Activities.update(data).then(() => {
        console.log('Updated activity successfully');
      });
    } else {
      agent.Activities.create(data).then(() => {
        console.log('Added activity successfully');
      });
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
          { onCancel && <Button w="full" variant="outline" type="button" onClick={ onCancel }>Cancel</Button> }
          <Button w="full" type="submit" colorScheme="teal">Submit</Button>
        </Flex>
      </form>
    </Box>
  );
}