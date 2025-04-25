console.log("NevoMail Content script loaded");


function findComposeToolbar() {
    const selectors =[
        '.aDh', // Gmail's compose window toolbar
        '.btC', // Gmail's compose window toolbar (alternative class)
        '[role="toolbar"]', // General dialog role for compose windows
        '.gU.UP' // Gmail's compose window toolbar (alternative class)
    ];
    for (const selector of selectors)
    {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}

function getEmailContent() {
    const selectors =[
        '.a3s.aiL', // Gmail's compose window toolbar
        '.h7', // Gmail's compose window toolbar (alternative class)
        'gmail_quote', // General dialog role for compose windows
        '[role="presentation"]' // Gmail's compose window toolbar (alternative class)
    ];
    for (const selector of selectors)
    {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
        return '';
    }
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip','Generate AI Reply');
    return button;
}

function injectButton() {
  const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) {
        existingButton.remove();
    }

    const toolbar = findComposeToolbar();
    if (!toolbar){
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI Button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try{
            button.innerHTML ='Generating...';
            button.disabled = true;

            const emailContent = getEmailContent(); // Function to get the email content
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone:"professional",
                })
            });

            if (!response.ok) {
                throw new Error('API Request failed');
            }
            const generatedReply = await response.text();
            const composeBox =  document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error("Compose box not found");
            }
        }catch (error){
            console.error(error);
            alert("Failed to generate reply:");
        }
        finally{
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

    const composeWindow = document.querySelector('.aDh,.btC,[role="dialog"]');
    if (composeWindow) {
        const button = document.createElement('button');
        button.textContent = 'NevoMail Button';
        button.style.position = 'relative';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '1000';
        button.onclick = () => alert('NevoMail Button Clicked!');
        composeWindow.appendChild(button);
    }

const observer = new MutationObserver((mutations) => { 
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh,.btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'))
        );
        if(hasComposeElements){
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});