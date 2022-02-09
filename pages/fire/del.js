import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import '../../components/fire'
import { getFirestore, collection, getDoc, doc, deleteDoc } from 'firebase/firestore';
import {app} from "../../components/fire";

const db = getFirestore(app);

export default function Delete(props) {
  const [message, setMessage] = useState('wait.')
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query.id !== undefined) {
      setMessage('Delete id = ' + router.query.id)
      const citiesCol = doc(db, 'mydata', router.query.id);

      getDoc(citiesCol).then(ob=>{
        setData(ob.data())
      })
    } else {
      setMessage(message + '.')
    }
  }, [message])

  const doAction = (e)=> {
    const citiesCol = doc(db, 'mydata', router.query.id);
    deleteDoc(citiesCol).then(ref=> {
      router.push('/fire')
    })
  }

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-left">
          Name: {data != null ? data.name : '...'}<br/>
          Mail: {data != null ? data.mail : '...'}<br/>
          Age: {data != null ? data.age : '...'}
        </pre>
          <button onClick={doAction} className="btn btn-primary">
            Delete
          </button>
        </div>
      </Layout>
    </div>
  )
}