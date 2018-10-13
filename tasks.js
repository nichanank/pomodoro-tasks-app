//Creates an array of task objects.

const NUM_TASKS = 100 //Max tasks in list

//dummy task list
const taskNames = ["walk dog", "do homework", "watch lecture", "work on problem set", "design workflow", "make things", "raise money", "practice pitch", "design workshop", "write blog post", "draft book", "read chapter 1", "call mom", "go party", "ideation session", "read news", "browse twitter", "read API docs", "make weather app", "change the world", "record podcast", "buy audiobook", "go shopping"]

//create a task
const createTask = () => ({title: taskNames[Math.floor(Math.random() * taskNames.length)], timeSpent: 0})

//add keys based on index
const addKeys = (val, key) => ({key, ...val})

export default Array.from({length: NUM_TASKS}, createTask).map(addKeys)
