export const Stage5ReposTable = ({ repos }) => {
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
                      className="px-3 py-3.5 pr-8 text-left text-right text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {repos.map((repo, repoIdx) => {
                   
                    let approved = repo.storageDealApproved 
                    
                    return (
                      <tr
                        key={repo.url}
                        className={repoIdx % 2 === 0 ? undefined : 'bg-gray-50'}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {repo.url}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {repo.votes} FIL
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 pr-8 text-right text-sm text-gray-500">
                          {' '}
                          {approved ? (
                            <span className="inline-flex items-center  rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                              Finished
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                              No applications received
                            </span>
                          )}
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
