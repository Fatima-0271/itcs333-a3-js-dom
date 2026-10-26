(function () {
  "use strict";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const errorEl = document.getElementById("error-msg");
  const counter = document.getElementById("counter");

  let currentFilter = "all";

  function applyFilter() {
    for (let i = 0; i < list.children.length; i++) {
      const li = list.children[i];
      const done = li.classList.contains("completed");
      let show = true;

      if (currentFilter == "active") show = !done;
      else if (currentFilter == "done") show = done;

      li.style.display = show ? "" : "none";
    }
  }

  function updateCounter() {
    let left = 0;
    for (let i = 0; i < list.children.length; i++) {
      if (!list.children[i].classList.contains("completed")) left++;
    }
    counter.textContent = left + " item(s) left";
  }

  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem() {
    const text = input.value.trim();

    if (text == "") {
      errorEl.classList.remove("hidden");
      errorEl.style.display = "block";
      return;
    }
    errorEl.classList.add("hidden");
    errorEl.style.display = "none";

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "Delete";

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    input.value = "";
    refresh();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addItem();
  });

  list.addEventListener("click", function (e) {
    let li = e.target;
    while (li != null && li != list && li.tagName != "LI") li = li.parentNode;
    if (li == null || li == list) return;
    if (e.target.classList.contains("delete-btn")) list.removeChild(li);
    else li.classList.toggle("completed");
    refresh();
  });

  document.getElementById("filter-all").addEventListener("click", function () {
    currentFilter = "all";
    refresh();
  });
  document
    .getElementById("filter-active")
    .addEventListener("click", function () {
      currentFilter = "active";
      refresh();
    });
  document.getElementById("filter-done").addEventListener("click", function () {
    currentFilter = "done";
    refresh();
  });

  refresh();
})();
