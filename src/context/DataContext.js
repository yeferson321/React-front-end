import React, { createContext, useState } from "react";

const DataProvider = (props) => {

  const data = {
    dfdf: 'f'
  }
 
  return (

    <DataContext.Provider value={{data}}>
      {props.children}
    </DataContext.Provider>

  );
}

export default DataProvider;
export const DataContext = createContext();