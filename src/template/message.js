export function message() {
  const message = document.createElement("div");
  message.classList.add("messageButton");

  message.innerHTML = `<i class="ri-chat-1-line"></i>`;

  return message;
}

export function initMessage() {}
