{
    const tasks = [];

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton")
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const checkButtons = document.querySelectorAll(".js-checkButton")
        checkButtons.forEach((checkButton, taskIndex) => {
            checkButton.addEventListener("click", () =>
                toggleTaskDone(taskIndex));
        });
    };

    const addNewTask = (newTaskName) => {
        tasks.push(
            {
                name: newTaskName,
                done: false
            }
        )
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
            <li class="taskList__task">
                <button class="taskList__button ${task.done === true? "taskList__button--checked" : ""} js-checkButton">&#10004;</button>
                <span class="taskList__taskName ${task.done === true ? "taskList__taskName--done" : ""}">${task.name}</span>
                <button class="taskList__button taskList__button--remove js-removeButton">&#128465;</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = () => {
        event.preventDefault();

        const newTaskName = document.querySelector(".js-newTask").value.trim();

        if (newTaskName !== "") {
            addNewTask(newTaskName);
        };

        resetInput();
    };

    const resetInput = () => {
        const taskInput = document.querySelector(".js-newTask");

        taskInput.value = "";
        taskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}