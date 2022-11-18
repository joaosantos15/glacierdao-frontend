import { useContext, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage0FundingTable } from './Stage0FundingTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const UserStage0 = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [funding, setFunding] = useState(0)
  const { users, setUsers, activeUser, totalVotes, setTotalVotes } = useContext(DappContext)

  const submitFunding = () => {
    const newUsers = users.map((u) => {
      if (u.address === activeUser.address) {
        u.funding = Math.floor(u.funding) + Math.floor(funding)
        u.votes = Math.floor(u.votes) + Math.floor(funding)
        setTotalVotes(totalVotes + Math.floor(funding))
      }
      return u
    })
    setUsers(newUsers)
  }

  return (
    <>
      <PageTitle
        title="Stage 0 is live"
        subtitle={'Funding is now open. Stage 1 starts in 28 days...'}
      />
      <div className=" mx-auto grid  max-w-7xl grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl">Funding committed so far</h3>
          <h3 className=" mt-4 text-center text-5xl">7455 FIL</h3>
        </div>
        <div className="flex flex-col">
          <h3 className=" text-center text-xl">Commit Funding</h3>
          <div className="m-auto mt-4 px-16">
            <Input funding={funding} setFunding={setFunding} />
          </div>
          <h3 className=" mt-4 text-center text-xl">{`Number of votes: ${funding}`}</h3>
          <button
            type="button"
            className="m-auto mt-16 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={submitFunding}
          >
            Submit
          </button>
        </div>
      </div>
      <h3 className=" text-center text-3xl font-bold">Current Backers</h3>
      <Stage0FundingTable users={users} />
      {/* <Hero /> */}

      {/* <Faqs /> */}
    </>
  )
}

export default function Input({ funding, setFunding }) {
  return (
    <div>
      <label htmlFor="Text" className="sr-only">
        amount of FIL
      </label>
      <input
        type="number"
        name="fil"
        id="email"
        size="9"
        className="block rounded-md border-gray-300 text-center text-5xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-5xl"
        placeholder={funding}
        onChange={(e) => setFunding(e.target.value)}
      />
    </div>
  )
}
