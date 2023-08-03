// Footer
today = new Date();
thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.classList.add('copyright');
copyright.textContent = `© Raul Guliyev ${thisYear}`;
footer.appendChild(copyright);


// Skills
skills = ['javaScript', 'HTML', 'CSS', 'Python', 'SQL', 'GIT', 'Django', 'DRF', 'FastAPI', 'Docker']
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector("ul");
//skillsList.style.display = "grid";
for(let a=0; a < skills.length; a++){
    const skill = document.createElement('li');
    skill.innerText = skills[a];
    skill.style.marginRight = "0.5rem";
    skill.className = "tag";
    skillsList.appendChild(skill);
}

// Leave Message
const messageForm = document.querySelector("form[name='leave_message']");

/*const messageForm = document.getElementsByTagName('form');*/
messageForm.addEventListener('submit', event =>{
    event.preventDefault();

    // Current time
    const now_date = new Date();

    const userName = event.target.userName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    //console.log(userName, usersEmail, usersMessage);
    messageForm.reset();
    

    const messagesSection = document.querySelector('#messages');
    const messagesList = messagesSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.classList.add('list__item');
    newMessage.innerHTML =  `<div>
    <span class="strong">${usersMessage}</span>
    <p>${now_date.toLocaleDateString()} from <a class"link" href="mailto:${usersEmail}">${userName}</a> &nbsp;</p>
    </div>`;

    if (messagesSection.style.display === 'none') {
        messagesSection.style.display = 'block';
    }

    // Create a new button element 'REMOVE' and set its properties
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.style.color = 'white';
    removeButton.style.backgroundColor = 'red';
    removeButton.type  = 'button';

    // Add an event listenr to the removeButton 
    removeButton.addEventListener('click', event => {
        const entry = event.target.parentNode;
        const list = entry.parentNode;

        // if there is not message, hide the section
        if (list.children.length <= 1) {
            messagesSection.style.display = 'none';
        }

        entry.remove();
    });

    // Apend the removeButton to the newMessage element
    newMessage.appendChild(removeButton);

    // Apend the newMessage to the messageList element
    messagesList.appendChild(newMessage);

})


/*
// XMLHttpRequest that is callback-based API
const githubRequest = new XMLHttpRequest;
githubRequest.open('GET', 'https://api.github.com/users/raul-2001/repos');
githubRequest.send();
githubRequest.addEventListener("load", (event) => {
    const myData = JSON.parse(githubRequest.responseText);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < myData.length; i++) {
        const project = document.createElement("li");
        project.innerText = myData[i].name;
        projectList.appendChild(project);
    }
})

*/

// Fetch API
const resquestUrl = 'https://api.github.com/users/raul-2001/repos'
fetch(resquestUrl)
.then(response => {
    const myData = response.json();
    return new Promise((resolve, reject) => {
        /*
        setTimeout(() => {
            resolve(myData);
        }, 10)
        */
       resolve(myData);
        }
        )
    })

.then(myData =>{
    
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    //projectList.style.display = "flex";

    for (let i = 0; i < myData.length; i++) {

        const project = document.createElement("li");
        const a = document.createElement("a");

        // adding css styles
        project.style.marginRight = "0.5rem"
        project.className = "tag";
        
        a.innerText = myData[i].name;
        a.href = myData[i].clone_url;
        a.target = "_blank";
        a.rel = "noopener nooreferrer";
        project.appendChild(a);
        projectList.appendChild(project);
    }
})