(function () {
  "use strict";

  var catalog = window.HODGES_CATALOG || [];
  var COLUMNS = 4;
  // Always leave at least one empty drawer for the next hobby, and fill out the last row.
  var DRAWER_COUNT = Math.ceil((catalog.length + 1) / COLUMNS) * COLUMNS;
  var drawersEl = document.getElementById("drawers");
  var detailEl = document.getElementById("drawer-detail");
  if (!drawersEl || !detailEl) return;

  var STATUS_TEXT = {
    live: "Open now",
    building: "Being built",
    planned: "Planned"
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderDrawers() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < DRAWER_COUNT; i++) {
      var hobby = catalog[i];
      var li = el("li", "drawer-slot");
      if (hobby) {
        var btn = el("button", "drawer drawer-" + hobby.status);
        btn.type = "button";
        btn.id = "drawer-" + hobby.id;
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-controls", "drawer-detail");
        btn.dataset.id = hobby.id;

        var card = el("span", "drawer-label");
        card.appendChild(el("span", "drawer-label-text", hobby.label));
        btn.appendChild(card);
        btn.appendChild(el("span", "drawer-status", STATUS_TEXT[hobby.status] || ""));
        btn.appendChild(el("span", "drawer-pull"));
        btn.setAttribute("aria-label", hobby.name + ", " + (STATUS_TEXT[hobby.status] || ""));
        btn.addEventListener("click", onSelect);
        li.appendChild(btn);
      } else {
        var empty = el("div", "drawer drawer-empty");
        empty.setAttribute("aria-hidden", "true");
        var emptyCard = el("span", "drawer-label");
        emptyCard.appendChild(el("span", "drawer-label-text", ""));
        empty.appendChild(emptyCard);
        empty.appendChild(el("span", "drawer-pull"));
        li.appendChild(empty);
      }
      frag.appendChild(li);
    }
    drawersEl.appendChild(frag);
  }

  function findHobby(id) {
    for (var i = 0; i < catalog.length; i++) {
      if (catalog[i].id === id) return catalog[i];
    }
    return null;
  }

  function renderDetail(hobby) {
    detailEl.textContent = "";
    detailEl.classList.remove("is-pulled");
    if (!hobby) {
      detailEl.appendChild(el("p", "bench-note", "Pull out a drawer and its project lands here on the bench."));
      return;
    }

    // The pulled-out drawer, seen from above: felt liner, project card, parts tags, drawer front.
    var tray = el("div", "tray");
    var liner = el("div", "tray-liner");
    var card = el("div", "project-card");

    var head = el("div", "detail-head");
    head.appendChild(el("h3", "detail-title", hobby.name));
    head.appendChild(el("span", "tag tag-" + hobby.status, STATUS_TEXT[hobby.status] || ""));
    card.appendChild(head);
    card.appendChild(el("p", "detail-summary", hobby.summary));
    liner.appendChild(card);

    if (hobby.examples && hobby.examples.length) {
      var parts = el("div", "parts");
      var partsId = "parts-" + hobby.id;
      var partsHeading = el("p", "parts-heading", "What you'll plan");
      partsHeading.id = partsId;
      parts.appendChild(partsHeading);
      var list = el("ul", "detail-examples");
      list.setAttribute("aria-labelledby", partsId);
      hobby.examples.forEach(function (ex) {
        list.appendChild(el("li", null, ex));
      });
      parts.appendChild(list);
      liner.appendChild(parts);
    }

    tray.appendChild(liner);
    var front = el("div", "tray-front");
    front.setAttribute("aria-hidden", "true");
    var frontLabel = el("span", "drawer-label");
    frontLabel.appendChild(el("span", "drawer-label-text", hobby.label));
    front.appendChild(frontLabel);
    front.appendChild(el("span", "drawer-pull"));
    tray.appendChild(front);
    detailEl.appendChild(tray);

    // Restart the pull-out motion each time a drawer is opened.
    void detailEl.offsetWidth;
    detailEl.classList.add("is-pulled");

    var foot = el("p", "detail-foot");
    if (hobby.app && hobby.status === "live" && hobby.app.url) {
      var link = el("a", "btn btn-primary", "Open " + hobby.app.name);
      link.href = hobby.app.url;
      foot.appendChild(link);
    } else if (hobby.app) {
      foot.textContent = hobby.app.name + ": " + hobby.app.note;
    } else {
      foot.textContent = "No planner yet. This one is on the list.";
    }
    card.appendChild(foot);
  }

  function select(id, updateHash) {
    var buttons = drawersEl.querySelectorAll("button.drawer");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].dataset.id === id;
      buttons[i].setAttribute("aria-pressed", on ? "true" : "false");
      buttons[i].classList.toggle("is-open", on);
    }
    renderDetail(findHobby(id));
    if (updateHash && history.replaceState) {
      history.replaceState(null, "", "#hobby-" + id);
    }
  }

  function onSelect(event) {
    var id = event.currentTarget.dataset.id;
    var already = event.currentTarget.getAttribute("aria-pressed") === "true";
    if (already) {
      select(null, false);
      if (history.replaceState) history.replaceState(null, "", "#hobbies");
    } else {
      select(id, true);
      showTrayIfHidden();
    }
  }

  // When the bench is below the visible screen, bring the pulled-out drawer into view
  // so the click visibly does something. Focus stays on the drawer button.
  function showTrayIfHidden() {
    var tray = detailEl.querySelector(".tray");
    if (!tray || !tray.scrollIntoView) return;
    var rect = tray.getBoundingClientRect();
    var viewHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top > viewHeight - 120) {
      tray.scrollIntoView({ block: "start" });
    }
  }

  function renderNextUp() {
    var list = document.getElementById("next-up-list");
    if (!list) return;
    var planned = catalog.filter(function (h) { return h.status === "planned"; }).slice(0, 4);
    list.textContent = "";
    planned.forEach(function (hobby) {
      var li = el("li");
      var link = el("a", null, hobby.name);
      link.href = "#hobby-" + hobby.id;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        select(hobby.id, true);
        var drawer = document.getElementById("drawer-" + hobby.id);
        if (drawer) {
          drawer.scrollIntoView({ block: "center" });
          drawer.focus({ preventScroll: true });
        }
      });
      li.appendChild(link);
      li.appendChild(el("span", "tag tag-planned", STATUS_TEXT.planned));
      list.appendChild(li);
    });
  }

  renderDrawers();
  renderNextUp();
  function selectFromHash() {
    var match = /^#hobby-(.+)$/.exec(window.location.hash);
    if (match && findHobby(match[1])) {
      select(match[1], false);
    } else if (!match) {
      return; // other in-page links (#apps, #about) leave the open drawer alone
    } else {
      select(null, false);
    }
  }

  select(null, false);
  selectFromHash();
  window.addEventListener("hashchange", selectFromHash);
})();
