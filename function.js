const formTugas = document.getElementById('formTugas');
const inputHobiContainer = document.getElementById('inputHobiContainer');
const checkboxHobiContainer = document.getElementById('checkboxHobiContainer');
const hasilAkhir = document.getElementById('hasilAkhir');

let namaDepan, namaBelakang, email;
let jumlahHobi;

formTugas.addEventListener('submit', function (e) {
  e.preventDefault();

  namaDepan = document.getElementById('namaDepan').value;
  namaBelakang = document.getElementById('namaBelakang').value;
  email = document.getElementById('email').value;
  jumlahHobi = parseInt(document.getElementById('jumlahHobi').value);

  if (isNaN(jumlahHobi) || jumlahHobi < 1) {
    alert('Jumlah hobi harus lebih dari 0');
    return;
  }

  formTugas.style.display = "none";

  inputHobiContainer.innerHTML = '';
  checkboxHobiContainer.innerHTML = '';
  hasilAkhir.innerHTML = '';

  const formHobi = document.createElement('form');
  formHobi.id = 'formHobi';

  for (let i = 1; i <= jumlahHobi; i++) {
    formHobi.innerHTML += `
      <div class="mb-3">
        <label class="form-label">Hobi ${i}</label>
        <input type="text" class="form-control" id="hobi${i}" required>
      </div>
    `;
  }

  formHobi.innerHTML += `<button type="submit" class="btn btn-success">Oke</button>`;
  inputHobiContainer.appendChild(formHobi);

  formHobi.addEventListener('submit', function (e) {
    e.preventDefault();
    formHobi.style.display = "none";
    tampilkanCheckbox();
  });
});

function tampilkanCheckbox() {
  checkboxHobiContainer.innerHTML = '';
  hasilAkhir.innerHTML = '';

  const formCheckbox = document.createElement('form');
  formCheckbox.id = 'formCheckbox';

  const petunjuk = document.createElement('p');
  petunjuk.className = 'mb-3 fw-semibold text-center';
  petunjuk.textContent = 'Silakan pilih satu atau lebih hobi yang paling kamu sukai:';
  formCheckbox.appendChild(petunjuk);  

  for (let i = 1; i <= jumlahHobi; i++) {
    const nilai = document.getElementById(`hobi${i}`).value;
    formCheckbox.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="check${i}" value="${nilai}">
        <label class="form-check-label" for="check${i}">${nilai}</label>
      </div>
    `;
  }

  formCheckbox.innerHTML += `<button type="submit" class="btn btn-info mt-3">Oke</button>`;
  checkboxHobiContainer.appendChild(formCheckbox);

  formCheckbox.addEventListener('submit', function (e) {
    e.preventDefault();
    formCheckbox.style.display = "none";
    tampilkanHasil();
  });
}


function tampilkanHasil() {
  const semuaHobi = [];
  const disukai = [];

  for (let i = 1; i <= jumlahHobi; i++) {
    const hobiText = document.getElementById(`hobi${i}`).value;
    semuaHobi.push(hobiText);

    const checkbox = document.getElementById(`check${i}`);
    if (checkbox.checked) {
      disukai.push(checkbox.value);
    }
  }

  hasilAkhir.innerHTML = `
    <div class="alert alert-primary">
      Halo, nama saya <strong>${namaDepan} ${namaBelakang}</strong>, dengan email <strong>${email}</strong>, saya mempunyai sejumlah <strong>${jumlahHobi}</strong> pilihan hobi yaitu <em>${semuaHobi.join(', ')}</em>, dan saya menyukai <strong>${disukai.join(', ')}</strong>.
    </div>
  `;
}
