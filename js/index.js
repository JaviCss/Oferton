/*VARIABLES*/
const historial = []
/*url de inscripcion de empresas (cuando lo usen) */
const urlInscripcion = '#home'
/*url de categorias */
const URL_CATEGORIAS = 'https://demo8759519.mockable.io/api/Empresa/categorias'
/*url de categorias sin el query ?idCategoria=${id} */
const URL_CATEGORIA_ID = `https://0cd09e99-ceda-4479-9523-54082fbea259.mock.pstmn.io/api/Empresa/empresas_x_categoria`
/*SELECTORES */
const body = document.querySelector('.body')
const ul1 = document.querySelector('.footer-cat-1')
const ul2 = document.querySelector('.footer-cat-2')

const ulNav1 = document.querySelector('.nav-categoria-1')
const ulNav2 = document.querySelector('.nav-categoria-2')
/*INICIO*/
window.location.hash = `#home`
window.onhashchange = function () {
  if (historial.indexOf(window.location.hash) === -1) {
    historial.push(window.location.hash)
  } else {
    historial.pop()
  }
  renderContenido(historial[historial.length - 1])
}

/*LLAMADOS AL SERVIDOR*/
async function categoriasFetch() {
  const categoriasNav = []
  await fetch(URL_CATEGORIAS)
    .then(res => res.json())
    .then(res => {
      for (x = 1; x < res.resultado.length + 1; x++) {
        for (i = 0; i < res.resultado.length; i++) {
          //console.log(res.resultado[i])
          if (x === res.resultado[i].id) {
            categoriasNav.push(res.resultado[i])
          }
        }
      }
      renderCategorias(categoriasNav)
    })
    .catch(err => console.error(err))
  return categoriasNav
}
async function seccionesFetch(id, nombre) {
  await fetch(`${URL_CATEGORIA_ID}?idCategoria=${id}`)
    .then(res => res.json())
    .then(res => {
      renderSeccionesFull(res, nombre)
    }).catch(err => console.error(err))

}
async function seccionesFetchAll(cat) {
  for (let i = 0; i < cat.length; i++) {
    const id = cat[i].id
    const nombre = cat[i].nombre
    await fetch(`${URL_CATEGORIA_ID}?idCategoria=${id}`)
      .then(res => res.json())
      .then(res => {
        renderSecciones(res, nombre, id)
      }).catch(err => console.error(err))
  }
}

/*FUNCIONES*/
async function renderContenido(hash) {
  body.innerHTML = ''
  ul1.innerHTML = ''
  ul2.innerHTML = ''
  ulNav1.innerHTML = ''
  ulNav2.innerHTML = ''

  const cat = await categoriasFetch()
  if (hash !== '#que-es-oferton' && hash !== '#participa'
    && hash !== '#bases-y-condiciones' && hash !== '#promociones-bancarias') {
    /*QUITA EL HASH*/
    const data1 = hash.split('#')
    const data = data1[1].split('&')
    /*SEPARA DATOS*/
    const name = removerGuiones(data[0])
    const id = data[1]
    /*SI ESTOY EN HOME */
    if (name === 'home' || name === '') {
      seccionesFetchAll(cat)
    } else {
      seccionesFetch(id, name)
    }
  } else {
    switch (hash) {
      case '#que-es-oferton':
        renderOferton()
        console.log('#que-es-oferton')
        break;
      case '#participa':
        renderParticipa()
        console.log('#participa')
        break;
      case '#bases-y-condiciones':
        renderBases()
        break;
      case '#promociones-bancarias':
        console.log('promociones-bancarias')
        break;

      default:
        break;
    }
  }

}

/*HEADER Y FOOTER */
function renderCategorias(cat) {
  for (i = 0; i < cat.length; i++) {
    /*CREA CATEGORIAS DE LA NAVBAR*/
    const item = document.createElement("div")
    const circle = document.createElement("div")
    const anchor = document.createElement("a")
    const itemCategoria = document.createElement("img")
    const itemTexto = document.createElement("h3")
    /*AGREGA PROPIEDADES*/
    item.className = 'item'
    circle.className = 'circle'
    anchor.dataset.id = `${cat[i].id}`
    anchor.dataset.name = removerAcentos(`${cat[i].nombre}`)
    anchor.className = `categoria-${cat[i].id}`
    anchor.onclick = seccionesFull
    itemCategoria.className = 'item-cat'
    itemCategoria.src = `./img/iconos/${cat[i].id}.png`
    itemCategoria.title = `${cat[i].nombre}`
    itemCategoria.alt = `${cat[i].nombre}`
    itemTexto.className = 'mo-13 item-text'
    itemTexto.textContent = `${cat[i].nombre}`
    /*APENDA ELEMENTOS AL NAVBAR */
    item.appendChild(circle)
    anchor.appendChild(itemCategoria)
    circle.appendChild(anchor)
    circle.appendChild(itemTexto)
    $('#owl2').owlCarousel('add', item).owlCarousel('update');
    /*FOOTER */
    const anchor2 = document.createElement("a")
    const anchor3 = document.createElement("a")
    const ul1 = document.querySelector('.footer-cat-1')
    const ul2 = document.querySelector('.footer-cat-2')

    const li = document.createElement("li")
    const liNav = document.createElement("li")
    liNav.className = 'nav-li mo-13'
    li.className = 'foo-li mo-13'
    anchor2.className = 'mo-13'
    anchor2.textContent = `${cat[i].nombre}`
    anchor2.dataset.id = `${cat[i].id}`
    anchor2.dataset.name = `${removerAcentos(cat[i].nombre)}`
    anchor2.onclick = seccionesFull
    anchor3.className = 'mo-13'
    anchor3.textContent = `${cat[i].nombre}`
    anchor3.dataset.id = `${cat[i].id}`
    anchor3.dataset.name = `${removerAcentos(cat[i].nombre)}`
    anchor3.onclick = seccionesFull
    /*EN DOS COLUMNAS */
    if (i < Math.round(cat.length / 2)) {
      ul1.appendChild(li)
      ulNav1.appendChild(liNav)
      liNav.appendChild(anchor3)
      li.appendChild(anchor2)

    } else {
      ul2.appendChild(li)
      ulNav2.appendChild(liNav)
      liNav.appendChild(anchor3)
      li.appendChild(anchor2)
    }


  }
}

/*BODY HOME */
function renderSecciones(cat, nombre, id) {
  /*CREA ELEMENTOS*/
  console.log(cat)
  const seccionContainer = document.createElement("div")
  const header = document.createElement("div")
  const h3 = document.createElement("h3")
  const containerInner = document.createElement("div")
  const row1 = document.createElement("div")
  const row2 = document.createElement("div")
  const footer = document.createElement("div")
  const urlCategoria = document.createElement("a")
  /*AGREGA PROPIEDADES*/
  seccionContainer.className = 'seccion-container'
  h3.className = 'mo-24 color'
  h3.textContent = nombre
  containerInner.className = 'container-inner'
  row1.className = 'row-1 row'
  row2.className = 'row-2 row'
  urlCategoria.dataset.id = `${id}`
  urlCategoria.dataset.name = `${removerAcentos(nombre)}`
  urlCategoria.className = 'url-cat mo-16 color'
  urlCategoria.textContent = 'Ver todas las m??rcas'
  urlCategoria.onclick = seccionesFull
  header.className = 'header-section'
  footer.className = 'footer-section'

  /*APENDA ELEMENTOS AL NAVBAR */
  body.appendChild(seccionContainer)
  seccionContainer.appendChild(header)
  header.appendChild(h3)
  seccionContainer.appendChild(containerInner)
  seccionContainer.appendChild(footer)
  footer.appendChild(urlCategoria)
  containerInner.appendChild(row1)
  containerInner.appendChild(row2)

  /*SEPARA EN DOS COLUMNAS LOS LOGOS*/
  for (i = 0; i < 4; i++) {
    /*CREA ELEMENTOS*/
    const col = document.createElement("col")
    const img = document.createElement("img")
    const a = document.createElement("a")
    const categories = cat[i]
    col.className = 'col'
    img.className = 'img-col'
    if (categories) {
      const urlEmpresa = categories.url
      const bufferName = categories.logo.fileName
      const bufferType = categories.logo.mediaType
      const bufferImg = categories.logo.buffer
      /*AGREGA PROPIEDADES*/
      img.src = `data:image/${bufferType};base64,${bufferImg}`
      img.alt = bufferName
      a.href = urlEmpresa
      a.className = 'url-empresa'
      a.target = "_blank"
    } else {
      /*AGREGA PROPIEDADES*/
      img.src = './img/default.jpg'
      img.alt = 'Imagen por defecto'
      a.href = '#'
      a.className = 'url-empresa'
    }

    /*APENDA ITEMS*/
    row1.appendChild(col)
    col.appendChild(a)
    a.appendChild(img)
  }
  for (i = 4; i < 8; i++) {
    const col = document.createElement("col")
    const img = document.createElement("img")
    const a = document.createElement("a")
    const categories = cat[i]
    col.className = 'col'
    img.className = 'img-col'
    if (categories) {
      const urlEmpresa = categories.url
      const bufferName = categories.logo.fileName
      const bufferType = categories.logo.mediaType
      const bufferImg = categories.logo.buffer
      /*AGREGA PROPIEDADES*/
      img.src = `data:image/${bufferType};base64,${bufferImg}`
      img.alt = bufferName
      a.href = urlEmpresa
      a.className = 'url-empresa'
      a.target = "_blank"
    } else {
      /*AGREGA PROPIEDADES*/
      img.src = './img/default.jpg'
      img.alt = 'Imagen por defecto'
      a.href = '#'
      a.className = 'url-empresa'
    }

    /*APENDA ITEMS*/
    row1.appendChild(col)
    col.appendChild(a)
    a.appendChild(img)
  }
}

/*BODY SECCION */
function renderSeccionesFull(cat, nombre) {
  console.log(cat)
  /*CREA ELEMENTOS*/
  const seccionContainer = document.createElement("div")
  const header = document.createElement("div")
  const h3 = document.createElement("h3")
  const containerInner = document.createElement("div")
  const row1 = document.createElement("div")
  const footer = document.createElement("div")
  /*AGREGA PROPIEDADES*/
  seccionContainer.className = 'seccion-container'
  h3.className = 'mo-24 color'
  h3.textContent = nombre
  containerInner.className = 'container-inner'
  row1.className = 'row-1 row'
  header.className = 'header-section'
  footer.className = 'footer-section'
  /*APENDA ELEMENTOS A LA SECCION */
  body.appendChild(seccionContainer)
  seccionContainer.appendChild(header)
  header.appendChild(h3)
  seccionContainer.appendChild(containerInner)
  seccionContainer.appendChild(footer)
  containerInner.appendChild(row1)
  /*SEPAR LOGOS*/
  for (i = 0; i < cat.length; i++) {
    const col = document.createElement("col")
    const img = document.createElement("img")
    const a = document.createElement("a")
    const categories = cat[i]
    console.log(categories)
    col.className = 'col'
    img.className = 'img-col'
    if (categories) {
      console.log('entra')
      const urlEmpresa = categories.url
      const bufferName = categories.logo.fileName
      const bufferType = categories.logo.mediaType
      const bufferImg = categories.logo.buffer
      /*AGREGA PROPIEDADES*/
      img.src = `data:image/${bufferType};base64,${bufferImg}`
      img.alt = bufferName
      a.href = urlEmpresa
      a.className = 'url-empresa'
      a.target = "_blank"
    } else {
      img.src = './img/default.jpg'
      img.alt = 'Imagen por defecto'
      a.href = '#'
      a.className = 'url-empresa'
    }
    /*AGREGA PROPIEDADES*/

    /*APENDA ITEMS*/
    row1.appendChild(col)
    col.appendChild(a)
    a.appendChild(img)
  }
}

/*FUNCIONES PARA ARRAYS*/
const removerAcentos = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const removerEspacios = (cadena) => {
  let re = / /g;
  return cadena.replace(re, '-');
}
const removerGuiones = (cadena) => {
  let re = /-/g;
  return cadena.replace(re, ' ');
}
const removerComas = (cadena) => {
  let re = /,/g;
  return cadena.replace(re, '');
}
const scrollUp = () => {
  $('body, html').animate({
    scrollTop: '250px'
  }, 500);
}

/*FUNCIONES CLICK*/
function seccionesFull() {
  scrollUp()
  let cadena = `${removerEspacios(this.dataset.name)}`
  cadena = removerComas(cadena)
  window.location.hash = `${cadena}&${this.dataset.id}`
}

/*FUNCIONES DE VISTAS ESTATICAS */
function renderOferton() {
  scrollUp()
  const title = document.querySelector('.title')
  const body = document.querySelector('.body')
  title.innerHTML = ''
  body.innerHTML = ''
  setTimeout(() => {
    body.innerHTML = `
  <div class="oferton text-center">
      <h1 class="mo-32 color bold">??Qu?? es OFERT-??N?</h1>
  <p class="mo-18">Te invitamos a conocer este evento digital de promociones comerciales que beneficia el consumo en comercios cordobeses por v??a digital, brindando ofertas y descuentos especiales.</p>
  <p class="mo-18"> Lanzamos OFERT-ON con el fin de promover la modernizaci??n y actualizaci??n permanente del comercio minorista ante las cambiantes exigencias del mercado, las innovaciones tecnol??gicas y las nuevas tendencias comerciales.</p>
  <p class="mo-18 color bold">Ponemos en marcha OFERT-ON, el primer evento digital de promociones comerciales de la Provincia de C??rdoba.</p>
  <img src="./img/img-que-es-oferton.png" alt="??Que es oferton?">
  <p class="mo-18">Queremos promover la modernizaci??n y actualizaci??n permanente del comercio minorista, ante las cambiantes exigencias del mercado, las innovaciones tecnol??gicas, y las nuevas tendencias comerciales. Adem??s buscamos fortalecer la actividad econ??mica y la sostenibilidad del comercio minorista y las PyMEs comerciales y de servicios de la Provincia de C??rdoba.</p>
  </div>`
  }, 300)

}
function renderParticipa() {
  scrollUp()
  const title = document.querySelector('.title')
  const body = document.querySelector('.body')
  title.innerHTML = ''
  body.innerHTML = ''
  setTimeout(() => {
    body.innerHTML = `
  <div class="participa text-center">
      <h1 class="mo-32 color bold">C??mo participar con tu marca de OFERT-ON</h1>
  <p class="mo-18">La inscripci??n de los Participantes se har?? a trav??s de las C??maras Sectoriales o Asociaciones Civiles representantes de los sectores comerciales que integran las categor??as de participaci??n. Las C??maras ser??n las responsables de recolectar y gestionar la informaci??n entregada por las empresas que quieran ingresar a OFERT-ON y consignar con ellas la siguiente informaci??n:</p>
  <ul class="mo-18"> 
      <li> 1. CUIT de la Empresa (s??lo se permitir?? la participaci??n de comercios que est??n registrados en la Provincia de C??rdoba). </li>
      <li> 2. NOMBRE DE FANTAS??A</li>
      <li> 3. LINK DE REDIRECCIONAMIENTO (URL al que se redireccionar?? al Usuario cuando ingrese al sitio).</li>
      <li> 4. LOGOTIPO (seg??n especificaciones t??cnicas).</li>
      <li> 5. Categor??a/s en la/s que quiera participar.</li>
  </ul>
  <p class="mo-18 bold"><span class="color">IMPORTANTE:</span> La Secretar??a de Comercio no recibir?? inscripciones que no vengan a trav??s de las C??maras Sectoriales que se consignen como ???Organizadoras??? del evento.</p>
  <img class="img-1" src="./img/participa.png" alt="??Que es oferton?">
  <h2 class="mo-32 color bold">Requisitos para la participaci??n</h2>
      <ul class="mo-18"> 
          <li> 1. Que el comercio est?? radicado en la Provincia de C??rdoba y su CUIT lo demuestre.</li>
          <li> 2. Que el comercio ofrezca productos que est??n dentro de las categor??as del OFERT-ON.</li>
          <li> 3. Compromiso expreso a trav??s de un ???Acuerdo de Compromiso???, a realizar acciones promocionales y de uso de la marca OFERT-ON en sus p??ginas web y dem??s espacios que considere oportunos.</li>
          <li>  4. Realizar el proceso de inscripci??n a trav??s de la C??mara Sectorial que lo represente.</li>
      </ul>
  <h2 class="mo-32 color bold">Especificaciones para preparar tu logo</h2>
  <p class="mo-18">Para cargar tu imagen correctamente en el sitio de Ofert??n, record?? que debe cumplir con algunas especificaciones. Asegurate de que tu logo se vea completo y con m??rgenes. Te mostramos un ejemplo:</p>
  <img class="img-2" src="./img/empresas-logo.svg" alt="Ejemplo de logo">
  <p class="mo-18 color">Peso m??x del archivo: 500 kb</p>
  <p class="mo-18">Los tipos de archivos admitidos son . JPG y .PNG</p>
  <h2 class="mo-32 color bold">Inscribite</h2>
  <p class="mo-18">Para inscribirte solo deb??s completar el formulario a continuaci??n con los datos solicitados y cargar la imagen de tu logo</p>
  <a href="${urlInscripcion}"><button class="mo-20 bold">Inscribite en OFERT-ON</button></a>


  </div>`

  }, 300)

}
function renderBases() {
  scrollUp()
  const title = document.querySelector('.title')
  const body = document.querySelector('.body')
  title.innerHTML = ''
  body.innerHTML = ''
  setTimeout(() => {
    body.innerHTML = `
  <div class="bases text-center">
      <h1 class="mo-32 color bold">Bases y condiciones OFERT-ON 2021</h1>
      <p class="mo-18">La Secretar??a de Comercio, dependiente del Ministerio de Industria, Comercio y Miner??a, pone a su disposici??n los presentes T??rminos y Condiciones que describen los derechos y responsabilidades de los Participantes en el uso de las herramientas actuales o a crearse en el futuro que dicha Secretar??a ponga a disposici??n de los Usuarios, y que denominaremos ???los Servicios???, en el marco de la acci??n promocional <span class="bold">OFERT-ON.</span></p>
      <p class="mo-18">El sitio www.oferton.cba.gov.ar as?? como la marca <span class="bold">OFERT-ON</span>, en todos sus usos y aplicaciones, son propiedad del Gobierno de la Provincia de C??rdoba. La Acci??n <span class="bold">OFERT-ON</span> (que incluye una potencial extensi??n de la Acci??n por varios d??as a la cual se aplican los presentes T??rminos y Condiciones, comprende tanto las acciones de marketing realizadas en los Sitios oficiales de <span class="bold">OFERT-ON</span> y canales oficiales de Gobierno de la Provincia de C??rdoba, as?? como las acciones realizadas a trav??s de email marketing y dem??s canales de comunicaci??n que se consideren.</p>
      <p class="mo-18">La acci??n de <span class="bold">OFERT-ON</span> consiste en generar tr??fico en beneficio de todas las Empresas y Organizaciones Participantes Oficiales de la Acci??n (en adelante ???Partipantes???) en forma conjunta, a los efectos de aumentar las ventas de los Participantes a trav??s de ofertas, descuentos y/o promociones sobre productos y servicios que ofrecen los Participantes en forma directa a sus Usuarios y Consumidores a trav??s de sus propios sitios web. La Acci??n <span class="bold">OFERT-ON</span> es v??lida durante fechas espec??ficas, generalmente dos (2) d??as corridos.</p>
      <p class="mo-18">En esta oportunidad la Acci??n de <span class="bold">OFERT-ON 2021</span> es v??lida entre el d??a 6 de julio de 2021 desde las 00:00 hs,hasta el d??a 7 de julio de 2021 a las 23:59 hs.</p>
      <h2 class="mo-32 color bold">Proceso de inscripci??n de participantes:</h2>  
      <p class="mo-18">La inscripci??n de los Participantes se har?? a trav??s de las C??maras Sectoriales o Asociaciones Civiles representantes de los sectores comerciales que integran las categor??as de participaci??n.</p>
      <p class="mo-18">Para dicha inscripci??n, ser??n las C??maras las responsables de recolectar y gestionar la informaci??n entregada por las empresas que quieran ingresar a OFERT-ON, y consignar con ellas la siguiente informaci??n:</p>   
      <ul class="mo-18"> 
      <li> 1. CUIT de la Empresa (s??lo se permitir?? la participaci??n de comercios que est??n registrados en la Provincia de C??rdoba). </li>
      <li> 2. NOMBRE DE FANTAS??A</li>
      <li> 3. LINK DE REDIRECCIONAMIENTO (URL al que se redireccionar?? al Usuario cuando ingrese al sitio).</li>
      <li> 4. LOGOTIPO (seg??n especificaciones t??cnicas).</li>
      <li> 5. Categor??a/s en la/s que quiera participar.</li>
      </ul>
      <p class="mo-18">La Secretar??a de Comercio no recibir?? inscripciones que no vengan a trav??s de las C??maras Sectoriales que se consignen como ???Organizadoras??? del evento.</p> 
      <p class="mo-18">Los Requisitos para la participaci??n, ser??n:</p>
      <ul class="mo-18"> 
          <li> - Que el comercio est?? radicado en la Provincia de C??rdoba y su CUIT lo demuestre.</li>
          <li> - Que el comercio ofrezca productos que est??n dentro de las categor??as del OFERT-ON.</li>
          <li> - Compromiso expreso a trav??s de un ???Acuerdo de Compromiso???, a realizar acciones promocionales y de uso de la marca OFERT-ON en sus p??ginas web y dem??s espacios que considere oportunos.</li>
          <li> - Realizar el proceso de inscripci??n a trav??s de la C??mara Sectorial que lo represente.</li>
      </ul>
      <p class="mo-18">Las categor??as participantes, ser??n:</p>
      <ul id="categorias" categorias class="mo-18"></ul>
      <h2 class="mo-32 color bold">De los usuarios de la plataforma</h2> 
      <p class="mo-18">Los Usuarios reconocen y aceptan que la Secretar??a de Comercio no controla,ni interviene ni monitorea el contenido subido sobre ofertas y promociones de productos y servicios por los Participantes, ni lo que se publica a trav??s de los sitios web y/o plataformas en redes sociales de los Participantes.</p>
      <p class="mo-18">Los usuarios reconocen y aceptan que la Secretar??a de Comercio no controla, ni monitorea, ni es propietaria ni responsable de las ofertas, descuentos ni promociones sobre productos y servicios de los Participantes durante la acci??n de OFERT-ON. Los Usuarios reconocen y aceptan que en virtud de tal circunstancia los descuentos y promociones sobre productos y servicios en el marco de la Acci??n de OFERT-ON son ofrecidos en forma exclusiva y directa por los Participantes a trav??s de sus propios sitios web y en los t??rminos y condiciones y con las pol??ticas de privacidad y de uso por ellos estipulados en sus sitios web.</p>
      <p class="mo-18">En caso que el Usuario se sienta agraviado o perjudicado por informaci??n contenida en los sitios web de los Participantes, deber?? dirigir su acci??n o reclamo exclusivamente contra ??stos.</p>
      <p class="mo-18">Corre por cuenta del Usuario el verificar la inexistencia de virus en los programas y materiales que el Usuario descargue en su equipo. En ning??n caso la Secretar??a de Comercio ser?? responsable por los da??os causados por elementos destructivos que pudieran haber introducido terceros a los materiales de download provisto por el Sitio de OFERT-ON ni por los materiales de download que puedan ser descargados de los sitios web de los Participantes.</p>


         
  


  </div>`

    let categorias = document.querySelector('#categorias')
    const categoriasNav = []
    fetch('https://demo8759519.mockable.io/api/Empresa/categorias')
      .then(res => res.json())
      .then(res => {
        for (x = 1; x < res.resultado.length + 1; x++) {
          for (i = 0; i < res.resultado.length; i++) {
            //console.log(res.resultado[i])
            if (x === res.resultado[i].id) {
              categoriasNav.push(res.resultado[i])
            }
          }
        }
        for (i = 0; i < categoriasNav.length; i++) {
          const li = document.createElement('li')
          let nombre = categoriasNav[i].nombre
          li.textContent = ` ??? ${nombre.toLowerCase()}`
          categorias.appendChild(li)

        }

      })
      .catch(err => console.error(err))
    return categoriasNav

  }, 300)

}



/*NAVBAR */

const navInner = document.querySelector('.navbar-inner')
const navBtn = document.querySelector('#nav-btn')


if (window.matchMedia("(max-width: 435px)").matches) {
  console.log('mobil')
  navBtn.addEventListener('click', () => {
    navBtn.style.visibility = 'hidden'
    navBtn.style.width = '0px'
    navBtn.style.margin = '0px'
    navInner.style.width = '95%'

    navInner.style.heith = '100%'
    navInner.style.visibility = 'visible'

  })

  navInner.addEventListener('click', () => {
    navInner.style.visibility = 'hidden'
    navBtn.style.visibility = 'visible'
    navBtn.style.margin = '0 0 0 auto'
    navBtn.style.width = ''
  })
} else {
  navBtn.addEventListener('click', () => {
    navBtn.style.visibility = 'hidden'
    navBtn.style.width = '0px'
    navBtn.style.margin = '0px'
    navInner.style.width = '80%'
    navInner.style.visibility = 'visible'

  })

  navInner.addEventListener('click', () => {
    navInner.style.visibility = 'hidden'
    navBtn.style.visibility = 'visible'
    navBtn.style.margin = '0 0 0 auto'
    navBtn.style.width = '20%'
  })
  console.log('destokp')
}






