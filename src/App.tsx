import React, { useState } from 'react';
import './App.css';
import { Patient, PatientsService } from './patients/patients';
import { createNewPatientsApi } from './patients/patients_api';
import { PatientsLoader } from './patients/patients_loader_button';
import { PatientsSearch } from './patients/patients_search';
import CircularIndeterminate from './utils/loader';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);
  const [loader, setLoader] = useState(false);
  const [patientsApi] = useState<PatientsService>(createNewPatientsApi('http://localhost:3000'));

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Heartbeat 🏥</h1>
          <div
            style={{
              border: '1px solid white',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h2>Please load the patients using the button below or search</h2>
            <PatientsLoader loadPatients={patientsApi.All} onLoaded={updatePatients} />

            <PatientsSearch
              loadPatients={patientsApi.Search}
              onResults={updatePatients}
              setLoadImage={setLoader}
            />
            {patients.length > 0 && displayPatients(patients)}
            {loader && <CircularIndeterminate />}
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;

function displayPatients(patients: Patient[]) {
  return (
    <ul>
      {patients.map((p, k) => (
        <li style={{ listStyle: 'none' }} key={k}>
          ✅ {p.name}
        </li>
      ))}
    </ul>
  );
}
