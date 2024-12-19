import { createClient } from "@supabase/supabase-js";

/*
async function loadMessages(messageWindow) {
  const data = await getMessages(sessionStorage.getItem("chat_room"));
  messageWindow.innerHTML = "";

  data.forEach((e) => {
    messageWindow.innerHTML += `<div class=${
      e.is_client ? "sender" : "recieved"
    }><span>${e.message}</span></div>`;
  });
}
*/

const supabase = createClient(
  "https://ljsycmobqargkvvhrtgz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3ljbW9icWFyZ2t2dmhydGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNTIyNzUsImV4cCI6MjA0MjcyODI3NX0.BDIi-y7w_XuorUwQDxgr5sWmWntdYxelHzl-dZ5wcIk"
);

try {
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
      (p) => {
        messageWindow.innerHTML += `<div class=${
          p.new.is_client ? "sender" : "recieved"
        }><span>${p.new.message}</span></div>`;
        messageWindow.scrollTop = messageWindow.scrollHeight;
      }
    )
    .subscribe();
} catch (err) {
  console.log(err);
}

try {
  await loadMessages(messageWindow);
} catch (err) {
  console.log(err);
}
