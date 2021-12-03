import axios from 'axios'
import { useState } from 'react'

export default function Blog() {
  const [data, setData] = useState(false)


  const registerUser = async (event) => {
    event.preventDefault()
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
        <h2 className="zero">Spotivity Users</h2>
        <p className="zero">Enter your password to check Spotivity analytics.</p>
        <p>Download the app from <a href="//arhn.us/spotivity" target="_blank">arhn.us/spotivity</a> if you haven't already.</p>

        <form onSubmit={registerUser}>
          <input name="password" type="password" placeholder="Password" />
        </form>

        <div className="userdata">
          {data ?
            (
              <>
                <h4 style={{ marginBottom: 20 }}>User count: {data ? data.length : 'error'}</h4>
                <div className="GFG">

                  {data?.map((user, index) => {
                    const event = new Date(user?.createdAt);

                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const date = event.toLocaleDateString("en-US", options)
                    return (
                      <div key={user._id} style={{ marginBottom: 20 }} className='flexthing'>
                        <div>
                          <h4 className="mono zero noselect" style={{ marginRight: '0.75em' }}>{data.length > 9 ? `0${index + 1}` : index + 1}</h4>
                        </div>
                        <div>
                          <h5 className='zero'>{user?.currentDisplayName ? user?.currentDisplayName : "error"}</h5>
                          <h6 className="zero">{user?.email ? user?.email : "error"}</h6>
                          <p style={{ fontSize: '0.9em' }} className="zero">{date}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : null}
        </div>
      </div>
    </>
  )
}
