import { useContext, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage1ReposTable } from './Stage1ReposTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const UserStage1 = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [repoUrl, setRepoUrl] = useState('https://')
  const { users, setUsers, activeUser, repos, setRepos } = useContext(DappContext)

  const submitRepo = () => {
    const newRepos = [...repos, {
        url: repoUrl,
        votes: activeUser.votes
    }]
    
    setRepos(newRepos)

    const newUsers = users.map((u) => {
        if (u.address === activeUser.address) {
          u.votes = 0 // because the user has just voted
        }
        return u
      })
      setUsers(newUsers)
  }

  return (
    <>
      <PageTitle
        title="Stage 1 is live"
        subtitle={'Propose Repos and Vote. Stage 2 starts in 5 days...'}
      />
      <div className=" mx-auto grid  max-w-7xl grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl capitalize">Your number of available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Time left to vote</h3>
          <h3 className=" mt-4 text-center text-5xl">3 Days</h3>
        </div>
      </div>
      <div className="flex flex-col">
          <h3 className=" text-center text-xl">Submit a repo</h3>
          <div className="m-auto mt-4">
            <Input repoUrl={repoUrl} setRepoUrl={setRepoUrl} />
          </div>
          <button
            type="button"
            className="mt-16 m-auto inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={submitRepo}
          >
            {`Submit and cast my ${activeUser.votes} votes`}
          </button>
        </div>
      <h3 className=" text-center text-3xl font-bold mt-16">Or vote on an existing submission</h3>
      <Stage1ReposTable repos={repos}/>
      
      
    
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
