(function(){

    //user Data
    const script = document.currentScript;

    const userId = script?.dataset?.userId

    const theme = "dark"

    let assistantConfig = null

    // load CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "http://localhost:5173/assistant.css"
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
                src = "http://localhost:5173/mic.svg"
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
    src="http://localhost:5173/logo.png"
    alt="logo"
    />`;
    document.body.appendChild(button)
    //toggle popup

    let open = false
    button.onclick = ()=>{
        open = !open;
        popup.style.display = open ? "flex":"none";
    }

    // load Assistant

    const loadAssistant = async ()=>{
        try {
            const res = await fetch(`http://localhost:8000/api/assitant/config/${userId}`)
            const data = await res.json()
            
            if(data)
            {
                assistantConfig = data.user
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

})();