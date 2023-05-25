import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFiltersItem from '../LanguageFilterItem/index'

import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiLanguageStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiLanguageStatus.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    this.setState({
      apiStatus: apiLanguageStatus.inProgress,
    })
    const {activeTabId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(githubReposApiUrl)

    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSuccess(data.popular_repos)
    } else {
      this.setState({
        apiStatus: apiLanguageStatus.failure,
      })
    }
  }

  onSuccess = arrayData => {
    const updatedData = arrayData.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState({
      repositoryList: updatedData,
      apiStatus: apiLanguageStatus.success,
    })
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-image"
      />
    </div>
  )

  renderSuccess = repositoryList => (
    <ul className="repository-container">
      {repositoryList.map(eachRepository => (
        <RepositoryItem
          key={eachRepository.id}
          eachRepository={eachRepository}
        />
      ))}
    </ul>
  )

  renderRespectiveDetails = () => {
    const {repositoryList, apiStatus} = this.state

    switch (apiStatus) {
      case apiLanguageStatus.success:
        return this.renderSuccess(repositoryList)
      case apiLanguageStatus.inProgress:
        return this.renderLoaderView()
      case apiLanguageStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeLanguageBtn = id => {
    this.setState({activeTabId: id}, this.getRepositories)
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="app-container">
        <h1 className="title">Popular</h1>
        <ul className="buttons-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFiltersItem
              key={eachItem.id}
              eachItem={eachItem}
              changeLanguageBtn={this.changeLanguageBtn}
              isActive={activeTabId === eachItem.id}
            />
          ))}
        </ul>
        {this.renderRespectiveDetails()}
      </div>
    )
  }
}
export default GithubPopularRepos
