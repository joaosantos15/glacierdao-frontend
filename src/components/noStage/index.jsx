import { useContext, useState } from 'react'

import { APP_CLIENT_INTERNALS } from 'next/dist/shared/lib/constants'
import { AuthLayout } from '../AuthLayout'
import { CallToAction } from '@/components/CallToAction'
import { Container } from '../Container'
import { DappContext } from '@/pages/dao'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Stage0FundingTable } from './Stage0FundingTable'
// import { Stage1ReposTable } from './Stage1ReposTable'
import { Testimonials } from '@/components/Testimonials'
import backgroundImage from '@/images/background-faqs.jpg'

const FUNDING_THRESHOLD = 100

export const NoStage = () => {
  const stats = [{ name: 'Funding commited so far', stat: '8039 FIL' }]
  const [funding, setFunding] = useState(0)
  const { users, setUsers, activeUser, totalVotes, repos, setRepos } =
    useContext(DappContext)

  // const submitFunding = () => {
  //   const newUsers = users.map((u) => {
  //     if (u.address === activeUser.address) {
  //       u.funding = funding
  //       u.votes = funding
  //     }
  //     return u
  //   })
  //   setUsers(newUsers)
  // }

  const [repoUrl, setRepoUrl] = useState('https://')

  const resetActiveUserVotes = () => {
    const newUsers = users.map((u) => {
      if (u.address === activeUser.address) {
        u.votes = 0 // because the user has just voted
      }
      return u
    })
    setUsers(newUsers)
  }

  const submitVote = ({ url }) => {
    const newRepos = repos.map((r) => {
      if (r.url === url) {
        r.votes = activeUser.votes
      }
      return r
    })

    setRepos(newRepos)
    resetActiveUserVotes()
  }

  const submitRepo = () => {
    const newRepos = [
      ...repos,
      {
        url: repoUrl,
        // votes: activeUser.votes,
      },
    ]

    setRepos(newRepos)
    resetActiveUserVotes()
  }

  // new state

  const [currentUserVotes, setCurrentUserVotes] = useState(0)

  const buyVotes = (daiAmount) => {
    if (
      window.confirm(
        `You are about to burn ${daiAmount} to receive ${daiAmount * 10} votes.`
      )
    ) {
      setCurrentUserVotes(currentUserVotes + daiAmount * 10)
      setFunding(0)
    }
  }

  const castVotes = ({ url, numberOfVotes }) => {
    if (currentUserVotes < numberOfVotes) {
      window.alert(
        `You don't have enough votes. Votes available: ${currentUserVotes}`
      )
      return
    }

    let urlFound = false
    const newRepos = repos.map((r) => {
      if (r.url === url && !urlFound) {
        urlFound = true
        r.votes = activeUser.votes
        r.newVotes = r.newVotes || 0
        r.newVotes = r.newVotes + numberOfVotes
        setCurrentUserVotes(currentUserVotes - numberOfVotes)
      }
      return r
    })

    setRepos(newRepos)
  }

  return (
    <>
      <PageTitle
        title="Fund Your Repos"
        subtitle={'Burn tokens to receive votes'}
      />
      <div className=" mx-auto grid  max-w-7xl grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl">Available votes</h3>
          <h3 className=" mt-4 text-center text-5xl">{`${currentUserVotes}`}</h3>
        </div>
        <div className="flex flex-col">
          <h3 className=" text-center text-xl">
            Commit Funding (1 DAI = 10 votes)
          </h3>
          <div className="m-auto mt-4 px-16">
            <Input funding={funding} setFunding={setFunding} />
          </div>
          {/* <h3 className=" mt-4 text-center text-xl">{`Number of votes: ${funding}`}</h3> */}
          <button
            type="button"
            className="m-auto mt-16 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              buyVotes(funding)
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {/* <div className=" mx-auto grid  max-w-7xl  py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl">Funding committed so far</h3>
          <h3 className=" mt-4 text-center text-5xl">{`${totalVotes} FIL`}</h3>
        </div>
      </div> */}
      <h3 className=" mt-16 text-center text-3xl font-bold capitalize">
        Cast your votes
      </h3>
      <Stage1ReposTable repos={repos} castVotes={castVotes} />

      <div className=" mt-8 flex flex-col">
        <h3 className=" text-center text-xl">Or Submit a repo</h3>
        <div className="m-auto mt-4">
          <RepoUrlInput repoUrl={repoUrl} setRepoUrl={setRepoUrl} />
        </div>
        <button
          type="button"
          className="m-auto mt-16 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={submitRepo}
        >
          {`Submit repo`}
        </button>
      </div>
      {/* <h3 className=" text-center text-3xl font-bold">Current Backers</h3>
      <Stage0FundingTable users={users} /> */}
      {/* <div className=" mx-auto grid  max-w-7xl grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl capitalize">
            Your number of available votes
          </h3>
          <h3 className=" mt-4 text-center text-5xl">{activeUser.votes}</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">Time left to vote</h3>
          <h3 className=" mt-4 text-center text-5xl">3 Days</h3>
        </div>
      </div> */}
    </>
  )
}

export const Stage1ReposTable = ({ repos, castVotes }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Funding
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Vote</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {repos.map((repo, repoIdx) => {
                    const repoFunded = (repo.newVotes || 0) >= FUNDING_THRESHOLD
                    return (
                      <tr
                        key={repo.url}
                        className={repoIdx % 2 === 0 ? undefined : 'bg-gray-50'}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {repo.url}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{repo.votes}</td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {!repoFunded ? (
                            <progress
                              className=" rounded-md"
                              id="file"
                              max={FUNDING_THRESHOLD}
                              value={repo.newVotes || 0}
                            ></progress>
                          ) : (
                            <span className="inline-flex items-center  rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                              Funded and stored
                            </span>
                          )}
                          <span className="m-auto block w-full">
                            {repo.newVotes || 0} votes
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            className={`text-indigo-600 hover:text-indigo-900 ${
                              repoFunded ? 'hidden' : ''
                            }`}
                            // onClick={() => submitVote({url: repo.url})}
                            onClick={() =>
                              castVotes({ url: repo.url, numberOfVotes: 10 })
                            }
                          >
                            Vote<span className="sr-only"></span>
                          </button>
                          <span className={`m-auto block w-full ${repoFunded ? '' : 'hidden'}`}>
                            Storage deal expires in 18 months
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        // placeholder={funding}
        value={funding}
        onChange={(e) => setFunding(e.target.value)}
      />
    </div>
  )
}

const RepoUrlInput = ({ repoUrl, setRepoUrl }) => {
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
