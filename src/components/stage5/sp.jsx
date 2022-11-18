import { useContext, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage5ReposTable } from './Stage5ReposTable'
import { Stage5SPTable } from './Stage5SPTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const SPStage5 = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [repoUrl, setRepoUrl] = useState('https://')
  const {
    users,
    setUsers,
    activeUser,
    repos,
    setRepos,
    activeStorageProvider,
  } = useContext(DappContext)

  return (
    <>
      <PageTitle
        title="Stage 5 is live"
        subtitle={'You may collect your rewards'}
      />
      <div className=" mx-auto grid max-w-7xl  grid-cols-3 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        {/* <div>
          <h3 className=" text-center text-xl capitalize">Your number of available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div> */}
        <div>
          <h3 className=" text-center text-xl capitalize">
            Accepted Proposals
          </h3>
          <h3 className=" mt-4 text-center text-5xl">3</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Rewards</h3>
          <h3 className=" mt-4 text-center text-5xl">99 FIL</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">
            Time until next Epoch
          </h3>
          <h3 className=" mt-4 text-center text-5xl">5 Days</h3>
        </div>
      </div>
      <div className='flex mt-16 mb-24'>
        <button
          type="button"
          className=" px-20 m-auto inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Collect 99 FIL 💸
        </button>
      </div>

      <h3 className=" mt-16 px-32 text-center text-2xl ">
        {
          'Your Deals'
        }
      </h3>

      <Stage5SPTable
        repos={repos}
        activeStorageProvider={activeStorageProvider}
      />
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
