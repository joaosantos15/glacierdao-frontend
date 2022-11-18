import { useContext, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage3ReposTable } from './Stage3ReposTable'
import { Stage3SPTable } from './Stage3SPTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const SPStage3 = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [repoUrl, setRepoUrl] = useState('https://')
  const { users, setUsers, activeUser, repos, setRepos, activeStorageProvider } = useContext(DappContext)


  return (
    <>
      <PageTitle
        title="Stage 3 is live"
        subtitle={'Dao member are voting on applications'}
      />
      <div className=" mx-auto grid grid-cols-3  max-w-7xl py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        {/* <div>
          <h3 className=" text-center text-xl capitalize">Your number of available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div> */}
        <div>
          <h3 className=" text-center text-xl capitalize">Proofs waiting for approval</h3>
          <h3 className=" mt-4 text-center text-5xl">3</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Potential Rewards</h3>
          <h3 className=" mt-4 text-center text-5xl">99 FIL</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Time left to submit application proofs</h3>
          <h3 className=" mt-4 text-center text-5xl">5 Days</h3>
        </div>
      </div>
     
      <h3 className=" text-center text-3xl font-bold mt-16 capitalize">Current submissions</h3>
      
      <Stage3SPTable repos={repos} activeStorageProvider={activeStorageProvider}/>
      
      
    
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
