//1. 유저가 값을 입력한다 0
//2. +버튼을 클릭하면 ,할일이 추가된다. 0
//3. delete 버튼을 누르면 할일이 삭제된다.
//4. check 버튼을 누르면 할일이 끝나면서 밑줄이 간다

//4-1 check 버튼을 클릭하는 순간 true false
//4-2 true 이면 끝난걸로 간주하고 밑줄 보여주기
//4-3 false 이면 안끝난걸로 간주하고 그대로

//5. not done, done 탭을 누르면 , 언더바가 이동한다
//6. done 탭은 끝난 아이템만, not done 탭은 진행중 아이탬만
//7. 전체 탭을 누르면 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input"); //입력 창
let addButton = document.getElementById("add-button"); //입력 버튼
let tabs = document.querySelectorAll(".task-tabs div"); //탭
let underLine = document.getElementById("underLine"); // 메뉴 하단 바
let taskList = []; // 할일 목록
let mode = "all"; // 목록 종류
let filterList = []; // 일 분류 항목

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event); // 탭 클릭시 필터 이벤트 실행
  });
}
console.log(tabs);

addButton.addEventListener("click", addTask);

function addTask() {
  let taskValue = taskInput.value;
  let task = {
    id: randomIdGenerate(),
    content: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}
//변경된 목록 렌더링
function render() {
  let list = [];

  if (mode == "all") {
    list = taskList;
  } else if (mode == "notDone") {
    filterList = taskList.filter((task) => !task.isComplete);
    list = filterList;
  } else if (mode == "Done") {
    filterList = taskList.filter((task) => task.isComplete);
    list = filterList;
  }

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-done" id="${list[i].id}">
                <span>${list[i].content}</span>
                <div class="button-box">
                    <button onclick="toggleDone('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}" >
                <span>${list[i].content}</span>
                <div class="button-box">
                    <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
//완료 기능
function toggleDone(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  console.log(taskList);
  render();
}
//삭제기능
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  console.log("클릭댐", event.target.id);
  // 탭 하단바 이동
  if (event) {
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }
  //각 모드에 따른 목록 변경
  if (mode == "all") {
    render();
  } else if (mode == "notDone") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "Done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
console.log(filterList);

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
