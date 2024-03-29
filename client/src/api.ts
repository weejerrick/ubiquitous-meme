async function postData(data = {}) {
    const response = await fetch('http://localhost:3000/send', {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    });
    return response.json();
}

export { postData }