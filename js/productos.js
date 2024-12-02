
  // Función para mostrar los paninis
  function displayPaninis(data) {
    $("#panini").html(''); // Limpiar el contenedor

    // Iterar a través de cada panini y mostrarlo
    data.forEach(panini => {
      // Crear una lista de ingredientes
      const ingredientesList = panini.ingredientes.map(ingrediente => {
        return `<li>${ingrediente}</li>`;
      }).join('');

      // Crear la sección del panini
      const paniniSection = `
      <section class="u-clearfix u-container-align-center u-section-4" id="carousel_f25b">
          <div class="u-clearfix u-sheet u-sheet-1">
              <h2 class="u-align-center u-text u-text-default u-text-1">${panini.nombre}</h2>
              <div class="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                  <div class="u-layout">
                      <div class="u-layout-row">
                          <div class="u-container-align-left u-container-style u-layout-cell u-size-27 u-layout-cell-1">
                              <div class="u-container-layout u-container-layout-1">
                                  <p class="u-align-left u-text u-text-default u-text-3">${panini.descripcion}</p>
                                  <h6 class="u-align-left u-text u-text-default u-text-4">Ingredientes</h6>
                                  <ul class="u-align-left u-text u-text-default u-text-5">
                                      ${ingredientesList}
                                  </ul>
                              </div>
                          </div>
                          <div class="u-container-align-center u-container-style u-layout-cell u-size-33 u-layout-cell-2">
                              <div class="u-container-layout u-valign-middle u-container-layout-2">
                                  <img class="u-expanded-width u-image u-image-round u-radius-50 u-image-1"
                                      src="${panini.imagen ? panini.imagen : '../img/image-not-found.jpg'}" alt="${panini.nombre}">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>`;

      // Agregar la sección al contenedor
      $('#panini').append(paniniSection);
    });
}
$(document).ready(function () {
    // Listar los paninis al cargar la página
    displayPaninis(panini); // Usar la variable panini que contiene el array

    // Listar las categorías (tipos de paninis)
    displayCategories();

    // Evento para filtrar paninis
    $('#filter').change(function () {
        var category = $(this).val();
        var filteredPaninis;

        console.log("Filtro seleccionado:", category);

        if (category === 'all') {
            // Si se selecciona 'all', mostrar todos los paninis
            filteredPaninis = panini;
        } else {
            // Filtrar los paninis por tipo
            filteredPaninis = panini.filter(function (panini) {
                return panini.tipo === category;  // Filtrar por tipo
            });
        }

        console.log("Paninis filtrados:", filteredPaninis);

        // Mostrar los paninis filtrados
        displayPaninis(filteredPaninis);
    });
});

// Función para mostrar los paninis en la lista
function displayPaninis(panini) {
    var productList = $('#product-list');
    productList.empty(); // Limpiar la lista antes de agregar nuevos elementos

    // Asegúrate de que los paninis estén definidos
    console.log("Mostrando paninis:", panini);

    $.each(panini, function (index, panini) {
        var listItem = `<li class="panini-item">
            <h3>${panini.nombre}</h3>
            <img src="${panini.imagen}" alt="${panini.nombre}" class="panini-img">
            <p>${panini.descripcion}</p>
        </li>`;
        productList.append(listItem); // Agregar el nuevo elemento a la lista
    });
}




// Función para listar las categorías en el filtro
function displayCategories() {
    var select = $('#filter');
    var tipos = [];

    // Obtener todas las categorías únicas de tipos de paninis
    $.each(panini, function (index, panini) {
        // Solo agregar tipos de paninis únicos
        if ($.inArray(panini.tipo, tipos) === -1) {
            tipos.push(panini.tipo);
            select.append(`<option value="${panini.tipo}">${panini.tipo}</option>`); // Agregar tipo al select
        }
    });

    // También agregar una opción para "Todos"
    select.prepend('<option value="all">Todos</option>');
}

