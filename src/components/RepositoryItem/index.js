import './index.css'

const RepositoryItem = prop => {
  const {eachRepository} = prop
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachRepository
  return (
    <li className="item-container">
      <img src={avatarUrl} alt={name} className="avatar-size" />
      <h1 className="heading">{name}</h1>
      <div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="para">{`${starsCount} stars`}</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="para">{`${forksCount} forks`}</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="para">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
