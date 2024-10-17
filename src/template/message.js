import { getMessages, postMessage } from "../helpers";
import { createClient } from "@supabase/supabase-js";

export function message() {
  const message = document.createElement("div");
  message.classList.add("messageContainer");

  message.innerHTML = `
  <div class="messageButton"> 
  <i class="ri-chat-1-line"></i>
  </div>
  <div class="messageBox hidden"> 
  <div class="messageWindow"></div>
  <textarea id="messageBox" placeholder="Enter your message"></textarea>
  </div>`;

  return message;
}

async function loadMessages(messageWindow) {
  const data = await getMessages(sessionStorage.getItem("chat_room"));
  messageWindow.innerHTML = "";

  data.forEach((e) => {
    messageWindow.innerHTML += `<div class=${
      e.is_client ? "sender" : "recieved"
    }><span>${e.message}</span></div>`;
  });
}

export async function initMessage() {
  const supabase = createClient(
    "https://ljsycmobqargkvvhrtgz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3ljbW9icWFyZ2t2dmhydGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNTIyNzUsImV4cCI6MjA0MjcyODI3NX0.BDIi-y7w_XuorUwQDxgr5sWmWntdYxelHzl-dZ5wcIk"
  );

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_room=eq.${sessionStorage.getItem("chat_room")}`,
      },
      (payload) => console.log(payload)
    )
    .subscribe();

  const messageButton = document.querySelector(".ri-chat-1-line");
  const messageBox = document.querySelector(".messageBox");
  const messageBoxText = document.querySelector("#messageBox");
  const messageWindow = document.querySelector(".messageWindow");

  await loadMessages(messageWindow);

  messageButton.addEventListener("click", () => {
    if (messageBox.classList.contains("hidden")) {
      messageBox.classList.remove("hidden");
    } else {
      messageBox.classList.add("hidden");
    }
  });

  messageBoxText.addEventListener("keydown", async (e) => {
    if (e.keyCode == 13) {
      if (messageBoxText.value == "") {
        e.preventDefault();
        messageBoxText.value = "";

        return false;
      }
      e.preventDefault();
      await postMessage(messageBoxText.value);
      await loadMessages(messageWindow);
      messageBoxText.value = "";
      messageWindow.scrollTop = messageWindow.scrollHeight;

      return false;
    }
  });
}
