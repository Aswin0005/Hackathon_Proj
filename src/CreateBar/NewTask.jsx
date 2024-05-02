import { useState } from 'react';
import React from 'react';

const NewTask = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [day,setDay] = useState('')

  console.log('Edit', props.details);
  // Name change handling
  const handleNameChange = (e) => {
    if (props.oper === 'Editing') {
      props.updateTrigger.setEditName(e.target.value);
    }
    setName(e.target.value);
  };

  //Decription change handling
  const handleDescriptionChange = (e) => {
    if (props.oper === 'Editing') {
      props.updateTrigger.setEditDescription(e.target.value);
    }
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleCancel = (e) => {
    if (props.oper === 'Editing') {
      props.setEditTrigger(false);
    } else {
      props.setTrigger(false);
    }
  }

const handleWeekDay = (e)  => {
      if (props.oper === 'Editing') {
        props.updateTrigger.setEditDay(e.target.value);
      }
      setDay(e.target.value);
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const createdDay = today.getDate();
    const createdMonth = today.getMonth() + 1;
    const createdYear = today.getFullYear();
    setCreatedDate(`${createdDay}/${createdMonth}/${createdYear}`);

    if (props.oper === 'Editing') {
      const today = new Date();
      const createdDay = today.getDate();
      const createdMonth = today.getMonth() + 1;
      const createdYear = today.getFullYear();
      setCreatedDate(`${createdDay}/${createdMonth}/${createdYear}`);
      let editTask = props.task.map((e, id) => {
        if (id === props.details.editId) {
          e.name = name || props.details.editName;
          e.description = description || props.details.editDescription;
          e.day = day || props.details.editDay;
   
          return e;
        } else {
          return e;
        }
      });
      props.updateTrigger.handleUpdateTask(editTask);
      props.setEditTrigger(false);
    } else if (name) {
      props.setTask([
        ...props.task,
        { name, description, createdDate ,day},
      ]);
      console.log('State after setTask', props.task);
      setName('');
      setDescription('');
      setDay('')
      props.setTrigger(false);
    } else {
      alert('Cannot submit Empty Task');
    }
  };

  if (props.trigger) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {/* Name & Description input */}
          <div className="relative">
            <div className="fixed w-[475px] h-[400px] rounded bg-[#DBE2EF] dark:bg-[#393E46] p-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-sm shadow-[#EEEEEE] font-robotoCondensed">
              <label htmlFor="task-name" className="">
                Meal Name :{' '}
              </label>
              <input
                type="search"
                id="task-name"
                placeholder="Type your Task..."
                className="w-72 p-1 dark:bg-[#393E46] border"
                value={props.oper === 'Editing' ? props.details.editName : name}
                onChange={handleNameChange}
                autoComplete="off"
              ></input>
              <div className="mt-2">
                <label htmlFor="description">Description :</label>
                <textarea
                  type="text"
                  id="description"
                  className="w-full h-36 mt-2 resize-none dark:bg-[#393E46] border"
                  value={
                    props.oper === 'Editing'
                      ? props.details.editDescription
                      : description
                  }
                  onChange={handleDescriptionChange}
                  autoComplete="off"
                ></textarea>

                {/* Weekdays */}
                <div className="flex w-72 flex-col gap-6">
                  <select
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                    name="day"
                    onChange={handleWeekDay}
                    value={
                      props.oper === 'Editing' ? props.details.editDay: day
                    }
                  >
                    <option selected="">Open this select menu</option>
                    <option value={'monday'}>Monday</option>
                    <option value={'tuesday'}>Tuesday</option>
                    <option value={'wednesday'}>Wednesday</option>
                    <option value={'thursday'}>Thursday</option>
                    <option value={'friday'}>Friday</option>
                    <option value={'saturday'}>Saturay</option>
                    <option value={'sunday'}>Sunday</option>
                  </select>
                </div>
                {/* Date & time input */}
                {/* <label htmlFor="date-time" className="mt-2">
                  Due Date :
                </label>
                <input
                  type="date"
                  id="date-time"
                  onChange={handleDateChange}
                  className="mt-2 ml-2 p-1 dark:bg-[#393E46] border"
                  defaultValue={
                    props.oper === 'Editing' &&
                    props.details.editDate &&
                    props.details.editedDate
                  }
                ></input>
                <input
                  type="time"
                  id="time"
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-2 ml-2 p-1 dark:bg-[#393E46] border"
                ></input> */}

                {/* Priority box */}
                {/* <div className="flex mt-4 gap-4">
                  <p>Priority : </p>
                  <div>
                    {' '}
                    <input
                      type="radio"
                      id="high"
                      name="option"
                      value={'high'}
                      className="peer hidden"
                      onChange={handlePriority}
                      checked={
                        props.oper === 'Editing'
                          ? props.details.editPriority === 'high'
                            ? true
                            : false
                          : priority === 'high'
                          ? true
                          : false
                      }
                    ></input>
                    <label
                      htmlFor="high"
                      className="dark:text-white border-black rounded-full w-20 p-[1px] flex justify-center  dark:border-white border-[1px] peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-none cursor-pointer transition-shadow hover:shadow-lg hover:bg-red-500 hover:text-white hover:border-none"
                    >
                      High
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="moderate"
                      name="option"
                      value={'moderate'}
                      className="peer hidden"
                      onChange={handlePriority}
                      checked={
                        props.oper === 'Editing'
                          ? props.details.editPriority === 'moderate'
                            ? true
                            : false
                          : priority === 'moderate'
                          ? true
                          : false
                      }
                      onClick={console.log('Hiiiii')}
                    ></input>
                    <label
                      htmlFor="moderate"
                      className="dark:text-white border-black rounded-full w-24 p-[1px] flex justify-center  border-white border-[1px]  peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-none cursor-pointer transition-shadow hover:shadow-lg hover:bg-yellow-500 hover:text-white hover:border-none"
                    >
                      Moderate
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="low"
                      name="option"
                      value={'low'}
                      className="peer hidden"
                      onChange={handlePriority}
                      checked={
                        props.oper === 'Editing'
                          ? props.details.editPriority === 'low'
                            ? true
                            : false
                          : priority === 'low'
                          ? true
                          : false
                      }
                    ></input>
                    <label
                      htmlFor="low"
                      className="dark:text-white border-black rounded-full w-20 p-[1px] flex justify-center  dark:border-white border-[1px]  peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none cursor-pointer transition-shadow hover:shadow-lg hover:bg-green-500 hover:text-white hover:border-none"
                    >
                      Low
                    </label>
                  </div>
                </div> */}
                {/* Cancel & Create Button */}
                <div className="absolute bottom-4 right-4">
                  <button
                    className="rounded-full w-[65px] bg-gray-400 p-1"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full w-[65px] p-1 mx-2 bg-[#3F72AF] dark:bg-[#00ADB5] text-white"
                  >
                    {props.oper === 'Editing' ? 'Update' : 'Sumbit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default NewTask;
