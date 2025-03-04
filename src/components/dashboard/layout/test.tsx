'use client';

import * as React from 'react';
import type { Schema } from '@/../amplify/data/resource';
import Button from '@mui/material/Button';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

export function Test(): React.JSX.Element {
  const fetchSKM01 = async (): Promise<void> => {
    const { data: SKM01 } = await client.models.SKM01.list();
    console.log(SKM01);
  };
  const createSKM01 = async (): Promise<void> => {
    await client.models.SKM01.create({
      content: 'BBB', // window.prompt('Todo content?'),
      isDone: false,
    });
  };
  return (
    <>
      <Button onClick={createSKM01}>Add new SKM01</Button>
      <Button onClick={fetchSKM01}>Fetch SKM01</Button>
    </>
  );
}
