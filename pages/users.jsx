import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

export default function Blog() {
  const [data, setData] = useState(false)


  const registerUser = async (event) => {
    event.preventDefault()

    // console.log(event?.target?.password?.value)

    axios.post('/api/spotify/users', { password: event?.target?.password?.value }).then((res) => {
      setData(res?.data?.message)
      event?.target?.password?.value = ""
    }).catch((err) => {
      console.log(err)
      setData(false)
      event?.target?.password?.value = ""
    })
  }

  return (
    <>
      <div className="container">

        <br /><br />
        <h1>Spotivity Users</h1>

        <form onSubmit={registerUser}>
          <input name="password" type="password" placeholder="Password" />
        </form>

        <div>
          {data ?
            (
              <>
                <h3>User count: {data ? data.length : 'error'}</h3>
                {data?.map((user, index) => {
                  return (
                    <div key={user._id} className='flexthing'>
                      <div>
                        <h4 style={{ marginRight: 15 }}>{index + 1}.</h4>
                      </div>
                      <div>
                        <h5 className='zero'>{user?.currentDisplayName ? user?.currentDisplayName : "error"}</h5>
                        <h6>{user?.email ? user?.email : "error"}</h6>
                        {/* {JSON.stringify(user)} */}
                      </div>
                    </div>
                  )
                })}
              </>
            ) : null}
        </div>
      </div>
    </>
  )
}
