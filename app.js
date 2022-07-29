const imageWrapper = document.getElementById("image-wrapper");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const allImages = document.getElementById("all-images");
let currIndex = 0;

const fetchImages = () =>
  new Promise((resolve, reject) => {
    fetch(
      "https://api.unsplash.com/photos?client_id=9psNB0esvh9jBIo186t5KsWjYsjCVaXhyfvptVl9YVk"
    )
      .then((res) => res.json())
      .then((data) => {
        const imageArray = data.map((item) => {
          return item.urls.regular;
        });
        resolve(imageArray);
      })
      .catch((err) => {
        reject(err);
      });
  });

const rightClickHandle = (imageArray) => {
  currIndex = currIndex + 1;
  if (currIndex === imageArray.length) {
    currIndex = 0;
  }
  const el = document.querySelectorAll(".image");
  removeAllActive(el);

  el[currIndex].classList.add("active");

  const url = `url("${imageArray[currIndex]}")`;
  imageWrapper.style.background = url;
  imageWrapper.style.backgroundRepeat = "no-repeat";
  imageWrapper.style.backgroundSize = "contain";
  imageWrapper.style.backgroundPosition = "center center";
};

const leftClickHandle = (imageArray) => {
  currIndex = currIndex - 1;
  if (currIndex === -1) {
    currIndex = imageArray.length - 1;
  }
  const el = document.querySelectorAll(".image");
  removeAllActive(el);
  el[currIndex].classList.add("active");

  const url = `url("${imageArray[currIndex]}")`;
  console.log(url);
  imageWrapper.style.background = url;
  imageWrapper.style.backgroundRepeat = "no-repeat";
  imageWrapper.style.backgroundSize = "contain";
  imageWrapper.style.backgroundPosition = "center center";
};

const removeAllActive = (el) => {
  el.forEach((node) => {
    node.classList.remove("active");
  });
};

fetchImages()
  .then((imageArray) => {
    const url = `url("${imageArray[currIndex]}")`;
    imageWrapper.style.background = url;
    imageWrapper.style.backgroundRepeat = "no-repeat";
    imageWrapper.style.backgroundSize = "contain";
    imageWrapper.style.backgroundPosition = "center center";

    imageArray.map((item, idx) => {
      allImages.innerHTML += `<div class="image" id="image" data-index="${idx}"><img src=${item}/></div>`;
    });

    const el = document.querySelectorAll(".image");

    el.forEach((node) => {
      node.addEventListener("click", () => {
        removeAllActive(el);
        node.classList.add("active");
        const index = node.getAttribute("data-index");
        currIndex = parseInt(index);
        console.log(currIndex);
        const url = `url("${imageArray[currIndex]}")`;
        imageWrapper.style.background = url;
        imageWrapper.style.backgroundRepeat = "no-repeat";
        imageWrapper.style.backgroundSize = "contain";
        imageWrapper.style.backgroundPosition = "center center";
      });
    });
    // });

    btnRight.addEventListener("click", () => rightClickHandle(imageArray));
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") rightClickHandle(imageArray);
    });
    btnLeft.addEventListener("click", () => leftClickHandle(imageArray));
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") leftClickHandle(imageArray);
    });
  })
  .catch((msg) => {
    console.log(msg);
  });
