// Haetaan kaikki eläimet Server A:sta
fetch("http://localhost:3000/animals")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("animals");

    data.forEach(animal => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${animal.name}</h3>
        <p>${animal.type}, ${animal.age} vuotta</p>
        <img src="${animal.image || 'https://via.placeholder.com/150'}" alt="Eläimen kuva">
        <br>
        <a href="animal.html?id=${animal.id}">Katso lisää</a>
      `;

      container.appendChild(card);
    });
  });
