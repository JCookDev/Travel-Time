const fetchApiData = type => {
  return (
    fetch(`http://localhost:3001/api/v1/${type}`)
      .then(response => response.json())
      .catch(error => console.log(`${type} API error!`))
  );
};

const fetchData = () => {
  return Promise.all([
    fetchApiData("travelers"),
    fetchApiData("trips"),
    fetchApiData("destinations")
  ]);
};

const postTripInfo = formData => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })

    .then(data => {
      console.log(`Your trip is booked!`);
    })
    .catch(err => {
      console.log(err);
    });

export default { fetchData, postTripInfo };
