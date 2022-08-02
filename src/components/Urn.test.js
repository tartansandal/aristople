import { render, screen } from '@testing-library/react';
import Urn from './Urn';

test('Renders the Total slider by default', () => {
  render(<Urn />);
  const start = screen.getByText('Total');
  expect(start).toBeInTheDocument();
});
