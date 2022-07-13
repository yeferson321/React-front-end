import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({children}) => {

  const [data, setData] = useState();
  const addData = (data) => { setData(data) }

  return (

    <DataContext.Provider value={{ data, addData}}>
      {children}
    </DataContext.Provider>

  );
}
export default DataProvider