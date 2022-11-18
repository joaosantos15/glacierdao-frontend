import { Fragment, useState } from 'react'

export const Stage4ReposTable = ({ repos, setRepos, activeUser, totalVotes }) => {
  const [expanded, setExpanded] = useState(undefined)
  

  const handleSubmitProof = ({ url, dealId, pieceCid }) => {
    const newRepos = repos.map((repo) => {
      if (repo.url === url) {
        repo.dealId = dealId
        repo.pieceCid = pieceCid
      }
      return repo
    })

    setRepos(newRepos)
  }

  const handleVote = ({ url, voteYes }) => {
    const newRepos = repos.map((repo) => {
      if (repo.url === url) {
        if(voteYes){
          repo.votesYes = (repo.votesYes || 0) + activeUser.funding
          if(Math.floor((repo.votesYes / totalVotes) * 100) > 50){
            repo.storageDealApproved = true
          }
        } else {
          repo.votesNo = (repo.votesNo || 0) + activeUser.funding
        }
        
      }
      return repo
    })

    setRepos(newRepos)
  }
  return (
    <div className="px-4 sm:px-6 lg:px-32">
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      % votes YES
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
                    const isExpanded = expanded === repo.url
                    const hasApplication = typeof repo.dealId !== 'undefined'

                    return (
                      <>
                        <tr
                          className={
                            repoIdx % 2 === 0 ? undefined : 'bg-gray-50'
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {repo.url}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {repo.votes}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {`${
                              typeof repo.votesYes !== 'undefined'
                                ? Math.floor((repo.votesYes / totalVotes) * 100)
                                : '0%'
                            }`}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() =>
                                isExpanded
                                  ? setExpanded(undefined)
                                  : setExpanded(repo.url)
                              }
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {isExpanded ? 'Hide' : 'View'}
                              <span className="sr-only"></span>
                            </button>
                          </td>
                          <div></div>
                        </tr>
                        <SubmissionForm
                          key={repo.url}
                          repoIdx={repoIdx}
                          repo={repo}
                          setExpanded={setExpanded}
                          isExpanded={isExpanded}
                          handleVote={handleVote}
                        />
                      </>
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


const SubmissionForm = ({
  repo,
  isExpanded,
  setExpanded,
  repoIdx,
  handleVote,
}) => {
  const [dealId, setDealId] = useState('')
  const [pieceCid, setPieceCid] = useState('')

  return (
    <>
      {isExpanded ? (
        <tr key={repo.url + 'expanded'} className="bg-gray-50 px-6 py-8">
          <td colSpan="4" className="px-5 py-8">
            <p className="mb-4 font-bold">Deal ID</p>
            <p className="mb-4 font-mono">{repo.dealId}</p>
            <p className="mt-8 font-bold">PieceCID</p>
            <p className="mb-4 font-mono">{repo.pieceCid}</p>
            
            <div className="grid grid-cols-1 justify-center mb-8">
              <button
                type="button"
                className=" m-auto mt-8 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleVote({url: repo.url, voteYes: true})}
              >
                Access Data 🔗
              </button>
            </div>
          </td>
        </tr>
      ) : undefined}
    </>
  )
}
