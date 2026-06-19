(function(){

    //user Data
    const script = document.currentScript;

    const userId = script?.dataset?.userId

    const theme = "dark"

    let assistantConfig = null

    // load CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://riva-ai-x2ya.onrender.com/assistant.css"
    document.head.appendChild(link)

    // Create PopUp

    const popup = document.createElement("div")

    popup.className = `riva-popup theme-${theme}`

    popup.innerHTML = `
    <div class = "riva-overlay"></div>

    <div class = "riva-content">
        <div class = "riva-top">
            <div class="riva-orb-wrap" >
                <div class="riva-orb-glow"></div>
                <div class="riva-orb"></div>
            </div>

            <h2 class="riva-title">
            Hello! I'm Riva AI
            </h2>

            <p class="riva-sub" >
            Your smart voice assistant.
            <br/>
            Ask anything about your website.
            </p>

            <div class="riva-status">
            Tap button to Speak
            </div>

            <div class="riva-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </div>

            // User Text
            <div class="riva-user-text">
            </div>

            // AI Text
            <div class="riva-ai-text" >
            </div>
        </div>

        <div class="riva-bottom">
            <button class="riva-mic">
                <img
                src = "https://riva-ai-x2ya.onrender.com/mic.svg"
                alt = "mic"
                class = "shifra-mic-icon"/>
            </button>
        </div>
    </div>
    `;

    document.body.appendChild(popup);

    // floating Button

    const button = document.createElement("button")

    button.className = `riva-btn theme-${theme}`

    button.innerHTML = `
    <img
    src="https://riva-ai-x2ya.onrender.com/logo.png"
    alt="logo"
    />`;
    document.body.appendChild(button)
    //toggle popup

    let open = false
    button.onclick = ()=>{
        open = !open;
        popup.style.display = open ? "flex":"none";
    }

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const headerDragArea = popup.querySelector(".riva-top");

    headerDragArea.style.cursor = "grab";

    headerDragArea.addEventListener("mousedown", (e) => {
        isDragging = true;

        const rect = popup.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        popup.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;

        popup.style.right = "auto";
        popup.style.bottom = "auto";
        popup.style.position = "fixed";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        popup.style.transition = "0.2s ease";
    });
    // load Assistant

    const loadAssistant = async ()=>{
        try {
            const res = await fetch(`https://riva-ai-server.onrender.com/api/assistant/config/${userId}`)
            const data = await res.json()
            
            if(data)
            {
                assistantConfig = data.user
                applyConfig()
            }
        } catch (error) {
            console.log("Assistant load Error:",error);
        }
    }

    const applyConfig = ()=>{
        if(!assistantConfig) return;
        popup.className = `riva-popup theme-${assistantConfig.theme}`
        button.className = `riva-btn theme-${assistantConfig.theme}`

        const title = popup.querySelector(".riva-title")
        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;
        const subTitle = popup.querySelector(".riva-sub")
        subTitle.innerHTML =`
        Welcome to
        ${assistantConfig.businessName}.
        <br/>
        Ask anything about your website.
        `;
    }
    loadAssistant();

    //Element

    const status = popup.querySelector(".riva-status");
    const wave = popup.querySelector(".riva-wave");
    const userText = popup.querySelector(".riva-user-text");
    const aiText = popup.querySelector(".riva-ai-text");
    const mic = popup.querySelector(".riva-mic");

    //text to speech

    const speak = (text)=>{
        window.speechSynthesis.cancel();
        //show ai response
        aiText.innerText = text;
        status.innerText = "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = "hi-IN";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        // Voice end
        speech.onend = ()=>{
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
        };
        // start speaking
        window.speechSynthesis.speak(speech);
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if(SpeechRecognition){
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        mic.onclick = ()=>{
            wave.style.opacity = "1";
            status.innerText = "Listening...";
            userText.innerText = "";
            aiText.innerText = "";
            recognition.start();
        }
        recognition.onresult = (e)=>{
            const text = e.results[0][0].transcript

            userText.innerText = "You: " + text;
            recognition.stop();

            setTimeout(async ()=>{
                try {
                    status.innerText = "Thinking...";

                    const res = await fetch("https://riva-ai-server.onrender.com/api/assistant/ask",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({
                            message:text,
                            userId
                        })
                    })

                    const data = await res.json()
                    console.log(data)
                    if(data.success){
                        if(data.action === "navigate"){
                            speak(data.response)

                            setTimeout(()=>{
                                window.location.href = data.path
                            },1500)
                        }
                        else{
                            speak(data.aiResponse)
                        }
                    }
                    else{
                        speak("Response Error, Please Check your plan")
                    }
                } catch (error) {
                    console.log(error)
                    speak("AI Server Error")
                }
            },600)
        };
        recognition.onerror = ()=>{
            status.innerText = "Tap button to speak";
            wave.style.opacity = "0";
        }
    }
    else{
        status.innerText = "Speech Recognition not supported";
    }


})();
