import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from '../../components/fire';

const db = getFirestore(app);
// const db = getFirestore()

export default function Home() {
  const mydata = []
  const [data, setData] = useState(mydata)
  const [message, setMessage] = useState('wait...')

  useEffect(() => {
    const citiesCol = collection(db, 'mydata');
    // const citySnapshot = await getDocs(citiesCol);

    getDocs(citiesCol).then((snapshot)=> {
      snapshot.forEach((document)=> {
        const doc = document.data()
        mydata.push(
          <tr key={document.id}>
            <td><a href={'/fire/del?id=' + document.id}>
              {document.id}</a></td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        )
      })
      setData(mydata)
      setMessage('Firebase data.')
    })
  }, [])

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <table className="table bg-white text-left">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Age</th>
            </tr>
            </thead>
            <tbody>
            {data}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}