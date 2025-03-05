
import React, { useEffect, useState } from "react";
import Talkdesktable from './Tallkdesktable'
import AudioPlayerTD from './AudioPlayerTD'
import TaskDeskProvider from '../../context/TaskdeskContextApi'
import SearchBar from './Search'
import TaskdeskCard from './TaskdeskCard'


function talkdesk() {

  const [selectedRow, setSelectedRow] = useState({});
  return (
    <TaskDeskProvider>
      <div>
        <SearchBar />
        <Talkdesktable selectRow={setSelectedRow}/>
        <div className='p-4 grid grid-cols-[40%_60%] w-[100%] mx-auto'>
          <TaskdeskCard selectedTableRow={selectedRow}/>
          <AudioPlayerTD selectedTableRow={selectedRow} />
        </div>

      </div>
    </TaskDeskProvider>
  )
}

export default talkdesk