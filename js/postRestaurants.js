const formEl = document.querySelector(".form");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);

  // 🔍 DEBUG LOGS
  console.log("Form data object:", data);
  console.log("restaurant_name value:", data.restaurant_name);

  // Basic validation
  if (!data.restaurant_name) {
    $.toaster({
      priority: "danger",
      title: "Error",
      message: "Restaurant name is required",
    });
    return;
  }

  try {
    const res = await fetch(
      "https://restaurantsbackend-us4c.onrender.com/api/v1/restaurants",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    console.log("Status:", res.status);

    const responseData = await res.json().catch(() => null);
    console.log("Response:", responseData);

    if (!res.ok) {
      throw new Error(responseData?.error || "Add failed");
    }

    $.toaster({
      priority: "success",
      title: "Restaurants",
      message: "Restaurant added successfully",
    });

    formEl.reset();
  } catch (err) {
    console.error("ERROR:", err);

    $.toaster({
      priority: "danger",
      title: "Error",
      message: err.message,
    });
  }
});