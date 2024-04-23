"use client"

import { useEffect } from 'react';
import { CheckboxField } from '@aws-amplify/ui-react';
import { Grid, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';
import { post,get } from 'aws-amplify/api';

Amplify.configure(amplifyconfig);

async function getTodo() {
  try {
    const restOperation = get({ 
      apiName: 'todoApi',
      path: '/todo/1' 
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response.body);
  } catch (e) {
    console.log('GET call failed: ', e);
  }
}

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      await getTodo();
    }
    fetchData();
  }, []); // Khi component được tạo, fetchData sẽ được gọi một lần

  return (
    <Grid
      gap="var(--amplify-space-large)"
      templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
    >
      <TextField label="Example text field" />
      <TextField
        label="Example text field (with custom ID)"
        id="custom-input-id"
      />
      <CheckboxField label="Example checkbox" name="example" value="yes" />
    </Grid>
  );
}
