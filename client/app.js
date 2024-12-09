const fetchGreeting = async () => {
  const responsive = await fetch("http://localhost:9000/", {
    body: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "query: {greeting}",
    }),
  });
};

fetchGreeting();
