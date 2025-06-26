function toggleReplies(chatId) {
    const box = document.getElementById("replies-" + chatId);
    const button = document.querySelector(`button[onclick="toggleReplies('${chatId}')"]`);

    if (box.style.display === "none") {
        box.style.display = "block";
        button.innerText = "Hide Replies";
        } else {
                box.style.display = "none";
                const count = box.querySelectorAll('.reply').length;
                button.innerText = `Show Replies (${count})`;
        }   
}

        
function toggleReplyForm(chatId) {
    const replyDiv = document.getElementById(`reply-form-${chatId}`);
    if (replyDiv.style.display === 'none') {
        replyDiv.style.display = 'block';
    } else {
        replyDiv.style.display = 'none';
    }
}
