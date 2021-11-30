import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

export default function Blog() {
	const [data, setData] = useState(false)


	const registerUser = async (event) => {
		event.preventDefault()

		// console.log(event?.target?.password?.value)
    
    axios.post('/api/spotify/users', {password: event?.target?.password?.value}).then((res)=>{
      setData(res?.data?.message)
      event?.target?.password?.value = ""
    }).catch((err)=>{
      console.log(err)
      setData(false)
      event?.target?.password?.value = ""
    })
	}

	return (
		<>
			<h1>Spotivity Users</h1>

			<form onSubmit={registerUser}>
				<input name="password" type="password" placeholder="Password" />
			</form>

      <div>
        {data?
        (
          <>
          <h1>User count: {data?data.length:'error'}</h1>
        {  data?.map((user)=>{
            return (
              <h4>{user?.currentDisplayName?user?.currentDisplayName:"error"}</h4>
            )
          })}
              </>
        ) :null}
      </div>
		</>
	)
}
