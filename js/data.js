/* ============================================================
   data.js - All lesson, typing and achievement data
   Digital Literacy Course - GitHub Pages Edition
   ============================================================ */

const LESSONS = [
  {
    id: 1,
    title: "What is a Computer?",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>Welcome to Your First Lesson!</h2>
      <p>Do not worry. This is very easy. We will go slowly together.</p>
      <p>A <strong>computer</strong> is a machine that helps you do many things. It is like a very helpful assistant. It never gets tired. It does exactly what you tell it to do.</p>

      <h2>What Can a Computer Do?</h2>
      <p>A computer can do many wonderful things for you:</p>
      <ul>
        <li>Show you pictures and videos</li>
        <li>Play music for you</li>
        <li>Help you write letters</li>
        <li>Let you talk to your family far away</li>
        <li>Help you find information — like a big encyclopedia</li>
        <li>Let you shop without leaving your home</li>
        <li>Play games</li>
        <li>Show you the news and weather</li>
      </ul>

      <h2>What Does a Computer Look Like?</h2>
      <p>Computers come in many sizes. Here are the most common ones:</p>
      <ul>
        <li><strong>Desktop computer:</strong> A big computer that sits on a desk. It has a separate screen, keyboard, and a box called a tower.</li>
        <li><strong>Laptop:</strong> A smaller computer you can carry. It folds open like a book. The keyboard and screen are connected.</li>
        <li><strong>Tablet:</strong> A flat computer like a big phone. You use your fingers to touch the screen.</li>
        <li><strong>Smartphone:</strong> A small computer that also makes phone calls. You probably already have one!</li>
      </ul>

      <h2>The Main Parts of a Computer</h2>
      <p>Every computer has these important parts:</p>
      <ul>
        <li><strong>Screen (Monitor):</strong> This is like the window of the computer. You see everything here — pictures, words, and videos.</li>
        <li><strong>Keyboard:</strong> This looks like a typewriter. You press the keys to type words and numbers.</li>
        <li><strong>Mouse:</strong> A small device that fits in your hand. You move it to point at things on the screen. Then you click a button to select things.</li>
        <li><strong>Computer box (Tower):</strong> The brain of the computer. It does all the thinking. You do not need to touch it much.</li>
      </ul>

      <h2>Does a Computer Need Power?</h2>
      <p>Yes! A computer needs electricity to work — just like your television or lamp.</p>
      <p>You plug it into the wall. When you turn it on, the screen lights up and it starts to work.</p>
      <p>When you are finished, you must turn it off properly. We will learn how to do this in Lesson 4.</p>

      <div class="tip-box">
        <strong>💡 Good to Know:</strong> You cannot break a computer just by looking at it or reading on it. Do not be afraid to explore! The computer will not bite.
      </div>

      <h2>A Real-Life Example</h2>
      <p>Think of a computer like a very clever assistant at the library.</p>
      <p>You can ask it questions. It finds answers quickly. It never forgets anything. It can also show you photos, help you write, and connect you to people far away.</p>

      <h2>Remember These Key Words</h2>
      <ul>
        <li><strong>Computer</strong> — a machine that helps you do tasks</li>
        <li><strong>Screen</strong> — where you see things</li>
        <li><strong>Keyboard</strong> — where you type</li>
        <li><strong>Mouse</strong> — what you use to point and click</li>
        <li><strong>Tower</strong> — the brain of the computer</li>
      </ul>
    </div>`,
    summary: [
      "A computer is a helpful machine that can store information, show pictures, and connect you to the world.",
      "Computers come in many sizes: desktops, laptops, tablets, and phones.",
      "The main parts are the screen, keyboard, mouse, and the computer box (tower)."
    ],
    homework: {
      id: 1,
      question: "Think of three things you would like to use a computer for. Write them down on paper. For example: 'I want to video call my grandchildren' or 'I want to see photos of my garden'. Share your list with your teacher or a friend.",
      completed: false
    },
    quiz: {
      id: 1,
      questions: [
        { id: 1, question: "What is a computer?", options: ["A machine that helps you do many tasks", "A type of food", "A musical instrument"], answer: 0 },
        { id: 2, question: "Which of these is a part of a computer?", options: ["A cooking pot", "A keyboard", "A garden tool"], answer: 1 },
        { id: 3, question: "What does the screen do?", options: ["Makes noise", "Shows you everything — pictures and words", "Stores food"], answer: 1 }
      ]
    }
  },
  {
    id: 2,
    title: "Computer Hardware",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>What is Hardware?</h2>
      <p><strong>Hardware</strong> means all the physical parts of a computer. These are the parts you can see and touch.</p>
      <p>Think of hardware like the body of the computer. Just like your body has arms, legs, eyes, and a brain — a computer has different parts that each do a job.</p>

      <h2>The Most Important Hardware Parts</h2>

      <h3>1. The Screen (Monitor)</h3>
      <p>The screen shows you everything. It is like a window into the computer world.</p>
      <p>Screens come in different sizes. A bigger screen is easier to see.</p>
      <p><strong>Tip:</strong> If the text is too small, you can make it bigger. We will learn how in the Settings lesson.</p>

      <h3>2. The Keyboard</h3>
      <p>The keyboard lets you type words and numbers.</p>
      <p>It has many keys — letters, numbers, and special keys like Enter and Backspace.</p>
      <p>Do not worry if you type slowly. Speed comes with practice. Accuracy is more important at first.</p>

      <h3>3. The Mouse</h3>
      <p>The mouse is a small device you hold in your hand.</p>
      <p>When you move the mouse on the desk, a small arrow moves on the screen.</p>
      <p>You click the left button to select things. You click twice quickly (double-click) to open things.</p>

      <h3>4. The Computer Box (Tower or Case)</h3>
      <p>This is the main box where all the clever parts live inside.</p>
      <p>You do not need to open this box. It just needs to be plugged in and turned on.</p>

      <h3>5. The CPU (Central Processing Unit)</h3>
      <p>The CPU is inside the computer box. Think of it as the computer's brain.</p>
      <p>It does all the thinking and calculating. A faster CPU means the computer works more quickly.</p>

      <h3>6. RAM (Random Access Memory)</h3>
      <p>RAM is the computer's short-term memory.</p>
      <p>When you open a program or a document, it goes into RAM so the computer can work with it quickly.</p>
      <p>Think of it like your desk. The more space on your desk, the more things you can work on at once.</p>

      <h3>7. Hard Drive (Storage)</h3>
      <p>The hard drive stores everything permanently — your photos, documents, music.</p>
      <p>Even when you turn the computer off, everything stays saved here.</p>
      <p>Think of it like a big filing cabinet inside the computer.</p>

      <h3>8. Speakers</h3>
      <p>Speakers let you hear sounds, music, and videos from the computer.</p>
      <p>Some computers have speakers built inside. Others need separate speakers plugged in.</p>

      <div class="tip-box">
        <strong>💡 Remember:</strong> You do not need to know exactly how each part works inside. You just need to know what each part does for you. That is enough!
      </div>

      <h2>Laptop vs Desktop — What is the Difference?</h2>
      <ul>
        <li>A <strong>desktop</strong> has all the parts separated. The tower, screen, and keyboard are all separate pieces.</li>
        <li>A <strong>laptop</strong> has everything in one folding device. The screen and keyboard are connected together. It has a battery so it can work without a power cord for a few hours.</li>
      </ul>

      <h2>A Real-Life Example</h2>
      <p>Think of a computer like a car:</p>
      <ul>
        <li>The CPU is like the engine</li>
        <li>The RAM is like the dashboard — what you see and use right now</li>
        <li>The hard drive is like the car boot — stores things even when you stop</li>
        <li>The screen is like the windscreen — you look through it to see where you are going</li>
      </ul>
    </div>`,
    summary: [
      "Hardware is every physical part of a computer you can see and touch.",
      "The CPU is the brain, RAM is short-term memory, and the hard drive stores files permanently.",
      "Laptops combine all parts in one device; desktops have separate parts."
    ],
    homework: {
      id: 2,
      question: "Look at a computer near you. Try to find the screen, keyboard, and mouse. Can you also find where you plug in the power? Draw a simple picture showing where each part is.",
      completed: false
    },
    quiz: {
      id: 2,
      questions: [
        { id: 1, question: "What is 'hardware'?", options: ["The physical parts you can touch and see", "Computer programs you cannot see", "The internet"], answer: 0 },
        { id: 2, question: "What is the CPU?", options: ["The computer's screen", "The computer's brain — it does the thinking", "The keyboard"], answer: 1 },
        { id: 3, question: "What does the hard drive do?", options: ["Shows pictures", "Stores your files and photos permanently", "Makes sounds"], answer: 1 }
      ]
    }
  },
  {
    id: 3,
    title: "Computer Software",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>What is Software?</h2>
      <p>We learned that hardware is what you can touch — the physical parts.</p>
      <p><strong>Software</strong> is different. You cannot touch software. It is the instructions that tell the hardware what to do.</p>
      <p>Think of it this way: Hardware is like a piano. Software is like the music — you need both to make something beautiful.</p>

      <h2>Types of Software</h2>

      <h3>1. The Operating System</h3>
      <p>The operating system is the most important software on your computer. It manages everything.</p>
      <p>When you turn on your computer, the operating system starts first. It shows you the desktop and lets you use other programs.</p>
      <p><strong>Common operating systems:</strong></p>
      <ul>
        <li><strong>Windows</strong> — made by Microsoft. Most computers use Windows. It has a Start button at the bottom.</li>
        <li><strong>macOS</strong> — made by Apple. Used on Mac computers and MacBooks. Very popular and stylish.</li>
        <li><strong>Android</strong> — used on most smartphones and tablets.</li>
        <li><strong>iOS</strong> — used on iPhones and iPads.</li>
      </ul>

      <h3>2. Applications (Apps)</h3>
      <p>Applications (or apps for short) are programs that do specific jobs.</p>
      <p>Think of each app as a tool in a toolbox. Each tool does one thing well.</p>
      <ul>
        <li><strong>Word Processor (like Microsoft Word):</strong> Helps you write letters, reports, and documents.</li>
        <li><strong>Web Browser (like Google Chrome):</strong> Lets you visit websites and explore the internet.</li>
        <li><strong>Email Program:</strong> Lets you send and receive digital letters (emails).</li>
        <li><strong>Video Call App (like Zoom or FaceTime):</strong> Lets you see and talk to family far away — for free!</li>
        <li><strong>Photo App:</strong> Stores and organises your photos.</li>
        <li><strong>Games:</strong> Fun games you can play on the computer.</li>
        <li><strong>Weather App:</strong> Tells you the weather for today and the week ahead.</li>
        <li><strong>Maps App:</strong> Shows you maps and gives you directions.</li>
      </ul>

      <h2>How Do You Get Software?</h2>
      <p>Some software comes already installed when you buy a computer.</p>
      <p>You can also download (get) new software from the internet.</p>
      <p>Many apps are <strong>free</strong>. Some cost money.</p>
      <p>You can find apps in places called:</p>
      <ul>
        <li><strong>Microsoft Store</strong> — for Windows computers</li>
        <li><strong>App Store</strong> — for Apple devices</li>
        <li><strong>Google Play Store</strong> — for Android phones and tablets</li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Be Careful:</strong> Only download apps from official, trusted places. Some apps from unknown websites can be harmful. Ask someone you trust if you are not sure.
      </div>

      <h2>Free vs Paid Software</h2>
      <ul>
        <li><strong>Free software</strong> you can use without paying. Examples: Google Chrome (browser), Gmail (email), WhatsApp (messaging).</li>
        <li><strong>Paid software</strong> costs money. You pay once or every month. Examples: Microsoft Office (for writing documents).</li>
      </ul>

      <h2>A Real-Life Example</h2>
      <p>Imagine your computer is a kitchen.</p>
      <p>The kitchen itself (the walls, oven, fridge) is the hardware.</p>
      <p>The recipes and cooking instructions are the software.</p>
      <p>Without recipes (software), you cannot cook. Without the kitchen (hardware), the recipes are useless.</p>
      <p>You need both working together!</p>
    </div>`,
    summary: [
      "Software is programs and instructions that tell the hardware what to do.",
      "The operating system (Windows, macOS) is the computer's main manager — it starts everything.",
      "Applications (apps) like browsers, email, and video calls are types of software that do specific jobs."
    ],
    homework: {
      id: 3,
      question: "Think of 5 things you would like to do on a computer. For each one, write what app or program you might use. For example: 'I want to write a letter → I would use Microsoft Word.'",
      completed: false
    },
    quiz: {
      id: 3,
      questions: [
        { id: 1, question: "What is software?", options: ["Physical parts you can touch", "Programs and instructions that tell the computer what to do", "The computer's screen"], answer: 1 },
        { id: 2, question: "What is an operating system?", options: ["A type of game", "The main software that manages the whole computer", "A web browser"], answer: 1 },
        { id: 3, question: "Which of these is an operating system?", options: ["Microsoft Word", "Windows", "Google Chrome"], answer: 1 }
      ]
    }
  },
  {
    id: 4,
    title: "Turning On and Off a Computer",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>This is Very Important!</h2>
      <p>Learning to turn a computer on and off correctly will protect your work and keep your computer healthy.</p>
      <p>Do not worry — it is not difficult. Just follow these simple steps.</p>

      <h2>How to Turn ON a Computer</h2>
      <p>Follow these steps one at a time:</p>
      <ul>
        <li><strong>Step 1:</strong> Make sure the computer is plugged into the wall. Check the power cable at the back or side.</li>
        <li><strong>Step 2:</strong> Find the <strong>power button</strong>. It usually has this symbol: ⏻ (a circle with a line at the top). On a desktop, it is on the front of the tower. On a laptop, it is above the keyboard.</li>
        <li><strong>Step 3:</strong> Press the power button <strong>once</strong>. Do not hold it down.</li>
        <li><strong>Step 4:</strong> <strong>Wait patiently.</strong> The computer needs time to start. You will see lights turn on and the screen will show the operating system loading. This takes 30 seconds to 2 minutes. Do not press anything while waiting!</li>
        <li><strong>Step 5:</strong> When the desktop appears — with icons and a background picture — the computer is ready. You can start using it now.</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Tip:</strong> Starting a computer is called "booting up". This is because in old times, starting a machine was called "pulling yourself up by your bootstraps". Now it is just called booting!
      </div>

      <h2>How to Turn OFF a Computer (The Right Way)</h2>
      <p><strong>NEVER just unplug the computer or press the power button while it is running!</strong></p>
      <p>This can damage your files and the computer itself.</p>
      <p>Always shut down properly:</p>
      <ul>
        <li><strong>On Windows:</strong> Click the <strong>Start button</strong> (the Windows logo, bottom-left corner). Then click the <strong>Power icon</strong>. Then click <strong>Shut down</strong>. Wait for the screen to go dark before unplugging.</li>
        <li><strong>On Mac:</strong> Click the <strong>Apple menu</strong> (the Apple logo, top-left corner). Then click <strong>Shut Down</strong>. Wait for the computer to turn off.</li>
      </ul>

      <h2>What About Restarting?</h2>
      <p>Sometimes the computer asks you to <strong>restart</strong>. This means it turns off and on again by itself.</p>
      <p>This is normal and healthy. It happens when you install updates.</p>
      <p>Always save your work before restarting!</p>

      <h2>Sleep Mode</h2>
      <p>Sleep mode is like a rest for the computer. The screen goes dark but the computer is still on.</p>
      <p>You can wake it up quickly by pressing any key on the keyboard or moving the mouse.</p>
      <p>Sleep mode is useful when you step away for a short time. It uses less electricity than leaving the screen on.</p>

      <h2>What If the Computer Freezes?</h2>
      <p>Sometimes the computer stops responding. The mouse does not move. Nothing happens when you click.</p>
      <p>This is called "freezing". Do not panic!</p>
      <ul>
        <li><strong>Step 1:</strong> Wait 1-2 minutes. Sometimes it fixes itself.</li>
        <li><strong>Step 2:</strong> If it is still frozen, hold the power button down for 5-10 seconds until the computer turns off completely.</li>
        <li><strong>Step 3:</strong> Wait 30 seconds. Then turn it on again normally.</li>
      </ul>
      <p>This is called a "forced shutdown". It is okay to do this in an emergency, but try not to do it often.</p>

      <div class="warning-box">
        <strong>⚠️ Remember:</strong> Always save your work before shutting down or stepping away. You will learn how to save files in a later lesson.
      </div>

      <h2>How Often Should You Turn Off Your Computer?</h2>
      <p>It is good practice to turn off your computer when you are not using it for a long time — like overnight or when you go away.</p>
      <p>This helps the computer stay healthy and use less electricity.</p>
    </div>`,
    summary: [
      "Press the power button once and wait patiently for the computer to fully start up.",
      "Always shut down using the Start menu (Windows) or Apple menu (Mac) — never just unplug!",
      "If the computer freezes, hold the power button for 5-10 seconds, then turn it on again normally."
    ],
    homework: {
      id: 4,
      question: "Practice turning on and off a computer. Do it slowly and follow each step. Ask someone to watch you. Can you find the power button? Can you use the Start menu to shut down?",
      completed: false
    },
    quiz: {
      id: 4,
      questions: [
        { id: 1, question: "How do you properly turn off a Windows computer?", options: ["Pull out the power cord", "Use the Start menu and click Shut Down", "Press any key on the keyboard"], answer: 1 },
        { id: 2, question: "What should you do if the computer freezes?", options: ["Throw water on it", "Wait 1-2 minutes, then hold the power button if needed", "Slam the keyboard"], answer: 1 },
        { id: 3, question: "Why is it important to shut down properly?", options: ["To save electricity only", "To protect your files and keep the computer healthy", "Because the computer likes it"], answer: 1 }
      ]
    }
  },
  {
    id: 5,
    title: "Using the Mouse",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>Your Friend — The Mouse</h2>
      <p>The mouse is one of the most important tools for using a computer.</p>
      <p>When you move the mouse on your desk, you will see a small arrow move on the screen. This arrow is called the <strong>cursor</strong> or <strong>pointer</strong>.</p>
      <p>You use the mouse to point at things, open programs, and choose options.</p>

      <h2>How to Hold the Mouse</h2>
      <ul>
        <li>Place your hand gently on the mouse. Do not grip it too hard.</li>
        <li>Your <strong>index finger</strong> (first finger) rests on the left button.</li>
        <li>Your <strong>middle finger</strong> rests on the right button.</li>
        <li>Your <strong>thumb</strong> and other fingers hold the sides.</li>
        <li>Move the mouse smoothly on a flat surface. A mouse pad helps a lot.</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Tip:</strong> If the pointer reaches the edge of the screen, just pick up the mouse, put it back in the middle of the mouse pad, and keep moving. The pointer will stay where it was.
      </div>

      <h2>Mouse Actions — Step by Step</h2>

      <h3>Single Click (Left Click)</h3>
      <p>This is the most common action.</p>
      <p><strong>How to do it:</strong> Press and release the left button quickly and gently, just once.</p>
      <p><strong>What it does:</strong> Selects something or opens menus. For example, clicking on a menu shows you the options.</p>

      <h3>Double-Click</h3>
      <p><strong>How to do it:</strong> Press and release the left button twice quickly — click, click — with no pause between them.</p>
      <p><strong>What it does:</strong> Opens programs and files. For example, if you want to open a photo, you double-click on it.</p>
      <p><strong>Tip:</strong> If double-clicking is hard, go slowly until you get the timing right. It takes practice!</p>

      <h3>Right-Click</h3>
      <p><strong>How to do it:</strong> Press and release the right button once.</p>
      <p><strong>What it does:</strong> Shows a menu with extra options. For example, right-clicking on a file shows you options like "Open", "Copy", "Delete".</p>

      <h3>Scroll Wheel</h3>
      <p>Most mice have a small wheel in the middle between the two buttons.</p>
      <p><strong>How to use it:</strong> Roll the wheel forward (away from you) to scroll UP. Roll it backward (toward you) to scroll DOWN.</p>
      <p><strong>What it does:</strong> Lets you move up and down through long pages — like scrolling through a long document or website — without using a scroll bar.</p>

      <h3>Click and Drag</h3>
      <p><strong>How to do it:</strong> Click and HOLD the left button, then move the mouse to drag something to a new place, then release the button.</p>
      <p><strong>What it does:</strong> Moves things. For example, you can drag an icon on the desktop to a different place.</p>

      <h2>Helpful Tips for Using the Mouse</h2>
      <ul>
        <li>Use a <strong>mouse pad</strong> — this helps the mouse move smoothly and accurately.</li>
        <li>Move the mouse <strong>slowly</strong> at first. Accuracy matters more than speed.</li>
        <li>Keep the mouse close to your keyboard so you do not reach too far.</li>
        <li>If you are left-handed, you can switch which button does what in the computer settings.</li>
        <li>If your hand gets tired, take a short break and stretch your fingers.</li>
      </ul>

      <h2>Touchpad (on Laptops)</h2>
      <p>Laptops do not always have a separate mouse. They have a <strong>touchpad</strong> — a flat rectangle below the keyboard.</p>
      <ul>
        <li>Slide one finger to move the cursor.</li>
        <li>Tap once to single-click.</li>
        <li>Tap twice quickly to double-click.</li>
        <li>Tap with two fingers for right-click.</li>
        <li>Slide two fingers up or down to scroll.</li>
      </ul>
      <p>You can still use a real mouse with a laptop. Just plug it into a USB port on the side.</p>

      <h2>Practice Exercise</h2>
      <p>Try this now:</p>
      <ul>
        <li>Move your mouse slowly around the screen</li>
        <li>Click on the Start menu button (bottom left on Windows)</li>
        <li>Click somewhere else to close the menu</li>
        <li>Try right-clicking on the desktop to see a menu</li>
        <li>Press Escape (Esc key) to close the menu</li>
      </ul>
    </div>`,
    summary: [
      "Move the mouse on a flat surface to control the arrow (cursor) on screen.",
      "Left-click selects, double-click opens things, and right-click shows extra options.",
      "The scroll wheel lets you move up and down through pages easily."
    ],
    homework: {
      id: 5,
      question: "Practice these three things: (1) Move the mouse slowly around the screen. (2) Double-click on an icon to open something. (3) Right-click on the desktop and look at the menu that appears. Write down what you see in the menu.",
      completed: false
    },
    quiz: {
      id: 5,
      questions: [
        { id: 1, question: "Which mouse button do you use most often?", options: ["The right button", "The scroll wheel", "The left button"], answer: 2 },
        { id: 2, question: "What does double-clicking do?", options: ["Closes a program", "Opens programs and files", "Scrolls the page"], answer: 1 },
        { id: 3, question: "What does the scroll wheel help you do?", options: ["Move the cursor faster", "Scroll up and down through pages", "Make text bigger"], answer: 1 }
      ]
    }
  },
  {
    id: 6,
    title: "Using the Keyboard",
    module: "Computer Basics",
    level: 1,
    content: `<div class="lesson-content">
      <h2>Your Communication Tool — The Keyboard</h2>
      <p>The keyboard is how you type words, numbers, and instructions into the computer.</p>
      <p>It looks like a typewriter. Do not worry if typing feels slow at first. Everyone starts slowly. With practice, you will get faster.</p>

      <h2>The Layout of the Keyboard</h2>
      <p>The keyboard is organised into different areas:</p>
      <ul>
        <li><strong>Letter keys:</strong> The main area with all 26 letters. They are not in alphabetical order — this layout is called QWERTY (named after the first 6 letters).</li>
        <li><strong>Number keys:</strong> A row of numbers 0-9 at the top.</li>
        <li><strong>Special keys:</strong> Important keys like Enter, Backspace, Shift, and Space.</li>
        <li><strong>Number pad:</strong> On the right side of some keyboards — a set of number keys that are easier to use for typing lots of numbers.</li>
        <li><strong>Arrow keys:</strong> Four arrow keys that move the cursor.</li>
        <li><strong>Function keys (F1-F12):</strong> At the very top. Each one does something different in different programs.</li>
      </ul>

      <h2>The Most Important Keys</h2>

      <h3>Spacebar</h3>
      <p>The long bar at the bottom of the keyboard.</p>
      <p>Press it once to add a space between words.</p>
      <p>Example: To type "Hello World" — type Hello, press Spacebar, type World.</p>

      <h3>Enter (Return)</h3>
      <p>Starts a new paragraph when writing text.</p>
      <p>Confirms actions — like pressing OK on a button.</p>
      <p>For example, when you type a website address and press Enter, the computer goes to that website.</p>

      <h3>Backspace</h3>
      <p>Deletes the letter <strong>before</strong> the cursor (to the left).</p>
      <p>If you make a typing mistake, press Backspace to erase it.</p>
      <p>Hold Backspace to delete many letters quickly.</p>

      <h3>Delete (Del)</h3>
      <p>Deletes the letter <strong>after</strong> the cursor (to the right).</p>

      <h3>Shift</h3>
      <p>Makes letters into CAPITALS.</p>
      <p>Hold Shift and press a letter to make it uppercase.</p>
      <p>Also types the special symbol on the top half of keys (like @ # $ % ^ &).</p>

      <h3>Caps Lock</h3>
      <p>Press this once to type in ALL CAPITALS without holding Shift.</p>
      <p>Press it again to go back to lowercase.</p>
      <p>A small light on the keyboard shows if Caps Lock is on.</p>

      <h3>Tab</h3>
      <p>Moves the cursor forward several spaces at once. Useful for indenting paragraphs.</p>
      <p>Also useful for moving between fields in a form (like moving from the Name field to the Email field).</p>

      <h3>Escape (Esc)</h3>
      <p>Cancels what you are doing. Closes menus.</p>
      <p>Very helpful when you accidentally open something!</p>

      <h3>Arrow Keys (↑ ↓ ← →)</h3>
      <p>Move the cursor one position at a time — left, right, up, or down.</p>

      <h2>Useful Keyboard Shortcuts</h2>
      <p>Shortcuts are combinations of keys that do things quickly:</p>
      <ul>
        <li><strong>Ctrl + C</strong> — Copy selected text or file</li>
        <li><strong>Ctrl + V</strong> — Paste what you copied</li>
        <li><strong>Ctrl + Z</strong> — Undo (reverse your last action)</li>
        <li><strong>Ctrl + S</strong> — Save your work</li>
        <li><strong>Ctrl + A</strong> — Select all text</li>
        <li><strong>Ctrl + P</strong> — Print</li>
        <li><strong>Alt + F4</strong> — Close the current window</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Golden Rule:</strong> Press Ctrl + Z (Undo) if you make a mistake! This is your best friend. It reverses whatever you just did.
      </div>

      <h2>Typing Tips</h2>
      <ul>
        <li>Start with just typing your name and simple sentences</li>
        <li>Look at the screen, not the keyboard, when you can</li>
        <li>Use both hands — one for the left side of the keyboard, one for the right</li>
        <li>Do not rush. Slow and accurate is better than fast and full of mistakes</li>
        <li>Take breaks if your hands get tired</li>
      </ul>

      <h2>Good Posture While Typing</h2>
      <p>Sitting properly helps prevent back and wrist pain:</p>
      <ul>
        <li>Sit up straight in your chair</li>
        <li>Keep your feet flat on the floor</li>
        <li>Keep elbows at a comfortable angle</li>
        <li>Place the keyboard at a comfortable height</li>
        <li>Take breaks every 30-60 minutes</li>
      </ul>
    </div>`,
    summary: [
      "The Spacebar adds spaces, Enter starts a new line or confirms actions, and Backspace deletes mistakes.",
      "Hold Shift to type CAPITAL letters or special characters like @ # $.",
      "Ctrl + Z (Undo) is your best friend — it reverses your last action!"
    ],
    homework: {
      id: 6,
      question: "Open a program like Notepad (on Windows) or TextEdit (on Mac). Practice typing: your full name, your address, and a short sentence about yourself. Practice using Backspace to fix any mistakes you make.",
      completed: false
    },
    quiz: {
      id: 6,
      questions: [
        { id: 1, question: "Which key adds a space between words?", options: ["Enter", "Spacebar", "Backspace"], answer: 1 },
        { id: 2, question: "What does pressing Ctrl + Z do?", options: ["Closes the program", "Undoes your last action (reverses a mistake)", "Saves your work"], answer: 1 },
        { id: 3, question: "What does the Backspace key do?", options: ["Adds spaces", "Deletes the letter before the cursor (to the left)", "Starts a new line"], answer: 1 }
      ]
    }
  },
  {
    id: 7,
    title: "Understanding Files and Folders",
    module: "Computer Basics",
    level: 2,
    content: `<div class="lesson-content">
      <h2>Organising Your Computer</h2>
      <p>When you use a computer, you create and store things — photos, documents, music.</p>
      <p>These stored things are called <strong>files</strong>.</p>
      <p>To keep files organised and easy to find, we use <strong>folders</strong>.</p>

      <h2>What is a File?</h2>
      <p>A file is like a digital piece of paper.</p>
      <p>Every file has:</p>
      <ul>
        <li>A <strong>name</strong> (what you call it, like "Birthday Photo")</li>
        <li>A <strong>type</strong> (what kind of file it is)</li>
        <li>A <strong>size</strong> (how much space it takes on the hard drive)</li>
      </ul>
      <p>Common types of files:</p>
      <ul>
        <li><strong>Documents</strong> — text files like letters and reports (.doc, .pdf)</li>
        <li><strong>Photos</strong> — pictures (.jpg, .png)</li>
        <li><strong>Music</strong> — songs (.mp3)</li>
        <li><strong>Videos</strong> — films and clips (.mp4)</li>
        <li><strong>Programs</strong> — software applications (.exe)</li>
      </ul>

      <h2>What is a Folder?</h2>
      <p>A folder is a container for files. It is just like a real folder in a filing cabinet.</p>
      <p>You can put files inside folders. You can even put folders inside folders.</p>
      <p>Folders help you find things quickly. Imagine having 500 photos all in one place with no organisation — it would be very hard to find a specific photo!</p>

      <h2>The File Explorer (Windows) / Finder (Mac)</h2>
      <p>The File Explorer (on Windows) or Finder (on Mac) is a special program that shows you all your files and folders.</p>
      <p>Think of it as the filing system of your computer.</p>
      <p>To open File Explorer on Windows:</p>
      <ul>
        <li>Click the yellow folder icon on the taskbar at the bottom of the screen</li>
        <li>Or press the Windows key + E on the keyboard</li>
      </ul>

      <h2>Common Folders on Your Computer</h2>
      <ul>
        <li><strong>Desktop:</strong> The main screen. Good for shortcuts to things you use often.</li>
        <li><strong>Documents:</strong> For saving letters, reports, and other text files.</li>
        <li><strong>Pictures:</strong> For storing your photos and images.</li>
        <li><strong>Music:</strong> For your music files.</li>
        <li><strong>Downloads:</strong> Where files go when you download them from the internet.</li>
        <li><strong>Recycle Bin (Windows) / Bin (Mac):</strong> Where deleted files go. They stay here until you empty the bin.</li>
      </ul>

      <h2>How to Create a New Folder</h2>
      <ul>
        <li><strong>Step 1:</strong> Open File Explorer and go to where you want the new folder.</li>
        <li><strong>Step 2:</strong> Right-click on empty space in the window.</li>
        <li><strong>Step 3:</strong> Click "New" then "Folder".</li>
        <li><strong>Step 4:</strong> Type a name for the folder and press Enter.</li>
      </ul>

      <h2>Deleting and Recovering Files</h2>
      <p>When you delete a file, it does NOT disappear immediately.</p>
      <p>It goes to the <strong>Recycle Bin</strong> (Windows) or <strong>Bin</strong> (Mac) first.</p>
      <p>If you deleted something by accident, you can get it back!</p>
      <ul>
        <li>Open the Recycle Bin (find the icon on the desktop)</li>
        <li>Find the file you want to recover</li>
        <li>Right-click on it and choose "Restore"</li>
        <li>The file goes back to where it was</li>
      </ul>
      <p>To permanently delete files and free up space, click "Empty Recycle Bin".</p>

      <div class="tip-box">
        <strong>💡 Good Habit:</strong> Name your files clearly! Instead of "doc1", name it "Letter to Doctor - March 2026". This makes it much easier to find later.
      </div>
    </div>`,
    summary: [
      "Files are digital items — photos, documents, music — stored on your computer.",
      "Folders organise files into groups, just like real folders in a filing cabinet.",
      "Deleted files go to the Recycle Bin first — you can recover them if you deleted by mistake!"
    ],
    homework: {
      id: 7,
      question: "Open File Explorer (Windows) or Finder (Mac). Look around at the folders you find. Create a new folder called 'My Learning'. Inside it, create two more folders: 'Photos' and 'Notes'. Well done — you are now organising your computer!",
      completed: false
    },
    quiz: {
      id: 7,
      questions: [
        { id: 1, question: "What is a file on a computer?", options: ["A type of folder", "A digital item like a document, photo, or song", "A computer program"], answer: 1 },
        { id: 2, question: "What is a folder used for?", options: ["Storing electricity", "Organising files into groups", "Playing music"], answer: 1 },
        { id: 3, question: "Where do deleted files go first?", options: ["They disappear forever", "To the Recycle Bin where you can recover them", "To the Downloads folder"], answer: 1 }
      ]
    }
  },
  {
    id: 8,
    title: "The Desktop and Icons",
    module: "Computer Basics",
    level: 2,
    content: `<div class="lesson-content">
      <h2>Your Computer's Home — The Desktop</h2>
      <p>When you turn on your computer and it finishes starting up, you see the <strong>desktop</strong>.</p>
      <p>The desktop is like the top of your real desk — it is your main workspace.</p>
      <p>You can place shortcuts to your favourite programs and files here, so they are always easy to find.</p>

      <h2>What Are Icons?</h2>
      <p><strong>Icons</strong> are the small pictures you see on the desktop (and throughout the computer).</p>
      <p>Each icon represents something:</p>
      <ul>
        <li>A <strong>program icon</strong> opens a software program when you double-click it</li>
        <li>A <strong>file icon</strong> opens a specific document or photo</li>
        <li>A <strong>folder icon</strong> opens a folder containing files</li>
      </ul>
      <p>For example, a small picture of a web browser (like a colourful circle) represents Google Chrome.</p>

      <h2>How to Use Icons</h2>
      <ul>
        <li><strong>Double-click</strong> to open — click twice quickly</li>
        <li><strong>Single-click</strong> to select (highlight) an icon</li>
        <li><strong>Right-click</strong> to see a menu of options (Open, Copy, Rename, Delete...)</li>
        <li><strong>Click and drag</strong> to move an icon to a different place on the desktop</li>
      </ul>

      <h2>The Taskbar</h2>
      <p>At the bottom of the screen is a long bar called the <strong>taskbar</strong>.</p>
      <p>The taskbar shows you:</p>
      <ul>
        <li><strong>The Start button</strong> — on the left (Windows logo) — click to see all programs</li>
        <li><strong>Pinned programs</strong> — programs you use often, kept here for quick access</li>
        <li><strong>Open programs</strong> — programs currently running appear on the taskbar</li>
        <li><strong>System area</strong> — on the right, shows the clock, calendar, and settings</li>
      </ul>

      <h2>The Start Menu (Windows)</h2>
      <p>Click the Windows logo (Start button) to open the Start Menu.</p>
      <p>From here you can:</p>
      <ul>
        <li>Find and open any program on your computer</li>
        <li>Search for files by typing their name</li>
        <li>Access Settings to change how your computer looks and works</li>
        <li>Shut down, restart, or put the computer to sleep</li>
      </ul>
      <p>The Start Menu is like the main entrance to everything on your computer.</p>

      <h2>Wallpaper and Desktop Background</h2>
      <p>The large picture behind all the icons is called the <strong>wallpaper</strong> or background.</p>
      <p>You can change it to any picture you like — a family photo, a landscape, anything!</p>
      <p>To change it: Right-click on the desktop → Personalise → Background → choose your photo.</p>

      <h2>The Recycle Bin</h2>
      <p>You will see an icon on the desktop that looks like a rubbish bin.</p>
      <p>This is the <strong>Recycle Bin</strong>.</p>
      <p>When you delete files, they go here first. If you change your mind, you can get them back.</p>
      <p>Empty the Recycle Bin to permanently delete files and free up space.</p>

      <h2>Shortcuts — Making Life Easier</h2>
      <p>You can add shortcuts to programs on the desktop.</p>
      <p>A shortcut is like a bookmark — it points to a program without moving the program itself.</p>
      <p>To create a shortcut:</p>
      <ul>
        <li>Find the program in the Start Menu</li>
        <li>Right-click on it</li>
        <li>Choose "Pin to Desktop" or "Send to Desktop (Create Shortcut)"</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Tip:</strong> You can organise icons into groups on the desktop to keep things tidy. Or you can put everything inside a folder on the desktop!
      </div>
    </div>`,
    summary: [
      "The desktop is your computer's main screen — your home base for everything.",
      "Icons are small pictures that represent programs, files, and folders.",
      "The taskbar at the bottom shows open programs, the Start button, and the clock."
    ],
    homework: {
      id: 8,
      question: "Look at your computer's desktop. Count how many icons are there. Try double-clicking one to open something. Then right-click on the desktop (empty space) and see what options appear in the menu. What do you see?",
      completed: false
    },
    quiz: {
      id: 8,
      questions: [
        { id: 1, question: "What is the desktop?", options: ["A type of computer program", "The main screen you see after starting the computer", "The keyboard area"], answer: 1 },
        { id: 2, question: "How do you open a program from its icon?", options: ["Right-click on it", "Single-click once", "Double-click it"], answer: 2 },
        { id: 3, question: "What does the Start button (Windows logo) do?", options: ["Turns off the computer", "Opens a menu to find all programs and settings", "Opens the internet"], answer: 1 }
      ]
    }
  },
  {
    id: 9,
    title: "What is the Internet?",
    module: "Internet Basics",
    level: 2,
    content: `<div class="lesson-content">
      <h2>The World is Connected!</h2>
      <p>The <strong>internet</strong> is one of the greatest inventions in human history.</p>
      <p>It is a huge network that connects billions of computers all around the world.</p>
      <p>Through the internet, you can communicate with anyone, find information about anything, and access services without leaving your home.</p>

      <h2>What Can You Do on the Internet?</h2>
      <ul>
        <li><strong>Find information</strong> — answers to any question, encyclopedias, news, recipes</li>
        <li><strong>Communicate</strong> — email, video calls, messages to family and friends</li>
        <li><strong>Watch videos</strong> — films, TV shows, tutorials on YouTube</li>
        <li><strong>Listen to music</strong> — millions of songs</li>
        <li><strong>Shop</strong> — buy things and have them delivered to your door</li>
        <li><strong>Bank online</strong> — check your bank balance, pay bills</li>
        <li><strong>See your family</strong> — video call grandchildren across the world for free</li>
        <li><strong>Book appointments</strong> — doctor, dentist, travel</li>
        <li><strong>Play games</strong> — alone or with others</li>
        <li><strong>Learn</strong> — courses, lessons, tutorials — like this one!</li>
      </ul>

      <h2>How Does the Internet Work?</h2>
      <p>Think of the internet like a massive postal system for digital information.</p>
      <p>When you look at a website, your computer sends a request to another computer far away (called a server). That server sends back the information your screen shows.</p>
      <p>All this happens in less than a second!</p>
      <p>The internet works through:</p>
      <ul>
        <li><strong>Cables</strong> — underground and undersea cables carry most internet data</li>
        <li><strong>Wi-Fi</strong> — wireless signals that spread through the air in your home</li>
        <li><strong>Mobile data</strong> — signals from phone towers for smartphones</li>
      </ul>

      <h2>Wi-Fi — Your Home Internet Connection</h2>
      <p>Most people connect to the internet at home using <strong>Wi-Fi</strong>.</p>
      <p>Wi-Fi is a wireless signal from a small box called a <strong>router</strong>.</p>
      <p>The router is connected to a cable that comes from outside your home (from your internet provider).</p>
      <p>Your computer or phone connects to the Wi-Fi signal — no wires needed!</p>

      <h2>Websites</h2>
      <p>The internet is made up of millions of <strong>websites</strong>.</p>
      <p>A website is like a digital shop, library, or office.</p>
      <p>Each website has its own address called a <strong>URL</strong> (Uniform Resource Locator).</p>
      <p>Examples of URLs:</p>
      <ul>
        <li>www.google.com — the Google search engine</li>
        <li>www.bbc.com — BBC News</li>
        <li>www.nhs.uk — NHS health information</li>
      </ul>

      <h2>Internet Safety</h2>
      <p>The internet is wonderful, but you need to be careful.</p>
      <ul>
        <li><strong>Never share</strong> your full name, home address, or bank details with strangers online</li>
        <li><strong>Use strong passwords</strong> for your accounts</li>
        <li><strong>Be careful of suspicious emails</strong> asking for your details — this is called phishing</li>
        <li><strong>Only shop on trusted websites</strong> that have "https://" at the start of the address</li>
        <li><strong>If something feels wrong, ask for help</strong></li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Important Safety Rule:</strong> If you receive an email or phone call saying your computer has a virus and asking you to pay money or give your password — this is almost certainly a SCAM. Hang up or delete the email. Contact a trusted person.
      </div>

      <h2>A Real-Life Example</h2>
      <p>Imagine the internet like a giant library.</p>
      <p>You can walk in and find any book, magazine, or newspaper ever written. And it is all free!</p>
      <p>You can also talk to the librarians (websites), buy things from the gift shop (online shopping), and call your friends from the lobby (email and video calls).</p>
    </div>`,
    summary: [
      "The internet is a massive global network connecting billions of computers worldwide.",
      "You can use it to search for information, video call family, shop, bank, and much more.",
      "Stay safe online: never share personal details with strangers and be careful of scams."
    ],
    homework: {
      id: 9,
      question: "Write down three things you would like to use the internet for. For example: 'I want to video call my daughter in Australia' or 'I want to look up a recipe for apple pie'. Share your list with your teacher.",
      completed: false
    },
    quiz: {
      id: 9,
      questions: [
        { id: 1, question: "What is the internet?", options: ["A type of computer program", "A global network connecting billions of computers", "A computer mouse"], answer: 1 },
        { id: 2, question: "What is a URL?", options: ["A type of food", "A website address like www.google.com", "A computer part"], answer: 1 },
        { id: 3, question: "Which of these is a safe rule for the internet?", options: ["Share your bank details freely", "Never share personal details with strangers", "Always click on every link you see"], answer: 1 }
      ]
    }
  },
  {
    id: 10,
    title: "Using a Web Browser",
    module: "Internet Basics",
    level: 2,
    content: `<div class="lesson-content">
      <h2>Your Door to the Internet</h2>
      <p>To visit websites on the internet, you need a program called a <strong>web browser</strong>.</p>
      <p>Think of the browser as your car — it takes you to any destination on the internet.</p>
      <p>Popular browsers:</p>
      <ul>
        <li><strong>Google Chrome</strong> — most popular, a colourful circle logo</li>
        <li><strong>Microsoft Edge</strong> — comes with Windows computers, looks like a blue wave</li>
        <li><strong>Safari</strong> — comes on iPhones, iPads, and Mac computers</li>
        <li><strong>Mozilla Firefox</strong> — another popular option, orange and purple fox logo</li>
      </ul>
      <p>All browsers do the same basic job. They all show you websites.</p>

      <h2>Parts of a Browser — What Do You See?</h2>
      <ul>
        <li><strong>Address bar:</strong> A long box near the top where you type the website address (URL). For example, type www.bbc.com to go to the BBC website.</li>
        <li><strong>Back button (←):</strong> Takes you back to the previous page you were on.</li>
        <li><strong>Forward button (→):</strong> Goes forward again after pressing Back.</li>
        <li><strong>Refresh button (↺):</strong> Reloads the page — useful if a page does not load correctly.</li>
        <li><strong>Home button:</strong> Takes you to your homepage (your starting page).</li>
        <li><strong>Tabs:</strong> Small bars at the top. Each tab shows a different website. You can have many tabs open at once.</li>
        <li><strong>Bookmarks bar:</strong> A row of saved websites — your favourites, always visible for quick access.</li>
      </ul>

      <h2>How to Visit a Website</h2>
      <ul>
        <li><strong>Step 1:</strong> Open your browser by double-clicking its icon.</li>
        <li><strong>Step 2:</strong> Click in the <strong>address bar</strong> at the top. All the text should get highlighted.</li>
        <li><strong>Step 3:</strong> Type the website address. For example: www.google.com</li>
        <li><strong>Step 4:</strong> Press <strong>Enter</strong> on the keyboard.</li>
        <li><strong>Step 5:</strong> Wait a moment while the page loads. Then read and explore!</li>
      </ul>

      <h2>Opening Multiple Tabs</h2>
      <p>Tabs are very useful! You can open many websites at once without losing any.</p>
      <p>To open a new tab:</p>
      <ul>
        <li>Click the <strong>+ button</strong> at the top right of the tabs area</li>
        <li>Or press <strong>Ctrl + T</strong> on the keyboard</li>
      </ul>
      <p>Click on any tab to switch between websites.</p>
      <p>To close a tab, click the <strong>X</strong> on the right side of the tab.</p>

      <h2>Bookmarks — Save Your Favourite Websites</h2>
      <p>A <strong>bookmark</strong> saves a website address so you can return to it easily.</p>
      <p>Instead of typing the address every time, just click the bookmark!</p>
      <p>To save a bookmark in Chrome:</p>
      <ul>
        <li>Go to the website you want to save</li>
        <li>Click the star ☆ in the address bar</li>
        <li>The bookmark is saved!</li>
      </ul>
      <p>Find your bookmarks in the Bookmarks menu at the top of the browser.</p>

      <h2>Zoom In — Make Text Bigger</h2>
      <p>If text on a website is too small to read:</p>
      <ul>
        <li>Press <strong>Ctrl + +</strong> (plus) to make text bigger</li>
        <li>Press <strong>Ctrl + -</strong> (minus) to make it smaller again</li>
        <li>Press <strong>Ctrl + 0</strong> (zero) to return to normal size</li>
      </ul>

      <h2>What is a Link?</h2>
      <p>On websites, you will see text that is underlined or a different colour (usually blue).</p>
      <p>These are called <strong>links</strong> (or hyperlinks).</p>
      <p>When you click on a link, it takes you to another page or website.</p>
      <p>When you hover over a link (move the mouse over it without clicking), you can see the web address it leads to at the bottom of the screen.</p>

      <div class="tip-box">
        <strong>💡 Tip:</strong> If a page loads too slowly, press the Refresh button (↺) or F5 on the keyboard. This reloads the page from the beginning.
      </div>
    </div>`,
    summary: [
      "A web browser (like Chrome, Edge, or Safari) is the program you use to visit websites.",
      "Type the website address (URL) in the address bar and press Enter to visit a website.",
      "Use tabs to have multiple websites open at once; use bookmarks to save your favourites."
    ],
    homework: {
      id: 10,
      question: "Open a web browser on your computer. Type www.bbc.com in the address bar and press Enter. Once the BBC website loads, click on a news story that interests you. Practice clicking the back button to return to the main page.",
      completed: false
    },
    quiz: {
      id: 10,
      questions: [
        { id: 1, question: "What is a web browser used for?", options: ["Playing music", "Visiting websites on the internet", "Writing documents"], answer: 1 },
        { id: 2, question: "Where do you type the website address?", options: ["In the title bar", "In the address bar", "In the search box on Google"], answer: 1 },
        { id: 3, question: "What does the Back button (←) do?", options: ["Goes to the next page", "Reloads the current page", "Takes you to the previous page you were on"], answer: 2 }
      ]
    }
  },
  {
    id: 11,
    title: "Searching the Internet",
    module: "Internet Basics",
    level: 2,
    content: `<div class="lesson-content">
      <h2>Finding Anything in Seconds</h2>
      <p>The internet has more information than any library in the world.</p>
      <p>But how do you find what you need? You use a <strong>search engine</strong>.</p>
      <p>A search engine is a special website that helps you find other websites and information.</p>
      <p>The most popular search engine is <strong>Google</strong>.</p>

      <h2>How to Search on Google</h2>
      <ul>
        <li><strong>Step 1:</strong> Open your web browser (Chrome, Edge, etc.).</li>
        <li><strong>Step 2:</strong> In the address bar, type www.google.com and press Enter. Or just type your question directly in the address bar — modern browsers search Google for you automatically.</li>
        <li><strong>Step 3:</strong> On the Google homepage, you will see a big search box in the middle.</li>
        <li><strong>Step 4:</strong> Click in the search box. Type your question or keywords.</li>
        <li><strong>Step 5:</strong> Press Enter or click the "Google Search" button.</li>
        <li><strong>Step 6:</strong> Google shows you a list of results. Click on one that looks helpful.</li>
      </ul>

      <h2>How to Write Good Search Terms</h2>
      <p>The words you type in the search box are called <strong>search terms</strong> or <strong>keywords</strong>.</p>
      <p>You do not need to type complete sentences. Short keywords work better.</p>
      <ul>
        <li><strong>Instead of:</strong> "I would like to know what the weather will be like tomorrow in London"</li>
        <li><strong>Type:</strong> "weather London tomorrow"</li>
      </ul>
      <ul>
        <li><strong>Instead of:</strong> "How do I make apple crumble?"</li>
        <li><strong>Type:</strong> "apple crumble recipe"</li>
      </ul>

      <h2>Understanding the Results Page</h2>
      <p>After you search, Google shows you many results. Here is what you see:</p>
      <ul>
        <li><strong>Ads (Advertisements):</strong> The first few results often say "Sponsored" or "Ad". These are paid advertisements, not the most useful results.</li>
        <li><strong>Regular results:</strong> Below the ads are normal search results. These are usually more helpful.</li>
        <li><strong>Featured snippet:</strong> Sometimes Google shows the answer directly at the top without you needing to click anything!</li>
        <li><strong>Images tab:</strong> Click "Images" at the top to see only pictures about your search.</li>
      </ul>

      <h2>Is All Information on the Internet True?</h2>
      <p>No! This is very important to understand.</p>
      <p>Anyone can write anything on the internet. Not everything is accurate or true.</p>
      <p>How to check if information is reliable:</p>
      <ul>
        <li>Check multiple websites to see if they agree</li>
        <li>Look for information from well-known organisations (NHS, BBC, government websites)</li>
        <li>Check when the article was written — old information may be outdated</li>
        <li>If in doubt, ask a doctor, expert, or trusted person</li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Medical Warning:</strong> Never use the internet to diagnose a health problem. Always see a real doctor. Internet information can be wrong or not apply to your situation.
      </div>

      <h2>Other Useful Searches</h2>
      <ul>
        <li><strong>Recipes:</strong> "easy scone recipe" or "slow cooker chicken"</li>
        <li><strong>News:</strong> "latest news UK" or "local news [your town]"</li>
        <li><strong>Weather:</strong> "weather this week" (Google knows your location)</li>
        <li><strong>Dictionary:</strong> Type "define [word]" to get a definition instantly</li>
        <li><strong>Calculator:</strong> Type "15 + 27" directly into Google</li>
        <li><strong>Translation:</strong> Type "translate hello into French"</li>
        <li><strong>Bus times:</strong> "bus times [your town]"</li>
        <li><strong>Opening hours:</strong> "[shop name] opening hours"</li>
      </ul>

      <h2>Searching for Images</h2>
      <p>To find pictures:</p>
      <ul>
        <li>After searching, click the "Images" tab at the top of the Google results page</li>
        <li>Google shows you lots of pictures related to your search</li>
        <li>Click on any picture to see a bigger version</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Trick:</strong> If you want to find an exact phrase, put it in quotation marks. For example: "apple crumble with custard" will only show results with those exact words.
      </div>
    </div>`,
    summary: [
      "Google is the most popular search engine — type keywords (not full sentences) for best results.",
      "The first results on Google are often ads — scroll past them for more reliable information.",
      "Not everything on the internet is true — always check important information with trusted sources."
    ],
    homework: {
      id: 11,
      question: "Go to Google and search for something you are curious about. Try these searches: (1) 'weather this week' — what is the weather like? (2) 'easy chicken soup recipe' — what ingredients does it need? Write down what you found!",
      completed: false
    },
    quiz: {
      id: 11,
      questions: [
        { id: 1, question: "What is the most popular search engine?", options: ["Facebook", "Google", "YouTube"], answer: 1 },
        { id: 2, question: "What is the best way to search on Google?", options: ["Type very long sentences", "Type short keywords related to what you want", "Click random links"], answer: 1 },
        { id: 3, question: "Why should you check information from multiple sources?", options: ["To waste time", "Because not everything on the internet is true", "To find more pictures"], answer: 1 }
      ]
    }
  },
  {
    id: 12,
    title: "Email Basics",
    module: "Communication",
    level: 2,
    content: `<div class="lesson-content">
      <h2>Digital Letters — Email</h2>
      <p><strong>Email</strong> stands for "electronic mail".</p>
      <p>It is like sending a letter, but digitally — over the internet.</p>
      <p>The big difference: an email arrives in seconds, not days. And it is free!</p>
      <p>You can send emails to anyone in the world who has an email address.</p>

      <h2>What is an Email Address?</h2>
      <p>An email address is like your postal address, but for digital mail.</p>
      <p>Every email address looks like this: <strong>name@service.com</strong></p>
      <p>For example:</p>
      <ul>
        <li>margaret.smith@gmail.com</li>
        <li>john.brown@outlook.com</li>
      </ul>
      <p>The part before the @ is your username (your chosen name).</p>
      <p>The part after the @ is the email service provider.</p>

      <h2>Popular Email Services (All Free!)</h2>
      <ul>
        <li><strong>Gmail</strong> (gmail.com) — made by Google. Very popular. Works on all devices.</li>
        <li><strong>Outlook</strong> (outlook.com) — made by Microsoft. Comes built into Windows.</li>
        <li><strong>Yahoo Mail</strong> (yahoo.com) — another popular option.</li>
        <li><strong>iCloud Mail</strong> — for iPhone and iPad users.</li>
      </ul>

      <h2>How to Send an Email</h2>
      <ul>
        <li><strong>Step 1:</strong> Open your email program or go to your email website (e.g., gmail.com).</li>
        <li><strong>Step 2:</strong> Click the <strong>"Compose"</strong> or <strong>"New Email"</strong> button. A new window opens.</li>
        <li><strong>Step 3:</strong> In the <strong>"To"</strong> field, type the email address of the person you are writing to. Example: john.smith@gmail.com</li>
        <li><strong>Step 4:</strong> In the <strong>"Subject"</strong> field, type a short title for your email. Example: "Thinking of you" or "Question about Tuesday".</li>
        <li><strong>Step 5:</strong> Click in the big white area below. This is where you write your message.</li>
        <li><strong>Step 6:</strong> When you are finished, click the <strong>"Send"</strong> button.</li>
        <li><strong>Step 7:</strong> Done! Your email is sent instantly.</li>
      </ul>

      <h2>Understanding Your Inbox</h2>
      <ul>
        <li><strong>Inbox:</strong> Where new emails arrive. Check here to read messages people sent to you.</li>
        <li><strong>Sent:</strong> Keeps copies of all emails you have sent.</li>
        <li><strong>Drafts:</strong> Emails you started writing but did not send yet.</li>
        <li><strong>Spam / Junk:</strong> Where suspicious or unwanted emails go automatically. Check here occasionally to see if anything was wrongly filtered.</li>
        <li><strong>Bin / Trash:</strong> Deleted emails. They stay here for a while before being permanently deleted.</li>
      </ul>

      <h2>How to Reply to an Email</h2>
      <ul>
        <li>Open the email you want to reply to</li>
        <li>Click the <strong>"Reply"</strong> button (usually at the bottom of the email)</li>
        <li>Type your reply in the box</li>
        <li>Click Send</li>
      </ul>
      <p>When you reply, the original email is kept below your reply so the person can see the whole conversation.</p>

      <h2>Attachments — Sending Files with Emails</h2>
      <p>You can attach (include) files with your email — like photos or documents.</p>
      <p>When writing an email, look for a <strong>paperclip icon</strong> 📎. Click it to choose a file from your computer.</p>
      <p>The person you send to can then download and view your file.</p>

      <h2>Email Safety</h2>
      <ul>
        <li><strong>Never share your password</strong> with anyone — including family members.</li>
        <li><strong>Be careful of suspicious emails</strong> asking you to "click here" to verify your account, or asking for personal information. This is called <strong>phishing</strong>. Legitimate companies never ask for your password by email.</li>
        <li><strong>Do not open attachments</strong> from people you do not know.</li>
        <li><strong>Spam emails</strong> are unwanted emails. Most email services filter these out automatically.</li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Phishing Alert:</strong> If you receive an email saying your bank account will be closed unless you click a link — do NOT click it! Call your bank directly using the phone number on your card.
      </div>

      <h2>Good Email Habits</h2>
      <ul>
        <li>Check your email regularly — once a day is good</li>
        <li>Use clear subject lines so people know what the email is about</li>
        <li>Keep emails polite and friendly</li>
        <li>Delete or archive emails you no longer need</li>
        <li>Reply to emails promptly — within a day or two if possible</li>
      </ul>

      <div class="tip-box">
        <strong>💡 Did You Know?</strong> You can video call family members for FREE using apps like Zoom, FaceTime, or WhatsApp. All you need is internet and their phone number or email address. We can learn more about this in future lessons!
      </div>
    </div>`,
    summary: [
      "Email is instant digital mail — your address looks like name@service.com (e.g. gmail.com).",
      "Click Compose, fill in the To and Subject fields, write your message, then click Send.",
      "Never share your password and watch out for phishing scams pretending to be banks or companies."
    ],
    homework: {
      id: 12,
      question: "If you have an email address, practice writing a short email to yourself. Put your own email in the 'To' field, write 'Test Email' in the Subject, and write 'Hello! I am learning how to use email.' in the message. Then press Send and check your Inbox!",
      completed: false
    },
    quiz: {
      id: 12,
      questions: [
        { id: 1, question: "What does an email address look like?", options: ["www.google.com", "name@service.com (like john@gmail.com)", "A postal code like SW1A 1AA"], answer: 1 },
        { id: 2, question: "What should you type in the 'Subject' field?", options: ["The person's address", "A short title describing what your email is about", "Your password"], answer: 1 },
        { id: 3, question: "What should you NEVER share?", options: ["Your email address with family", "Your email password — keep it secret!", "The subject of your email"], answer: 1 }
      ]
    }
  }
];

const TYPING_TEXTS = [
  { id: 1, lessonId: 1, text: "A computer is a helpful electronic device that can store information, show pictures, and help you learn new things. Computers come in different sizes from small phones to large desks." },
  { id: 2, lessonId: 2, text: "Hardware includes the physical parts of a computer that you can touch. The main parts are the screen for viewing, keyboard for typing, mouse for pointing, and the computer box that holds the brain." },
  { id: 3, lessonId: 3, text: "Software is the programs that tell the computer what to do. The operating system manages everything while applications like word processors and games perform specific tasks for you." },
  { id: 4, lessonId: 4, text: "To turn on a computer safely, press the power button once and wait for it to start. Always shut down properly by clicking the start button and selecting shut down to protect your work." },
  { id: 5, lessonId: 5, text: "The mouse helps you point and click on items on the screen. Use the left button for most actions. Practice moving the mouse smoothly and clicking accurately on small targets." },
  { id: 6, lessonId: 6, text: "The keyboard has letters, numbers, and special keys. Press keys to type words. The spacebar adds spaces between words. The enter key starts new lines. Practice typing your name slowly and carefully." },
  { id: 7, lessonId: 7, text: "Files are digital documents stored on the computer. Folders help organise files like drawers in a filing cabinet. Keep your files organised so you can find them easily when you need them." },
  { id: 8, lessonId: 8, text: "Icons represent programs and files on the desktop. Double click icons to open them. The taskbar shows running programs at the bottom. The start button opens a menu with all your programs." },
  { id: 9, lessonId: 9, text: "The internet connects computers all around the world. Websites provide information, videos, and services. Use a web browser to visit websites by typing addresses in the address bar at the top." },
  { id: 10, lessonId: 10, text: "Web browsers like Chrome and Edge let you visit websites. Type addresses in the address bar or search using Google. Click links to go to other pages. Use bookmarks to save your favourite sites." },
  { id: 11, lessonId: 11, text: "Search engines help you find information online. Type short keywords in the search box and press enter. Look at the results and click helpful links. Check multiple sources to verify what you find." },
  { id: 12, lessonId: 12, text: "Email sends messages instantly over the internet. Click compose and fill in the address and subject. Write your message clearly and click send. Check your inbox regularly for new messages." }
];

const ACHIEVEMENTS = [
  { id: 1, title: "First Steps",     description: "Complete your very first lesson.",         icon: "🎉" },
  { id: 2, title: "Quiz Master",     description: "Score 100% on any quiz.",                  icon: "🏆" },
  { id: 3, title: "Halfway There",   description: "Complete 6 lessons.",                       icon: "✨" },
  { id: 4, title: "Course Complete", description: "Complete all 12 lessons.",                  icon: "🎓" },
  { id: 5, title: "Speed Typer",     description: "Reach 30 WPM in a typing test.",            icon: "⚡" },
  { id: 6, title: "Accuracy Star",   description: "Achieve 95% accuracy in typing.",           icon: "⭐" }
];

function getAllLessons() {
  var custom = [];
  try { custom = JSON.parse(localStorage.getItem('dlc_custom_lessons') || '[]'); } catch(e) {}
  return LESSONS.concat(custom);
}

function getLessonById(id) {
  var all = getAllLessons();
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

const MODULES = [...new Set(LESSONS.map(l => l.module))];
