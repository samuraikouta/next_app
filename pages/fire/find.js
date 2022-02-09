import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import '../../components/fire'
import { getFirestore, collection, getDocs, doc, deleteDoc, query, where, startAt, endAt, orderBy } from 'firebase/firestore';
import { app } from '../../components/fire';

const db = getFirestore(app);

export default function Find() {
  const [message, setMessage] = useState('find data')
  const [find, setFind] = useState('')
  const [data, setData] = useState([])
  const mydata = []

  const onChangeFind = ((e)=> {
    setFind(e.target.value)
  })

  const doAction = ((e)=> {
    const q = query(collection(db, "mydata"), where("name", "==", find));
    // const q = query(collection(db, "mydata"), orderBy('name'), startAt(find));
    getDocs(q).then(snapshot=> {
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
      setMessage("find: " + find)
    })
  })

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Find:</label>
              <input type="text" onChange={onChangeFind}
                     className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Find
          </button>
        </div>
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
      </Layout>
    </div>
  )
}