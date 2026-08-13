import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = '$'

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const months = [' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

 

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return ''

    const dateParts = String(slotDate).split('_')
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts
      const normalizedYear = Number(year)
      const actualYear = normalizedYear < 100 ? 2000 + normalizedYear : normalizedYear < 1000 ? 1900 + normalizedYear : normalizedYear
      return `${day} ${months[Number(month)] || month} ${actualYear}`
    }

    const fallbackParts = String(slotDate).split('-')
    if (fallbackParts.length === 3) {
      const [day, month, year] = fallbackParts
      const normalizedYear = Number(year)
      const actualYear = normalizedYear < 100 ? 2000 + normalizedYear : normalizedYear < 1000 ? 1900 + normalizedYear : normalizedYear
      return `${day} ${months[Number(month)] || month} ${actualYear}`
    }
    return slotDate
  }
    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider