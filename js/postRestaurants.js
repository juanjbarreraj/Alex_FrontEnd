const formEl = document.querySelector(".form");

formEl.addEventListener("submit", async (event) => {
event.preventDefault();

const formData = new FormData(formEl);
const data = Object.fromEntries(formData);

const id = data.id;
delete data.id;

if (!id) {
$.toaster({
priority: "danger",
title: "Error",
message: "Missing ID",
});
return;
}

try {
const res = await fetch(
`https://restaurantsbackend.onrender.com/api/v1/restaurants/${id}`,
{
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
}
);

console.log("Status:", res.status);

const responseData = await res.json().catch(() => null);
console.log("Response:", responseData);

if (!res.ok) {
throw new Error(responseData?.error || "Update failed");
}

$.toaster({
priority: "success",
title: "Restaurants",
message: "Restaurant updated successfully",
});
} catch (err) {
console.error(err);
$.toaster({
priority: "danger",
title: "Error",
message: err.message,
});
}
});
