export const  PageTitle = ({title, subtitle}) => {
    return (
      <div className=" bg-transparent">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {title}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }
  