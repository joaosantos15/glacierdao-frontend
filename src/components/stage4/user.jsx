import { useContext, useEffect, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage4ReposTable } from './Stage4ReposTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const UserStage4 = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [repoUrl, setRepoUrl] = useState('https://')
  const [clientRender, setClientRender] = useState(false)
  const { users, setUsers, activeUser, repos, setRepos, totalVotes } =
    useContext(DappContext)

  const numberOfApplications = repos.filter(
    (r) => typeof r.dealId !== 'undefined'
  ).length

  useEffect(() => {
    setClientRender(true)
  }, [])

  return (
    <>
      <PageTitle
        title="Stage 4 is live"
        subtitle={''}
      />
      <div className=" mx-auto grid max-w-7xl  grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        {/* <div>
          <h3 className=" text-center text-xl capitalize">Your number of available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div> */}
        <div>
          <h3 className=" text-center text-xl capitalize">
            Live Deals
          </h3>
          <h3 className=" mt-4 text-center text-5xl">{numberOfApplications}</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">
            Time until end of Epoch
          </h3>
          <h3 className=" mt-4 text-center text-5xl">5 Days</h3>
        </div>
      </div>

      <h3 className=" mt-16 text-center text-3xl font-bold capitalize">
        Active Replication Deals
      </h3>
      {clientRender && (
        <Stage4ReposTable
          repos={repos}
          setRepos={setRepos}
          totalVotes={totalVotes}
          activeUser={activeUser}
        />
      )}
    </>
  )
}

export default function Input({ repoUrl, setRepoUrl }) {
  return (
    <div>
      <label htmlFor="Text" className="sr-only">
        Repo url
      </label>
      <input
        type="text"
        name="repo-url"
        id="repo-url"
        size="50"
        className="block rounded-md border-gray-300 text-center text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        placeholder={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
    </div>
  )
}
