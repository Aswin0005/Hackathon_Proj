import { useState } from 'react';
import NewTask from '../CreateBar/NewTask';

const TaskContainer = ({ trigger, setTask, task }) => {
  const [dropDown, setDropDown] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDay,setEditDay] = useState('')
  console.log(isEdit);

  const handleIsEdit = (id) => {
    setIsEdit(true);
    setEditId(id);
    setEditName(task[id].name);
    setEditDescription(task[id].description);
    setEditDay(task[id].day)
  };

  const handleUpdateTask = (tasks) => {
    setTask(tasks);
  };

  if (task) {
    const handleDeleteButton = (id) => {
      let updatedTask = task.filter((ele, key) => {
        return key !== id;
      });
      setTask(updatedTask);
    };
    console.log('OnTaskBar', task);

    console.log(localStorage);

    const handleDropDown = (id) => {
      setDropDown(!dropDown);
      const dropDownTask = [...task];
      dropDownTask[id].dropDown = dropDown;
    };
    console.log('Takkkkkkkk', task);
    return task.map((e, id) => {
      return (
        <div key={id}>
          <NewTask
            trigger={isEdit}
            setEditTrigger={setIsEdit}
            oper={'Editing'}
            updateTrigger={{
              setEditName,
              setEditDescription,
              setEditDay,
              handleUpdateTask,
            }}
            task={task}
            details={{
              editName,
              editDescription,
              editId,
              editDay
            }}
          />
          <div
            className={`w-auto bg-[#DBE2EF] dark:bg-[#393E46] m-2 rounded shadow-sm shadow-[#3F72AF] dark:shadow-[#00ADB5] font-mono dark:text-[#EEEEEE] ${
              e.dropDown && 'h-auto align-top'
            }`}
          >
            <div className={`w-auto h-10 flex items-center p-2 `}>
              <p className="w-[25px] overflow-hidden">#{id + 1}</p>
              <p className="ml-2 basis-1/2 truncate p-1  border-l-[1px] border-l-zinc-300">
                {e.name}
              </p>

              <div
                className={`basis-2/12 p-1 overflow-hidden border-l-[1px] border-l-zinc-300 min-[0px]:max-xl:hidden xl:visible`}
              >
                <p className="truncate">{e.createdDate}</p>
              </div>
              
              <div
                className={`basis-2/12 p-1 overflow-hidden border-l-[1px] border-l-zinc-300 min-[0px]:max-xl:hidden xl:visible`}
              >
                <p className="truncate">{e.day}</p>
              </div>

              {/* Edit buttons */}
              <div className="basis-2/12 flex p-1 border-l-[1px] border-l-zinc-300 justify-evenly items-center overflow-hidden">
                <button
                  className="rounded text-white bg-red-600 dark:bg-red-500 p-[2px]"
                  onClick={() => handleDeleteButton(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[22px] h-[22px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  className="rounded text-white bg-[#3F72AF] dark:bg-[#00ADB5] p-[2px]"
                  onClick={() => handleIsEdit(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[22px] h-[22px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <div className="lg:visible">
                  <button
                    className="rounded text-black bg-[#EEEEEE] p-[1px] min-[0px]:max-xl:hidden xl:visible"
                    onClick={() => handleDropDown(id)}
                  >
                    <p className="text-[10px]">View details</p>
                  </button>
                </div>
                <button
                  className="lg:hidden rounded text-black bg-[#EEEEEE] p-[1px]"
                  onClick={() => handleDropDown(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`${!e.dropDown && 'hidden'}`}>
              <p className="font-robotoCondensed font-medium px-2 ">
                Description :{' '}
              </p>
              <p className="pl-8 pr-2 pb-4 pt-2 break-words">{e.description}</p>
            </div>
          </div>
        </div>
      );
    });
  }
};

export default TaskContainer;
