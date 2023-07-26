
import '../styles/FilterForm.css';

const FilterForm = ({ lists, selectedList, setSelectedList, selectedStatus, setSelectedStatus ,search,setSearch}) => {
  
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };
  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };

  
  return (
    <div className='filter-container'>
      <input
        type='text'
        value={search}
        onChange={inputHandler}
        placeholder='Search todos'
      />
      
      <label >List: </label>
      <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
        <option value="All">All</option>
        {lists.map((list) => (
          <option key={list.listId} value={list.listId}>{list.name}</option>
        ))}
      </select>
      <label>Status: </label>
      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterForm;
