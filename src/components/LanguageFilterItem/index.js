import './index.css'

const LanguageFiltersItem = prop => {
  const {eachItem, changeLanguageBtn, isActive} = prop
  const {id, language} = eachItem
  const activeBtnClassName = isActive ? 'active-btn' : ''
  const clickLanguageBtn = () => {
    changeLanguageBtn(id)
  }
  return (
    <li>
      <button
        type="button"
        className={`tab-btn ${activeBtnClassName}`}
        onClick={clickLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFiltersItem
