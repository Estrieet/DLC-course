/* ============================================================
   data.js - All lesson, typing and achievement data
   Digital Literacy Course - GitHub Pages Edition
   No npm | No React | Vanilla JS + WASM + IndexedDB
   ============================================================ */

const LESSONS = [
  {
    id: 1, title: "What is a Computer?",
    module: "Computer Basics", level: 1,
    content: "A computer is like a smart helper that can do many tasks. Imagine it as a magical box that can store information, show pictures, play music, and help you learn new things. Computers come in different sizes — some are big like desks, some are small like phones, and some are tiny like watches. The main parts of a computer are the screen (where you see things), the keyboard (where you type words), and the mouse (a small device you move to point at things on the screen). Computers need electricity to work, just like a light bulb. They can remember things even when turned off, and they can connect to the internet to talk to other computers around the world. Learning to use a computer is like learning to read and write — it opens up a whole new world of possibilities!",
    summary: ["Computers come in many shapes and sizes — desktops, laptops, tablets, and phones.", "The main parts are the screen, keyboard, and mouse — all needing electricity to run.", "Computers can store information, show content, and connect to the internet."],
    homework: { id: 1, question: "Think of three things you could use a computer for in your daily life. Write them down and tell someone why each one would be helpful.", completed: false },
    quiz: { id: 1, questions: [
      { id: 1, question: "What is a computer?", options: ["A magical box that helps with tasks", "A type of food", "A musical instrument"], answer: 0 },
      { id: 2, question: "Which of these is NOT a part of a computer?", options: ["Screen", "Keyboard", "Ethernet Switch"], answer: 2 },
      { id: 3, question: "What do computers need to work?", options: ["Water", "Electricity", "Food"], answer: 1 }
    ]}
  },
  {
    id: 2, title: "Computer Hardware",
    module: "Computer Basics", level: 1,
    content: "Hardware is the name for all the physical parts of a computer that you can touch. The most important part is the computer tower or box — this is where the brain lives. Inside is the CPU (Central Processing Unit), which is the computer's brain that does all the thinking. There is also RAM (memory) — like the computer's short-term memory for what it is working on now. The hard drive stores files, photos and programs even when turned off. The screen (monitor) shows you what the computer is doing. The keyboard lets you type letters and numbers. The mouse helps you point and click on things. Some computers have speakers, microphones and cameras. All these parts work together to make the computer useful.",
    summary: ["Hardware is every physical part of a computer you can touch and see.", "The CPU is the brain, RAM is short-term memory, and the hard drive stores files long-term.", "All hardware parts must work together to make the computer useful."],
    homework: { id: 2, question: "Look at a computer (or ask someone to show you one). Try to identify the screen, keyboard, mouse, and computer box. Draw a simple picture showing where each part is.", completed: false },
    quiz: { id: 2, questions: [
      { id: 1, question: "What is hardware?", options: ["The physical parts you can touch", "Invisible computer programs", "Computer games"], answer: 0 },
      { id: 2, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Cool Processing Unit"], answer: 0 },
      { id: 3, question: "Which part shows you what the computer is doing?", options: ["Keyboard", "Mouse", "Screen (Monitor)"], answer: 2 }
    ]}
  },
  {
    id: 3, title: "Computer Software",
    module: "Computer Basics", level: 1,
    content: "Software is the name for all the programs and instructions that tell the computer what to do. Without software, hardware is just a bunch of useless metal and plastic. The most important software is the operating system — this is like the computer's manager that controls everything. Windows, macOS, and Linux are examples of operating systems. They provide basic tools like showing the desktop, opening windows, and managing files. Then there are application programs that do specific jobs. Word processors like Microsoft Word help you write letters and documents. Web browsers like Google Chrome let you visit websites. Email programs help you send and receive messages.",
    summary: ["Software is programs and instructions that tell hardware what to do.", "The operating system (Windows, macOS, Linux) is the computer's main manager.", "Applications like browsers, word processors, and games are all types of software."],
    homework: { id: 3, question: "Make a list of 5 different types of software you think people use. For each one, write what it helps people do.", completed: false },
    quiz: { id: 3, questions: [
      { id: 1, question: "What is software?", options: ["Physical computer parts", "Programs that tell the computer what to do", "Computer furniture"], answer: 1 },
      { id: 2, question: "What is an operating system?", options: ["A type of game", "The computer's manager software", "A web browser"], answer: 1 },
      { id: 3, question: "Which of these is an operating system?", options: ["Microsoft Word", "Windows", "Google Chrome"], answer: 1 }
    ]}
  },
  {
    id: 4, title: "Turning On and Off a Computer",
    module: "Computer Basics", level: 1,
    content: "Learning to properly start and stop a computer is very important. To turn on a computer, look for the power button. On a desktop computer, it is usually on the front of the tower box. On a laptop, it is often above the keyboard. Press this button once and wait for the computer to start up. You will see lights come on and the screen will show the operating system loading. This might take a minute or two. Never turn off the power while the computer is working — this can cause problems. To turn off properly, click the Start button, then click Shut down or Power off. Wait for the computer to completely shut down before unplugging it.",
    summary: ["Press the power button once and wait for the operating system to finish loading.", "Always shut down using the Start menu — never just unplug the computer.", "Hold the power button for 5-10 seconds only in an emergency when it freezes."],
    homework: { id: 4, question: "Practice turning on and off a computer safely. Ask someone to watch you do it correctly.", completed: false },
    quiz: { id: 4, questions: [
      { id: 1, question: "Where is the power button usually on a desktop?", options: ["On the screen", "On the front of the tower", "On the mouse"], answer: 1 },
      { id: 2, question: "What should you do if a computer freezes?", options: ["Shake it", "Hold power button for 5-10 seconds", "Pour water on it"], answer: 1 },
      { id: 3, question: "Why is it important to shut down properly?", options: ["To save electricity", "To protect your work and computer health", "To make it start faster"], answer: 1 }
    ]}
  },
  {
    id: 5, title: "Using the Mouse",
    module: "Computer Basics", level: 1,
    content: "The mouse is your main tool for pointing and clicking on things on the computer screen. Hold the mouse gently in your hand. Move the mouse on a flat surface and watch the pointer (usually an arrow) move on screen. The left button is the most important — you use it to select things and open programs. Click means press and release the left button quickly. Double-click means click twice quickly to open something. Right-click means press the right button to see a menu of options. The scroll wheel in the middle lets you scroll up and down on pages. Practice moving the mouse smoothly and clicking accurately. If you have trouble, try using a mouse pad for better control.",
    summary: ["Move the mouse on a flat surface to control the on-screen pointer.", "Left-click selects, double-click opens, and right-click shows extra options.", "The scroll wheel lets you move up and down through pages without using a scroll bar."],
    homework: { id: 5, question: "Practice moving the mouse pointer around the screen. Try clicking on different icons and see what happens. Practice double-clicking too.", completed: false },
    quiz: { id: 5, questions: [
      { id: 1, question: "What is the most important mouse button?", options: ["Right button", "Middle button", "Left button"], answer: 2 },
      { id: 2, question: "What does double-click mean?", options: ["Click once hard", "Click twice quickly", "Click and hold"], answer: 1 },
      { id: 3, question: "What does the scroll wheel do?", options: ["Makes the mouse faster", "Lets you scroll up and down", "Changes the pointer shape"], answer: 1 }
    ]}
  },
  {
    id: 6, title: "Using the Keyboard",
    module: "Computer Basics", level: 1,
    content: "The keyboard is how you type letters, numbers, and symbols into the computer. Each key has a letter or symbol on it. Press keys one at a time to type. The spacebar (the long bar at the bottom) adds spaces between words. The Enter key starts a new line or confirms actions. The Shift key makes capital letters and symbols. The Backspace key deletes letters behind the cursor. The Delete key deletes letters in front. Arrow keys move the cursor around. Practice typing your name, then simple sentences. Do not worry about speed at first — accuracy is more important. There are even games and programs that can help you learn typing faster.",
    summary: ["The spacebar adds spaces, Enter confirms actions, and Backspace deletes to the left.", "Hold Shift to type capital letters or special characters like ! @ # $.", "Keyboard shortcuts such as Ctrl+C (copy) and Ctrl+V (paste) save a lot of time."],
    homework: { id: 6, question: "Type your full name using the keyboard. Then type a simple sentence like 'I am learning about computers.'", completed: false },
    quiz: { id: 6, questions: [
      { id: 1, question: "Which key adds spaces between words?", options: ["Enter", "Spacebar", "Backspace"], answer: 1 },
      { id: 2, question: "Which key makes capital letters?", options: ["Ctrl", "Shift", "Alt"], answer: 1 },
      { id: 3, question: "What does the Backspace key do?", options: ["Adds spaces", "Deletes letters behind the cursor", "Starts a new line"], answer: 1 }
    ]}
  },
  {
    id: 7, title: "Understanding Files and Folders",
    module: "Computer Basics", level: 2,
    content: "Files are like digital papers that store your information. Photos, documents, music, and programs are all stored as files. Folders are like drawers that help you organise your files. You can put files into folders, and folders into other folders. This is called a folder structure. On Windows computers, you can see your files and folders in File Explorer. The Desktop is a special folder where you can put shortcuts to your favourite files and programs. Documents folder is for your word processing files. Downloads folder is where files go when you download them from the internet. It is important to keep your files organised so you can find them easily. Deleting files moves them to the Recycle Bin where you can get them back.",
    summary: ["Files are digital documents — photos, music, and text — stored on your computer.", "Folders organise files into groups, just like drawers in a filing cabinet.", "Deleting a file moves it to the Recycle Bin first, so you can restore it if needed."],
    homework: { id: 7, question: "Open File Explorer and look at the different folders. Create a new folder and name it 'My Computer Practice'. Put a note or drawing inside it.", completed: false },
    quiz: { id: 7, questions: [
      { id: 1, question: "What is a file?", options: ["A type of folder", "A digital document that stores information", "A computer program"], answer: 1 },
      { id: 2, question: "What are folders used for?", options: ["Storing electricity", "Organising files", "Playing music"], answer: 1 },
      { id: 3, question: "Where do downloaded files usually go?", options: ["Desktop", "Documents", "Downloads folder"], answer: 2 }
    ]}
  },
  {
    id: 8, title: "The Desktop and Icons",
    module: "Computer Basics", level: 2,
    content: "The desktop is the main screen you see when you start your computer. It is like a digital desk where you can put shortcuts to your favourite programs and files. Icons are the little pictures that represent programs, files, and folders. Double-clicking an icon opens that program or file. You can move icons around by dragging them. Right-clicking an icon shows a menu with options. The taskbar at the bottom shows open programs and the Start button. The Start button opens a menu where you can find all your programs. You can add shortcuts to the desktop by right-clicking a program. The Recycle Bin icon holds deleted files. Double-click it to see what is inside and restore files if needed.",
    summary: ["The desktop is your computer's main screen and home for shortcuts called icons.", "Double-click an icon to open it; right-click to see a menu of options.", "The taskbar at the bottom shows open programs and the Start button for all apps."],
    homework: { id: 8, question: "Look at your desktop. Count how many icons are there. Try double-clicking one to see what it does. Try right-clicking one to see the menu.", completed: false },
    quiz: { id: 8, questions: [
      { id: 1, question: "What is the desktop?", options: ["A type of computer", "The main screen you see when starting", "A computer program"], answer: 1 },
      { id: 2, question: "How do you open a program from an icon?", options: ["Right-click it", "Single-click it", "Double-click it"], answer: 2 },
      { id: 3, question: "What does the Start button do?", options: ["Turns off the computer", "Opens a menu with programs", "Opens the internet"], answer: 1 }
    ]}
  },
  {
    id: 9, title: "What is the Internet?",
    module: "Internet Basics", level: 2,
    content: "The internet is like a huge network that connects computers all around the world. It is like an invisible web that lets computers talk to each other and share information. Websites are like digital stores or libraries where you can find information, watch videos, listen to music, and buy things. The internet uses special addresses called URLs to find websites. You need a web browser (like Google Chrome or Microsoft Edge) to visit websites. The internet works through wires, cables under the ground, and wireless signals. The internet is always changing and growing. You can use the internet to learn, communicate, shop, and have fun. But it is important to be careful online and not share personal information with strangers.",
    summary: ["The internet is a massive global network connecting billions of computers worldwide.", "Websites have unique addresses called URLs that your browser uses to find them.", "Use it safely — never share personal information with strangers online."],
    homework: { id: 9, question: "Think of three websites you know about or would like to visit. Write down what you think you would find on each one.", completed: false },
    quiz: { id: 9, questions: [
      { id: 1, question: "What is the internet?", options: ["A type of computer", "A network connecting computers worldwide", "A computer program"], answer: 1 },
      { id: 2, question: "What do you need to visit websites?", options: ["A printer", "A web browser", "A mouse"], answer: 1 },
      { id: 3, question: "What is a URL?", options: ["A type of food", "A website address", "A computer part"], answer: 1 }
    ]}
  },
  {
    id: 10, title: "Using a Web Browser",
    module: "Internet Basics", level: 2,
    content: "A web browser is a program that lets you visit websites and view web pages. Popular browsers include Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari. To use a browser, type a website address (URL) in the address bar at the top and press Enter. You can also search for websites using a search engine like Google. The browser shows web pages with text, pictures, and videos. You can click links (underlined text or buttons) to go to other pages. The back button takes you to the previous page. The refresh button reloads the page. You can open multiple tabs to view different websites at once. Bookmarks let you save favourite websites for quick access later.",
    summary: ["A web browser lets you visit websites by typing a URL in the address bar.", "Open multiple tabs to view different pages at the same time.", "Bookmarks save favourite sites so you can return to them with a single click."],
    homework: { id: 10, question: "Open a web browser. Type in a website address you know (like google.com) and visit it. Try clicking on a link to go to another page.", completed: false },
    quiz: { id: 10, questions: [
      { id: 1, question: "What is a web browser used for?", options: ["Playing games", "Visiting websites", "Writing documents"], answer: 1 },
      { id: 2, question: "Where do you type website addresses?", options: ["In the search bar", "In the address bar", "In the menu"], answer: 1 },
      { id: 3, question: "What does the back button do?", options: ["Goes to the next page", "Reloads the page", "Takes you to the previous page"], answer: 2 }
    ]}
  },
  {
    id: 11, title: "Searching the Internet",
    module: "Internet Basics", level: 2,
    content: "Search engines help you find information on the internet. Google is the most popular search engine. To search, go to google.com and type your question or keywords in the search box, then press Enter or click the search button. The search engine will show you web pages that match what you typed. Look at the results and click on ones that seem helpful. You can use quotes around words to search for exact phrases. Not all information online is true, so be careful and check multiple sources. You can use advanced search features to find more specific results. Learning to search effectively is very useful and helps you learn new things.",
    summary: ["Type short keywords into a search engine like Google to find information.", "The first results are often ads — scroll past them for more reliable results.", "Not everything online is true — always verify with at least two trusted sources."],
    homework: { id: 11, question: "Go to Google and search for something you are interested in learning about. Click on one of the results and read a little bit.", completed: false },
    quiz: { id: 11, questions: [
      { id: 1, question: "What is the most popular search engine?", options: ["Facebook", "Google", "YouTube"], answer: 1 },
      { id: 2, question: "How do you search on Google?", options: ["Type in the address bar", "Type in the search box and press Enter", "Click random links"], answer: 1 },
      { id: 3, question: "Why should you check multiple sources?", options: ["To waste time", "Because not all information online is true", "To find more pictures"], answer: 1 }
    ]}
  },
  {
    id: 12, title: "Email Basics",
    module: "Communication", level: 2,
    content: "Email is like digital mail that you can send instantly to anyone with an internet connection. You need an email address to send and receive emails. Popular email services include Gmail (from Google), Outlook (from Microsoft), and Yahoo Mail. To send an email, click Compose or New Email, type the person's email address in the To field, add a subject, write your message, and click Send. Emails can include attachments like photos or documents. You can organise emails into folders. The inbox shows new emails. Email addresses look like this: yourname@example.com. Never share your password with anyone. Use strong passwords for security. Email is great for staying in touch with family and friends.",
    summary: ["Email is instant digital mail — you need an address in the format name@service.com.", "Click Compose, fill in the To and Subject fields, write your message, then hit Send.", "Never share your password and use two-factor authentication for extra security."],
    homework: { id: 12, question: "If you have an email account, practice sending a simple email to yourself. If not, ask someone to show you how email works.", completed: false },
    quiz: { id: 12, questions: [
      { id: 1, question: "What is email?", options: ["A type of computer", "Digital mail sent instantly over the internet", "A search engine"], answer: 1 },
      { id: 2, question: "What do you need to use email?", options: ["A printer", "An email address", "A mouse"], answer: 1 },
      { id: 3, question: "What should you NEVER share?", options: ["Your email address", "Your password", "Your favourite colour"], answer: 1 }
    ]}
  }
];

const TYPING_TEXTS = [
  { id: 1, lessonId: 1, text: "A computer is a helpful electronic device that can store information, show pictures, and help you learn new things. Computers come in different sizes from small phones to large desks." },
  { id: 2, lessonId: 2, text: "Hardware includes the physical parts of a computer that you can touch. The main parts are the screen for viewing, keyboard for typing, mouse for pointing, and the computer box that holds the brain." },
  { id: 3, lessonId: 3, text: "Software is the programs that tell the computer what to do. The operating system manages everything while applications like word processors and games perform specific tasks." },
  { id: 4, lessonId: 4, text: "To turn on a computer safely, press the power button and wait for it to start. Always shut down properly by clicking the start button and selecting shut down to protect your work." },
  { id: 5, lessonId: 5, text: "The mouse helps you point and click on items on the screen. Use the left button for most actions. Practice moving the mouse smoothly and clicking accurately on targets." },
  { id: 6, lessonId: 6, text: "The keyboard has letters, numbers, and special keys. Press keys to type words. The spacebar adds spaces between words. The enter key starts new lines. Practice typing your name slowly and accurately." },
  { id: 7, lessonId: 7, text: "Files are digital documents stored on the computer. Folders help organise files like drawers. The desktop shows shortcuts to programs. Keep your files organised so you can find them easily." },
  { id: 8, lessonId: 8, text: "Icons represent programs and files on the desktop. Double-click icons to open them. The taskbar shows running programs. The start button opens a menu with all available programs." },
  { id: 9, lessonId: 9, text: "The internet connects computers around the world. Websites provide information, videos, and services. Use a web browser to visit websites by typing addresses or searching for topics you want to learn about." },
  { id: 10, lessonId: 10, text: "Web browsers like Chrome and Edge let you visit websites. Type addresses in the address bar or search using Google. Click links to go to other pages. Use bookmarks to save your favourite sites." },
  { id: 11, lessonId: 11, text: "Search engines help find information online. Type questions or keywords in the search box. Look at results and click helpful links. Check multiple sources to verify information you find." },
  { id: 12, lessonId: 12, text: "Email sends messages instantly over the internet. Create messages with subject and body. Add attachments like photos. Check your inbox regularly. Use strong passwords to protect your account." }
];

const ACHIEVEMENTS = [
  { id: 1, title: "First Steps", description: "Complete your very first lesson.", icon: "🎉" },
  { id: 2, title: "Quiz Master", description: "Score 100% on any quiz.", icon: "🏆" },
  { id: 3, title: "Halfway There", description: "Complete 6 lessons.", icon: "✨" },
  { id: 4, title: "Course Complete", description: "Complete all 12 lessons.", icon: "🎓" },
  { id: 5, title: "Speed Typer", description: "Reach 30 WPM in a typing test.", icon: "⚡" },
  { id: 6, title: "Accuracy Star", description: "Achieve 95% accuracy in typing.", icon: "⭐" }
];

const MODULES = [...new Set(LESSONS.map(l => l.module))];
