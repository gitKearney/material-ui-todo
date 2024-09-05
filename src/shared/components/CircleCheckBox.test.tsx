import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircleCheckBox from './CircleCheckBox';

<CircleCheckBox name="Todo 1" priority={1} status={'not_done'} position={0} />
test('loads items eventually', async () => {
  render(<CircleCheckBox priority={4} name={'One'} position={0} status={'not_done'} />);
  const items = await screen.findAllByText(/One/);
  expect(items).toHaveLength(1);
})