import { createContext, useState } from "react";

export const SearchResult = createContext(null)


function Result({ children }) {
    const [result, setResult] = useState(false)
    return (
        <SearchResult.Provider value={{ result, setResult }} >
            {children}
        </SearchResult.Provider>
    )
}

export default Result;