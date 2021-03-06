var librettoWrapper = document.getElementById('libretto');
var button = document.getElementById('addVoto');

button.addEventListener('click', addVoto);
var my = new Libretto();

function addVoto(event) {
  event.preventDefault();
  event.stopPropagation();
  var mat = (document.querySelector('input[name=materia]')).value;
  var vot = (document.querySelector('input[name=voto]')).value;
  var dat = (document.querySelector('input[name=data]')).value;
  if (dat == '') {
    dat = new Date().toString();
  }

  var myvoto = new Voto(mat, vot, dat);
  my.addVoto(myvoto);
  $('#modal').modal('hide');
}

function Voto(materia, voto, data) {
  this.materia =  materia;
  this.voto =  voto;
  this.data = new Date(data);
}

function Libretto() {
  /* Campi */
  this.list = [];

  /* Metodi */
  this.addVoto = function (newVoto) {
    this.list.push(newVoto);
    this.save();
    this.renderVoto(newVoto);
  };

  this.save = function () {
    localStorage.setItem('voti', JSON.stringify(this.list));
  };

  this.renderVoto = function (voto) {
    var contenitore = document.createElement('li');
    contenitore.className = "list-group-item";
    contenitore.innerHTML = 'Il ' + new Date(voto.data).toDateString() + ' ho preso ' + voto.voto + ' in <span class="label label-warning">' + voto.materia + '</span>';
    librettoWrapper.appendChild(contenitore);
  };

  if (localStorage.getItem('voti')) {
    this.list = JSON.parse(localStorage.getItem('voti'));
    for (index in this.list) {
      this.renderVoto(this.list[index]);
    }
  }
}
