{
    const tasks = [
        {
            name: "zadanie",
            done: false,
        },
        {
            name: "inne zadanko",
            done: true,
        },
    ];

    const addNewTask = (newTaskName) => {
        tasks.push(
            {
                name: newTaskName,
                done: false
            }
        )
        render();
        clearFocus();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            let taskStatus;
            task.done === true ? taskStatus = "taskList__task--done" : "taskList__task";
            htmlString += `
            <li class="${taskStatus}">
            <button class="taskList__checkButton js-checkButton">Odznacz</button>
            ${task.name}
            <button class="taskList__removeButton js-removeButton">Usuń</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-removeButton")
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const onFormSubmit = () => {
        event.preventDefault();

        const newTaskName = document.querySelector(".js-newTask").value.trim();

        if (newTaskName === "") {
            return;
        };

        addNewTask(newTaskName);
    };

    const clearFocus = () => {
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