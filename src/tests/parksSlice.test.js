import {
  calculateTotalActivities,
  calculateTotalTopics,
  calculateStatesData,
} from '../features/parksSlice';

test('calculateTotalActivities calculates the total number of activities correctly', () => {
  const parks = [
    { activities: ['Hiking', 'Camping'] },
    { activities: ['Fishing'] },
    { activities: [] },
  ];

  const totalActivities = calculateTotalActivities(parks);

  expect(totalActivities).toBe(3);
});

test('calculateTotalTopics calculates the total number of unique topics correctly', () => {
  const parks = [
    { topics: ['Nature', 'Hiking'] },
    { topics: ['History'] },
    { topics: ['Hiking', 'Camping'] },
    { topics: [] },
  ];

  const totalTopics = calculateTotalTopics(parks);

  expect(totalTopics).toBe(4);
});

test('calculateStatesData calculates the states data correctly', () => {
  const parks = [
    { addresses: [{ stateCode: 'NY' }], activities: ['Hiking', 'Camping'], topics: ['Nature'] },
    { addresses: [{ stateCode: 'CA' }], activities: ['Surfing', 'Swimming'], topics: ['Beach'] },
    { addresses: [{ stateCode: 'NY' }], activities: ['Fishing'], topics: ['Nature', 'Outdoor'] },
    { addresses: [{ stateCode: 'CA' }], activities: [], topics: [] },
  ];

  const statesData = calculateStatesData(parks);

  expect(statesData).toEqual({
    NY: {
      id: 2,
      stateCode: 'NY',
      totalParks: 2,
      totalActivities: 3,
      totalTopics: 3,
    },
    CA: {
      id: 3,
      stateCode: 'CA',
      totalParks: 2,
      totalActivities: 2,
      totalTopics: 1,
    },
  });
});
