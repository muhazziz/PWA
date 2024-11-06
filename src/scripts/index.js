import "regenerator-runtime";
import "../styles/main.css";
import DATA from "../public/data/DATA.json";

const main = () => {
  const restaurantContainer = document.querySelector("#restaurants");
  const hamburgerButton = document.querySelector("#hamburger");
  const navList = document.querySelector(".nav__list");
  const header = document.querySelector(".header");

  const renderRestaurants = (restaurants) => {
    restaurantContainer.innerHTML = "";
    restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement("article");
      restaurantElement.setAttribute("tabindex", "0");
      restaurantElement.classList.add("restaurant-item");
      restaurantElement.innerHTML = `
        <img class="restaurant-item__thumbnail"
             src="${restaurant.pictureId}"
             alt="${restaurant.name}"
             loading="lazy">
        <div class="restaurant-item__content">
            <p class="restaurant-item__city">${restaurant.city}</p>
            <h3 class="restaurant-item__title">${restaurant.name}</h3>
            <p class="restaurant-item__description">${restaurant.description.slice(
              0,
              100
            )}...</p>
            <p class="restaurant-item__rating">
                <i class="fas fa-star" aria-hidden="true"></i> ${restaurant.rating.toFixed(
                  1
                )}
            </p>
        </div>
      `;
      restaurantContainer.appendChild(restaurantElement);
    });
  };

  renderRestaurants(DATA.restaurants);

  const toggleMenu = () => {
    navList.classList.toggle("nav__list--open");
    hamburgerButton.setAttribute(
      "aria-expanded",
      navList.classList.contains("nav__list--open")
    );
  };

  hamburgerButton.addEventListener("click", (event) => {
    toggleMenu();
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (
      navList.classList.contains("nav__list--open") &&
      !event.target.closest(".nav")
    ) {
      toggleMenu();
    }
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("header--scroll", window.scrollY > 0);
  });

  navList.addEventListener("keydown", (event) => {
    const menuItems = navList.querySelectorAll("a");
    const currentIndex = Array.from(menuItems).indexOf(document.activeElement);

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        if (currentIndex < menuItems.length - 1) {
          menuItems[currentIndex + 1].focus();
        } else {
          menuItems[0].focus();
        }
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        if (currentIndex > 0) {
          menuItems[currentIndex - 1].focus();
        } else {
          menuItems[menuItems.length - 1].focus();
        }
        break;
    }
  });

  const skipLink = document.querySelector(".skip-link");

  skipLink.addEventListener("click", (event) => {
    event.preventDefault();
    restaurantContainer.scrollIntoView({ behavior: "smooth" });
    skipLink.blur();
  });
};

document.addEventListener("DOMContentLoaded", main);
