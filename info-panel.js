AFRAME.registerComponent('info-panel', {
  init: function () {
    const buttonEls = document.querySelectorAll('.menu-button');
    const fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');

    // Definir la información de las películas
    this.movieInfo = {
      karigurashiButton: {
        title: 'The Secret World of Arrietty (2010)',
        imgEl: document.querySelector('#karigurashiMovieImage'),
        description: 'Based on the 1952 novel The Borrowers by Mary Norton, an English author of children\'s books, about a family of tiny people who live secretly in the walls and floors of a typical household, borrowing items from humans to survive.',
        link: 'https://polloscopacabana.com/' 
      },
      kazetachinuButton: {
        title: 'The Wind Rises (2013)',
        imgEl: document.querySelector('#kazetachinuMovieImage'),
        description: 'The Wind Rises is a fictionalised biographical film of Jiro Horikoshi, designer of the Mitsubishi A5M fighter aircraft.',
        link: 'https://www.pepsi.com/landing'
      },
      ponyoButton: {
        title: 'Ponyo (2003)',
        imgEl: document.querySelector('#ponyoMovieImage'),
        description: 'It is the eighth film Miyazaki directed for Studio Ghibli, and his tenth overall. The film tells the story of Ponyo.',
        link: 'https://www.micoca-cola.bo/'
      },
      peliButton: {
        title: 'Peli',
        imgEl: document.querySelector('#peliMovieImage'),
        description: 'jajajjajs.',
        link: 'https://www.cerveza-pacena.com/'
      },
      flechaButton: {
        title: 'flecha',
        imgEl: document.querySelector('#flechaMovieImage'),
        description: 'gyygyg',
        link: 'cotizaciones.html'
      }
    };

    // Manejo de clics en los botones
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);

    this.backgroundEl = document.querySelector('#background');

    // Agregar eventos a los botones
    buttonEls.forEach(button => button.addEventListener('click', this.onMenuButtonClick));
    this.backgroundEl.addEventListener('click', this.onBackgroundClick);

    // Configuración de profundidad
    this.el.object3D.renderOrder = 2;
    this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 1;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  onMenuButtonClick: function (evt) {
    const movieInfo = this.movieInfo[evt.currentTarget.id];

    if (!movieInfo) {
      console.warn(`No se encontró información para el botón con id "${evt.currentTarget.id}"`);
      return;
    }

    // Si el botón tiene un enlace asociado, redirige
    if (movieInfo.link) {
      window.open(movieInfo.link, '_self'); // Redirige al enlace específico
      return;
    }

    // Si no hay enlace, muestra la información
    this.backgroundEl.object3D.scale.set(1, 1, 1);
    this.el.object3D.scale.set(1, 1, 1);
    if (AFRAME.utils.device.isMobile()) {
      this.el.object3D.scale.set(1.4, 1.4, 1.4);
    }
    this.el.object3D.visible = true;
    this.fadeBackgroundEl.object3D.visible = true;

    if (this.movieImageEl) {
      this.movieImageEl.object3D.visible = false;
    }
    this.movieImageEl = movieInfo.imgEl;
    if (this.movieImageEl) {
      this.movieImageEl.object3D.visible = true;
    }

    this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
    this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
  },

  onBackgroundClick: function () {
    this.backgroundEl.object3D.scale.set(0.004, 0.004, 0.004);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
  }
});


AFRAME.registerComponent('rotating-menu', {
  schema: {
    radius: { type: 'number', default: 3 }, // Radio del círculo
    speed: { type: 'number', default: 0.5 } // Velocidad de rotación
  },
  init: function () {
    this.timeElapsed = 0; // Tiempo acumulado
  },
  tick: function (time, deltaTime) {
    const menuButtons = this.el.children; // Los elementos en el menú
    const radius = this.data.radius;
    const speed = this.data.speed;

    this.timeElapsed += deltaTime / 1000; // Incrementar tiempo acumulado

    const angleStep = (2 * Math.PI) / menuButtons.length; // Espaciado angular

    for (let i = 0; i < menuButtons.length; i++) {
      const angle = angleStep * i + this.timeElapsed * speed; // Ángulo actual
      const x = radius * Math.cos(angle); // Coordenada X
      const z = radius * Math.sin(angle); // Coordenada Z

      menuButtons[i].setAttribute('position', `${x} 0 ${z}`);

      // Asegurar que las imágenes miren hacia el centro del círculo
      const rotationY = -((angle * 180) / Math.PI + 90); // Rotación hacia el centro
      menuButtons[i].setAttribute('rotation', `0 ${rotationY} 0`);
    }
  }
});

