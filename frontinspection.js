function toggleButton(button) {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else {
      button.classList.add("selected");
    }
  }