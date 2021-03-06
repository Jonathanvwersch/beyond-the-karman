import React, { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import LeftArrow from "../../images/leftArrow"
import TimerCard from "../TimerCard/TimerCard"
import AgencyCard from "../AgencyCard/AgencyCard"
import RocketCard from "../RocketCard/RocketCard"
import SEO from "../SEO/seo"
import ComponentLoadingSpinner from "../ComponentLoadingSpinner/ComponentLoadingSpinner"

function LaunchInfo({ location }) {
  const launchData = location.state
  const [launchInfo, setLaunchInfo] = useState()
  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          `https://ll.thespacedevs.com/2.0.0/launch/${launchData.id}`
        )
        const data = await response.json()

        setLaunchInfo(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  console.log(launchInfo)

  return (
    <div>
      <SEO title={launchData.name} />

      <div className="mt-10 btk-container bg-launch-image bg-cover">
        <div className="btk-container-inner flex-col">
          <div
            className="group inline-flex cursor-pointer"
            tabIndex="0"
            onClick={goBack}
            role="button"
            onKeyDown={e => {
              if (e.key === "Enter") {
                goBack()
              }
            }}
          >
            <LeftArrow />
            <h5 className="text-white text-xs px-1 group-hover:underline">
              Go back
            </h5>
          </div>
          <h1 className="text-white mt-10 text-2xl mb-6 md:text-4xl">
            {launchData.name}
          </h1>
          <TimerCard
            name={launchData.name}
            time={launchData.net}
            image={launchData.image}
            status={launchData.status.name}
            subText={launchData.launch_service_provider.name}
            next={true}
            slug={launchData.slug}
            data={launchData}
            cardButtons={false}
            description={launchData.mission.description}
            pad={launchData.pad.name}
            location={launchData.pad.location.name}
          />

          {launchInfo ? (
            <div className="flex flex-col">
              <AgencyCard
                logo={launchInfo.launch_service_provider.logo_url}
                name={launchInfo.launch_service_provider.name}
                description={launchInfo.launch_service_provider.description}
                website={launchInfo.launch_service_provider.info_url}
                image={launchInfo.launch_service_provider.image_url}
                wiki={launchInfo.launch_service_provider.wiki_url}
                foundingYear={launchInfo.launch_service_provider.founding_year}
                launchCount={
                  launchInfo.launch_service_provider.total_launch_count
                }
              />

              <RocketCard
                name={launchInfo.rocket.configuration.full_name}
                image={launchInfo.rocket.configuration.image_url}
                description={launchInfo.rocket.configuration.description}
                specs={launchInfo.rocket.configuration}
              />
            </div>
          ) : (
            <ComponentLoadingSpinner />
          )}
        </div>
      </div>
    </div>
  )
}

export default LaunchInfo
