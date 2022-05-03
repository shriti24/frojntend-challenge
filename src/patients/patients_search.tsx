import { FunctionComponent } from 'react';
import { Patient, PatientSearchQuery } from './patients';
import { useDispatch, useSelector } from 'react-redux';
import { ToastBox } from '../toast/toast';

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
  setLoadImage: (status: boolean) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
  setLoadImage,
}) => {
  // const [query, updateQuery] = useState(''); not neccesarry
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const props = {
    title: state.message,
    message: state.message,
    status: state.type,
  };

  const makeRequest = (query: string) => {
    if (query === '') {
      dispatch({ type: 'success', payload: '' });
    }
    setLoadImage(true);
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };
    loadPatients(sq)
      .then((ps) => {
        onResults(ps);
        if (query !== '') {
          dispatch({ type: 'success', payload: 'Fetched data' });
        }
        setLoadImage(false);
      })
      .catch((err) => {
        alert(err);
        dispatch({ type: 'success', payload: err });
        setLoadImage(false);
      });
  };

  return (
    <div>
      {state.message !== '' && <ToastBox {...props} />}
      <input
        onChange={(e) => {
          makeRequest(e.target.value);
        }}
      />
    </div>
  );
};

// not sure what is this used for.?
type psearchboxprops = {
  onQueryChange: (query: PatientSearchQuery) => void;
};
