(function(){
  const nav = document.createElement("div");
  nav.className = "topnav";
  nav.innerHTML = `
    <div class="inner">
      <div class="brand">WordMasters Practice</div>
      <div class="navlinks">
        <a href="/index.html">Home</a>
        <a href="/vocab_dropdown_story.html">Dropdown Story</a>
        <a href="/week1.html">Week 1</a>
        <a href="/week2.html">Week 2</a>
        <a href="/mixed_review.html">Mixed Review</a>
        <a href="/games.html">Games</a>
        <a href="/about.html">About</a>
        <a href="/teacher/index.html">Teacher</a>
      </div>
    </div>
  `;
  document.body.prepend(nav);
})();
