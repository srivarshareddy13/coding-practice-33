// Write your code here

const LanguageFilterItem = props => {
  const {languageFiltersData, setActiveId} = props
  const {id, language} = languageFiltersData

  const onClickLanguage = () => setActiveId(id)

  return (
    <div>
      <li>
        <button type="button" onClick={onClickLanguage}>
          {language}
        </button>
      </li>
    </div>
  )
}
export default LanguageFilterItem
