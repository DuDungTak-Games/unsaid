import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
const pb = new PocketBase(import.meta.env.VITE_DB_URL);
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    
    authenticate(pb);
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Fetched Data:</h2>
        {
        // data ? (
        //   <ul>
        //     {data.map((item) => (
        //       <li key={item.id}>{item.name}</li>
        //     ))}
        //   </ul>
        // ) : 
        (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

/* 
추후 이 부분을 superUser로 로그인하는것이 아닌
일반 유저로 로그인하여 데이터를 가져오는 방식으로 변경해야함
*/
async function authenticate(pb) {
  try {
    console.log(`${import.meta.env.VITE_DB_EMAIL} 임`);
    console.log("하이요");
    const authData = await pb.admins.authWithPassword(
      import.meta.env.VITE_DB_EMAIL,
      import.meta.env.VITE_DB_PASSWORD
    );
    console.log('Authenticated successfully:', authData.token);

    await fetchData(pb);
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

async function fetchData(pb) {
  try {
    const records = await pb.collection('user_mt').getFullList();
    console.log(records);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default App