import { useContext, useEffect, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage2ReposTable } from './Stage2ReposTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const SPStage2 = () => {
  const {
    users,
    setUsers,
    activeUser,
    repos,
    setRepos,
    activeStorageProvider,
    storageProviders,
    setStorageProviders,
  } = useContext(DappContext)

  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [repoUrl, setRepoUrl] = useState('https://')

  const [clientRender, setClientRender] = useState(false)
  useEffect(() => {
    setClientRender(true)
  }, [])

  return (
    <>
      <PageTitle
        title="Stage 2 is live"
        subtitle={'SPs are submitting their proofs'}
      />
      <div className=" mx-auto grid max-w-7xl  grid-cols-3 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        {/* <div>
          <h3 className=" text-center text-xl capitalize">Your number of available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div> */}
        <div>
          <h3 className=" text-center text-xl capitalize">Proofs Submitted</h3>
          <h3 className=" mt-4 text-center text-5xl">3</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Potential Rewards</h3>
          <h3 className=" mt-4 text-center text-5xl">99 FIL</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">
            Time left to submit proofs
          </h3>
          <h3 className=" mt-4 text-center text-5xl">5 Days</h3>
        </div>
      </div>

      <h3 className=" mt-16 text-center text-3xl font-bold capitalize">
        Current submissions
      </h3>
      {clientRender && (
        <Stage2ReposTable
          repos={repos}
          setRepos={setRepos}
          activeStorageProvider={activeStorageProvider}
          storageProviders={storageProviders}
          setStorageProviders={setStorageProviders}
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
