//////////////////////////////////
// Hier müssen die window namen //
//////////////////////////////////

intializeWindow("notes")
intializeWindow("welcome")
intializeWindow("calls")
intializeWindow("term")

//Variablen

var biggestIndex = 1;
var topBar = document.querySelector("#top")
var selectedIcon = undefined
var currentNumber = "‎ "
var notescontent = [{
  title: "Welcome",
  date: "04.07.26",
  content: `
    <p contenteditable="True">
    <strong>Welcome to Woodwriter</strong><br>
    <br>
    This is an app where i put my<i> literary gems</i><br>
    <br>
    I can even write <i> different Textstyles</i>, <br>
    like a poem:
    </p>
    <blockquote>
        <strong>The Cow</strong><br>
        <small>Laupi_oida</small> <br>
        I was on a field<br>
        and there was a cow<br>
        that mowed the lawn<br>
        <br>
        then i came near<br>
        and it mowed my hair<br>
        now im bald<br>
        <br>
        The End<br>
    </blockquote>
  `
},
{
  title: "Future Plans",
  date: "06.07.26",
  content: `
  <h2> Future plans:</h2>
  <p>-be happy in the forest<br><br>
  -code in the forest<br><br>
  -live in the forest<br><br>
  -find a river in the forest<p>
  `
},
{
  title: "Secret!",
  date: "06.07.26",
  content: `
    <p contenteditable="True">
    This is very serius:<br>
    never call the 12345    </p>
    `
}
]

//Fenster verschiebbar machen

function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Fenster schließen

function closeWindow(window, closebutton) {
  var screen = document.querySelector("#" + window)
  var screenClose = document.querySelector("#" + closebutton)
  screenClose.addEventListener("click", function () {
    screen.style.display = "none"
  })
}

//Fenster öffnen

function openWindow(element) {
  console.log("window opened")
  element.style.display = "inline"
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element) {
  if (!element) {
     return;
   }
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element, screen) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(screen)
  } else {
    selectIcon(element)
  }
}

//Fenster nach oben kommen lassen

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

//alles auf einmal initialisieren

function intializeWindow(windowName) {
  var screen = document.querySelector("#" + windowName);
  addWindowTapHandling(screen);
  closeWindow(windowName, windowName + "close");
  dragElement(screen);

  var icon = document.querySelector("#" + windowName + "Icon")
  if (icon != null) {
    icon.addEventListener("click", () => handleIconTap(icon, screen))
  }
}


//Notes app

function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = notescontent[index].content
}

setNotesContent(0)

function addToSideBar(index) {
  var sidebar= document.querySelector("#notessidebar");
  var note = notescontent[index];
  newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <p style="margin: 0px;">${note.title}</p>
    <p style="font-size: 12px; margin: 0px;">${note.date}</p>
  `
  newDiv.addEventListener("click", function () {
    setNotesContent(index);
  });
  sidebar.appendChild(newDiv)
}

for (let i = 0; i < notescontent.length; i++) {
  addToSideBar(i)
}

//Uhr

function updateTime() { document.querySelector("#timeElement").innerHTML = new Date().toLocaleString(); }
setInterval(updateTime, 1000);

//Phoneapp

function addNumber(number) {
  if (currentNumber == "‎ ") {
    currentNumber = "";
  };

  currentNumber = currentNumber + number;

  if (currentNumber.length >= 6) {
    clearNumber();
    currentNumber = "";
    currentNumber = currentNumber + number;
  }

  checkNumber()

  showNumber()
};

function clearNumber() {
  currentNumber = "‎ "
  showNumber()
};

function showNumber() {
  callDisplay = document.createElement("div");
  callDisplay.innerHTML = `<p>${currentNumber}</p>`;
  var callNumber = document.querySelector("#callNumber");
  callNumber.innerHTML = "";
  callNumber.appendChild(callDisplay);
  console.log(currentNumber);
};
showNumber();

function checkNumber() {
  if (currentNumber == "11239") {
    console.log("wildschwein angerufen");
    boarAudio = document.getElementById("boarAudio");
    boarAudio.play();
  }

  if (currentNumber == "98273") {
    console.log("igel angerufen");
    hedgehogAudio = document.getElementById("hedgehogAudio");
    hedgehogAudio.play();
  }

  if (currentNumber == "48270") {
    console.log("eichhörnchen angerufen");
    squirrelAudio = document.getElementById("squirrelAudio");
    squirrelAudio.play();
  }

  if (currentNumber == "38198") {
    console.log("fuchs angerufen");
    foxAudio = document.getElementById("foxAudio");
    foxAudio.play();
  }

  if (currentNumber == "24955") {
    console.log("wolf angerufen");
    wolfAudio = document.getElementById("wolfAudio");
    wolfAudio.play();
  }

  if (currentNumber == "11111") {
    console.log("callcenter angerufen");
    callcenterAudio = document.getElementById("callcenterAudio");
    callcenterAudio.play();
  };

  if (currentNumber == "29312") {
    console.log("hirsch angerufen");
    deerAudio = document.getElementById("deerAudio");
    deerAudio.play();
  }

  if (currentNumber == "12345") {
    console.log("john pork angerufen");
    johnporkVideo = document.getElementById("johnporkVideo");
    johnporkScreen = document.getElementById("johnpork")
    johnporkScreen.style.display = "flex";
    johnporkVideo.play();
    johnporkVideo.addEventListener('ended', function () {
      johnporkScreen.style.display = "none";
    })

  }
}

// term

function checkPromt() {
  inputScreen = document.querySelector("#termInput");

  inputScreen.addEventListener('keydown', function (keyDown) {
    if (keyDown.key == 'Enter') {
      var commandLine = inputScreen.value.trim();
      if (commandLine !== '' ) {
        handlePromt(commandLine);
        inputScreen.value = '';
      }
    }
  })
};

function handlePromt(line) {

  var outputScreen = document.querySelector("#termOutput")

  printToTerminal(`<span class="prompt"><strong>user@ForestOS:</strong> </span> ${line}`);
  var parts = line.split(' ');
  var command = parts[0];
  var args = parts.slice(1);

  //Hier müssen neue Commands hin

  switch (command) {
    case 'help':
      printToTerminal('Available commands:<br> help, clear, echo, forestfetch, matrix<br>more infos available at <a href="https://github.com/Laup0403/LaupiOS">https://github.com/Laup0403/LaupiOS</a>');
      break;
    case 'clear':
      outputScreen.innerHTML = '';
      break;
    case 'echo':
      printToTerminal(args.join(' '));
      break;
    case 'forestfetch':
      printToTerminal('<b>OS:</b> ForestOS 1.1<br><b>Shell:</b> bark<br><b>User:</b> user<br><b>CPU: </b>Intel Ryzen 5500<br><b>GPU: </b>Lidl Geforce Intergrated');
      break;
    case 'nutnotes':
      openWindow(document.querySelector("#notes"));
      break;
    case 'thincanphone':
      openWindow(document.querySelector("#calls"));
      break;
    case 'welcome':
      openWindow(document.querySelector("#welcome"));
      break;
    case 'coolgame':
      printToTerminal('Comming soon');
      break;
    case 'whoIsTheBestProgrammer':
      printToTerminal('Of course Laupi_oida.');
      break;
    default:
      printToTerminal(`bark: command not found: ${command}`);
  }
};
function love.draw()
	love.graphics.printf("Hello World!", 0, 300, love.graphics.getWidth(), 'center')
	love.graphics.printf(
		string.format("Time: %f - FPS: %f\nOS: %s Ver: %d.%d.%d\nScreen: %d x %d",
			love.timer.getTime(), love.timer.getFPS(),
			love.system.getOS(), love._version_major, love._version_minor, love._version_revision,
			love.graphics.getWidth(), love.graphics.getHeight()
		), love.graphics.getWidth() - 305, 3, 300, 'right')
end

function printToTerminal(text) {
  var outputScreen = document.querySelector("#termOutput")
  var  p = document.createElement('p');
  p.innerHTML = text;
  outputScreen.appendChild(p);

  // Automatisch nach unten scrollen, wenn Text dazukommt
  const windowEl = document.querySelector("#termScreen");
  windowEl.scrollTop = windowEl.scrollHeight;
};
checkPromt();
