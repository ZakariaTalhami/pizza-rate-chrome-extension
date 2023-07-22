import { useEffect, useState } from "react"
import { sendToContentScript } from "@plasmohq/messaging"
import PizzaRatingIconGroup from "~components/icons/PizzaRatingIconGroup"
import { MAX_PIZZA_RATING } from "~core/constants"
import Header from "~components/typography/Header"
import InfoTableDisplay from "~components/dataDisplay/InfoTableDisplay"
import PopupContainer from "~components/layout/PopupContainer"
import Loader from "~components/loaders/Loader"

const getTabPizzaStats = async () => {
  try {
    const currentTab = (
      await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
    )[0]
    const tabPizzaStats = await sendToContentScript({
      name: "getTabPizzaRating"
    })
    return [currentTab, tabPizzaStats]
  } catch (error) {
    console.error(error)
    return [null, null]
  }
}

function IndexPopup() {
  const [tabPizzaRating, setTabPizzRating] = useState(null)
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>(null)

  useEffect(() => {
    if (!currentTab) {
      getTabPizzaStats().then(([currentTab, tabPizzaStats]) => {
        setCurrentTab(currentTab)
        setTabPizzRating(tabPizzaStats)
      })
    }
  }, [currentTab])

  return (
    <PopupContainer>
      {!currentTab && <Loader />}
      {currentTab && <Header $centered>{currentTab.title}</Header>}
      {tabPizzaRating && (
        <>
          <Header $centered as="h2">
            {`Rating: ${parseFloat(
              (tabPizzaRating.rating * MAX_PIZZA_RATING).toFixed(1)
            )} / ${MAX_PIZZA_RATING}`}
          </Header>
          <PizzaRatingIconGroup
            rating={tabPizzaRating.rating}
            numberOfPizzas={MAX_PIZZA_RATING}
          />
          <Header $centered as="h2">
            Statistics
          </Header>
          <TabPizzaStatisticsTable {...tabPizzaRating} />
        </>
      )}
    </PopupContainer>
  )
}

type TabPizzaStatistics = {
  pizzaCount: number
  totalWordCount: number
  rating: number
}
const TabPizzaStatisticsTable = (props: TabPizzaStatistics) => {
  return (
    <InfoTableDisplay
      data={{
        "Pizza Occurrence in page:": props.pizzaCount.toString(),
        "Total words in page:": props.totalWordCount.toString(),
        "Pizza/Word Ratio in pag:":
          parseFloat(
            ((props.pizzaCount / props.totalWordCount) * 100).toFixed(1)
          ) + "%"
      }}
    />
  )
}

export default IndexPopup
