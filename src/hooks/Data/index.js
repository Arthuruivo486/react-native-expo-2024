import { createContext,useContext, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import {initializeDatabase} from "../../database/initializaDatabase";


const DataCotext = createContext({});



export function DataProvider ({children}){

    const[data, setData] = useState(false);

    return (
        <DataCotext.Provider value={{data}}>
            <SQLiteProvider databaseName = "data.db" onInit={initializeDatabase}>
            {children}
            </SQLiteProvider>
        </DataCotext.Provider>
    );
}

export function useData(){
    const context = useContext(DataCotext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      
    return context;

}