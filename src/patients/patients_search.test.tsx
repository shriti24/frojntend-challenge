import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Patient } from './patients';
import { PatientsSearch } from './patients_search';

const metadata = new Promise<Patient[]>((resolve, reject) => {
  [
    {
      name: 'Steve Jobs',
      id: 'AAA-0001',
      ehrID: 'PATID184AB',
    },
    {
      name: 'Judith Faulkner',
      id: 'AAA-0002',
      ehrID: 'EPIC012385',
    },
  ];
});

const metadata1 = new Promise<Patient[]>((resolve) =>
  resolve([
    {
      name: 'Hello',
      id: '1',
      ehrID: 'H1',
    },
  ])
);

const metadata2 = Promise.reject(new Error('fail'));

describe('Patients Search', () => {
  test('render the page Patients Search ', async () => {
    const props = {
      loadPatients: () => metadata1,
      onResults: () => ({
        name: 'Judith Faulkner',
        id: 'AAA-0002',
        ehrID: 'EPIC012385',
      }),
      setLoadImage: jest.fn(),
    };
    render(<PatientsSearch {...props} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'j' } });
    expect(screen.getByRole('textbox')).toHaveValue('j');
  });

  test('render the page Patients Search ', async () => {
    const props = {
      loadPatients: jest.fn().mockImplementationOnce(() => Promise.reject('error')),
      onResults: () => ({}),
      setLoadImage: jest.fn(),
    };
    waitFor(() => render(<PatientsSearch {...props} />));
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
