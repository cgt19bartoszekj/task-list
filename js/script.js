{
    let tasks = [];
    let doneTasksHidden = false;
    let allTasksDone = false;

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

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
        hideDoneTasksButton.addEventListener("click", () => {
            hideDoneTasks();
        })

        const toggleAllDoneButton = document.querySelector(".js-toggleAllDoneButton");
        toggleAllDoneButton.addEventListener("click", () => {
            toggleAllTaskDone();
        })
    };

    const hideDoneTasks = () => {
        doneTasksHidden = !doneTasksHidden;
        render();
    };

    const isEveryTaskDone = () => {
        if (tasks.every(({ done }) => done) === true) {
            allTasksDone = true;
            console.log(allTasksDone)
        }
        else {
            allTasksDone = false;
            console.log(allTasksDone)
        }
    };

    const toggleAllTaskDone = (task) => {
        tasks.map(task => task.done = true);

        render();
    };

    const addNewTask = (newTaskName) => {
        tasks = [
            ...tasks,
            {
                name: newTaskName,
                done: false
            }
        ];

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
        isEveryTaskDone();
        let buttonsHTMLContent = "";

        buttonsHTMLContent += `
        <button class="section__button ${tasks.length === 0 ? "section__button--hidden" : ""} js-hideDoneTasksButton">${doneTasksHidden === true ? "Pokaż" : "Ukryj"} ukończone</button>
        <button ${allTasksDone === true ? "disabled" : ""} class="section__button ${tasks.length === 0 ? "section__button--hidden" : ""} js-toggleAllDoneButton">Ukończ wszystkie</button>
        `;
        
        document.querySelector(".js-hideAndToggleButtons").innerHTML = buttonsHTMLContent;
    };

    const renderTasks = () => {
        let TaskListHTMLContent = "";

        for (const task of tasks) {

            TaskListHTMLContent += `
            <li class="tasks__task ${(task.done === true && doneTasksHidden === true) ? "tasks__task--hidden" : ""}">
                <button class="tasks__button ${task.done === true ? "tasks__button--checked" : ""} js-checkButton">&#10004;
                </button>
                <span class="tasks__taskName ${task.done === true ? "tasks__taskName--done" : ""}">${task.name}
                </span>
                <button class="tasks__button tasks__button--remove js-removeButton">&#128465;
                </button>
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

