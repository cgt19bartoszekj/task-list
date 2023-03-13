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

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        buttonsHTMLContent += `
        <button class="section__button section__button--hide">Ukryj ukończone</button>
        <button class="section__button section__button--toggleAllDone">Ukończ wszystkie</button>
        `;

        document.querySelector(".js-hideAndToggleButtons").innerHTML = buttonsHTMLContent;
    };

    const renderTasks = () => {
        let TaskListHTMLContent = "";

        for (const task of tasks) {

            TaskListHTMLContent += `
            <li class="tasks__task">
                <button class="tasks__button ${task.done === true? "tasks__button--checked" : ""} js-checkButton">&#10004;</button>
                <span class="tasks__taskName ${task.done === true ? "tasks__taskName--done" : ""}">${task.name}</span>
                <button class="tasks__button tasks__button--remove js-removeButton">&#128465;</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = TaskListHTMLContent;
    };

    const render = () => {
        renderTasks();
        renderButtons();
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