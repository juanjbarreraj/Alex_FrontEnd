new gridjs.Grid({
  search: true,
  sort: true,
  pagination: true,
  fixedHeader: true,
  height: "90%",

  columns: [
    { name: "id", width: "120px" },
    { name: "restaurant_name", width: "300px" },
    { name: "rating", width: "120px" },
    { name: "location", width: "200px" },
    { name: "type", width: "200px" },
  ],

  server: {
    url: "https://restaurantsbackend.onrender.com/api/v1/restaurants",

    then: (data) => {
      data.sort((a, b) => b.id - a.id);
      return data.map((restaurant) => [
        restaurant.id,
        restaurant.restaurant_name,
        restaurant.rating,
        restaurant.location,
        restaurant.type,
      ]);
    },
  },
}).render(document.getElementById("table"));

