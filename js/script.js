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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="">
            ${task.name}
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = () => {
        event.preventDefault();
        
        const newTaskName = document.querySelector(".js-newTask").value.trim();
        addNewTask(newTaskName);
    };

    const clearFocus = () => {
        const taskInput = document.querySelector(".js-newTask");
        taskInput.value = "";
        taskInput.focus();
    };

    const addNewTask = (newTaskName) => {

        if(newTaskName === ""){
            return;
        };

        tasks.push(
            {
                name: newTaskName,
                done: false
            }
        )
        render();
        clearFocus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}