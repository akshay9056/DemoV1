import { createContext, useContext, useState } from "react";

// Create Context
const AppContext = createContext();

const TaskDeskProvider=({children})=>{
    const [inputValues, setInputValues] = useState([]);
    const [taskCard,setTaskCard]=useState();
 

    return <AppContext.Provider
    value={{
        inputValues,setInputValues,
        taskCard,setTaskCard


    }}
    >
        {children}
    </AppContext.Provider>

}




 const useTaskDesk = () => {
    return useContext(AppContext);
};

export {useTaskDesk}
export default TaskDeskProvider;
