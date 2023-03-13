const imageContainer = document.querySelector(".image-container");
const foregroundImage = document.querySelector(".foreground-image");

let isDragging = false;
let initialX;
let initialY;
let currentX = 0;
let currentY = 0;
let scale = 1;

// Add event listeners for mouse events
foregroundImage.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);
foregroundImage.addEventListener("wheel", scaleImage);

function startDrag(e) {
  isDragging = true;

  // Record the initial position of the mouse
  initialX = e.clientX;
  initialY = e.clientY;

  // Add event listeners to the document for the "mousemove" and "mouseup" events
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
}

function drag(e) {
  if (!isDragging) {
    return;
  }

  // Calculate the distance the mouse has moved
  const dx = e.clientX - initialX;
  const dy = e.clientY - initialY;

  // Update the position of the foreground image
  currentX += dx;
  currentY += dy;
  foregroundImage.style.transform = `translate(${currentX}px, ${currentY}px)`;
  
  // Record the current position of the mouse as the new initial position
  initialX = e.clientX;
  initialY = e.clientY;
}

function endDrag() {
  isDragging = false;

  // Remove the event listeners for "mousemove" and "mouseup" from the document
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);
}

function scaleImage(e) {
  e.preventDefault();

  // Calculate the new scale based on the scroll direction
  const direction = e.deltaY < 0 ? 1 : -1;
  const scaleIncrement = 0.1;
  scale += direction * scaleIncrement;
  scale = Math.max(scale, 0.1);

  // Update the scale of the foreground image
  foregroundImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}
