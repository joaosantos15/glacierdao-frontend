import { Fragment, useState } from 'react'

export const Stage2ReposTable = ({
  repos,
  setRepos,
  activeStorageProvider,
  storageProviders,
  setStorageProviders,
}) => {
  const [expanded, setExpanded] = useState(undefined)
  
  const updateStorageProvider = ({url}) => {
    const newSps = storageProviders.map(sp => {
      if(sp.address === activeStorageProvider.address){
        sp.applications = [...sp.applications, url]
      }
      return sp
    })
    setStorageProviders(newSps)
  }
  
  const handleSubmitProof = ({ url, dealId, pieceCid }) => {
    const newRepos = repos.map((repo) => {
      if (repo.url === url) {
        repo.dealId = dealId
        repo.pieceCid = pieceCid
        updateStorageProvider({url})
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
                    if (hasApplication) {
                      return (
                        <ExpandedApplication
                          key={repo.url}
                          repoIdx={repoIdx}
                          repo={repo}
                          setExpanded={setExpanded}
                          isExpanded={isExpanded}
                        />
                      )
                    }
                    return (
                      <SubmissionForm
                        key={repo.url}
                        repoIdx={repoIdx}
                        repo={repo}
                        setExpanded={setExpanded}
                        isExpanded={isExpanded}
                        handleSubmitProof={handleSubmitProof}
                      />
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

const ExpandedApplication = ({ repo, isExpanded, setExpanded, repoIdx }) => {
  return (
    <>
      <tr className={repoIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {repo.url}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {repo.votes}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            onClick={() =>
              isExpanded ? setExpanded(undefined) : setExpanded(repo.url)
            }
            className="text-indigo-600 hover:text-indigo-900"
          >
            {isExpanded ? 'Hide' : 'View'}
            <span className="sr-only"></span>
          </button>
        </td>
        <div></div>
      </tr>
      {isExpanded ? (
        <tr key={repo.url + 'expanded'} className="bg-gray-50 px-6 py-8">
          <td colSpan="3" className="px-5 py-6">
            <p className="mb-4 font-bold">Deal ID</p>
            <p className="mb-4 font-mono">{repo.dealId}</p>
            <p className="mt-8 font-bold">PieceCID</p>
            <p className="mb-4 font-mono">{repo.pieceCid}</p>
          </td>
        </tr>
      ) : undefined}
    </>
  )
}

const SubmissionForm = ({
  repo,
  isExpanded,
  setExpanded,
  repoIdx,
  handleSubmitProof,
}) => {
  const [dealId, setDealId] = useState('')
  const [pieceCid, setPieceCid] = useState('')

  return (
    <>
      <tr className={repoIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {repo.url}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {repo.votes}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            onClick={() =>
              isExpanded ? setExpanded(undefined) : setExpanded(repo.url)
            }
            className="text-indigo-600 hover:text-indigo-900"
          >
            {isExpanded ? 'Hide' : 'Apply'}
            <span className="sr-only"></span>
          </button>
        </td>
        <div></div>
      </tr>
      {isExpanded ? (
        <tr key={repo.url + 'expanded'} className="bg-gray-50 px-6 py-8">
          <td colSpan="3" className="px-5 py-6">
            <p className="mb-4 font-bold">Deal ID</p>
            <Input value={dealId} setValue={setDealId} />
            <p className="mt-8 font-bold">PieceCID</p>
            <Input value={pieceCid} setValue={setPieceCid} />
            <div className="grid justify-end">
              <button
                type="button"
                onClick={() =>
                  handleSubmitProof({ url: repo.url, dealId, pieceCid })
                }
                className=" m-auto mt-16 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {`Submit`}
              </button>
            </div>
          </td>
        </tr>
      ) : undefined}
    </>
  )
}

export default function Input({ value, setValue }) {
  return (
    <form>
      <label htmlFor="Text" className="sr-only">
        amount of FIL
      </label>
      <input
        type="text"
        name="fil"
        id="email"
        className="block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
