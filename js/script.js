document.addEventListener('DOMContentLoaded', () => {
  let cardContainer = document.querySelector('.cards__list');
  let loadMoreButton = document.querySelector('.cards__btn');
  let orderButton = document.querySelectorAll('.order__btn');
  let modalBg = document.querySelector('.modal-bg');
  let closeButton = document.querySelector('.modal-close-btn');
  let cardsLoaded = 10;
  let maxCards = 30;
  let form = document.querySelector('.form');
  let nameInput = document.querySelector('#name');
  let phoneInput = document.querySelector('#phone');
  let burger = document.querySelector('.header__burger');
  let menu = document.querySelector('.header__menu');
  let menuLinks = document.querySelectorAll('.header__menu-link');
  let headerContacts = document.querySelector('.header__contacts-mob')



  loadMoreButton.addEventListener('click', function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts?_start=' + (cardsLoaded + 5) + '&_limit=5', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let posts = JSON.parse(xhr.responseText);
        posts.forEach(function (post) {
          if (cardsLoaded < maxCards) {
            let card = document.createElement('div');
            card.className = 'cards__item';
            card.innerHTML = '<img src="../img/card-1.jpg" alt="Card Image">' +
              '<div class="cards__item-info">' +
              '<h3 class="cards__item-title">' + post.title + '</h3>' +
              '<h4 class="cards__item-subtitle">' + 'How to increase your productivity with a Music' + '</h4>' +
              '<p  class="cards__item-text">' + post.body + '</p>' +
              '<a class="cards__item-link">Continue reading</a>' +
              '</div>';
            cardContainer.appendChild(card);
            cardsLoaded++;
          }
        });
        if (cardsLoaded >= maxCards) {
          loadMoreButton.disabled = true;
        }
      }
    };
    xhr.send();
  });

  // popup
  orderButton.forEach(function (button) {
    button.addEventListener('click', function () {
      modalBg.classList.add('bg-active');
      document.body.style.overflow = 'hidden'
      burger.classList.remove('touched');
      document.body.classList.remove('noscroll');
      menu.classList.remove('visible');
    });
  });

  closeButton.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
    document.body.style.overflow = ''
  })

  // validation

  let phoneMask = IMask(phoneInput, {
    mask: '+{7}(000)-000-00-00',
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Пожалуйста, введите ваше имя');
      return;
    }

    if (phoneMask.unmaskedValue.trim() === '') {
      showError(phoneInput, 'Пожалуйста, введите ваш телефон');
      return;
    }

    if (!isValidPhone(phoneMask.value.trim())) {
      showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
      return;
    }

    form.submit();
    form.reset();
  });

  function showError(input, errorMessage) {
    let errorElement = document.createElement('p');
    errorElement.className = 'form__error';
    errorElement.textContent = errorMessage;

    let parentElement = input.parentElement;
    parentElement.appendChild(errorElement);

    input.classList.add('form__input--error');

    input.addEventListener('input', function () {
      errorElement.remove();
      input.classList.remove('form__input--error');
    });
  }

  function isValidPhone(phone) {
    let phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
  }

  // burger
  burger && burger.addEventListener('click', (e) => {
    e.preventDefault();
    burger.classList.toggle('touched');
    document.body.classList.toggle('noscroll');
    menu.classList.toggle('visible');
  });

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', (e) => {
      e.preventDefault();
      burger.classList.remove('touched');
      document.body.classList.remove('noscroll');
      menu.classList.remove('visible');
    });
  }
  
})