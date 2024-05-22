import LanguageFilterItem from '../LanguageFilterItem'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    apiStatus: apiConstants.initial,
    languageList: [],
  }

  componentDidMount() {
    this.getLanguages()
  }

  setActiveId = id => {
    this.setState({activeId: id}, this.renderLanguages)
  }

  getLanguages = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const fotmattedData = data.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        languageList: fotmattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItem = () => {
    const {languageList} = this.state

    return (
      <ul>
        {languageList.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLanguages = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderRepositoryItem()
      case apiConstants.failure:
        return this.renderFailure
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageFiltersData={each}
              key={each.id}
              setActiveId={this.setActiveId}
            />
          ))}
        </ul>
        {this.renderLanguages()}
      </div>
    )
  }
}

export default GithubPopularRepos
