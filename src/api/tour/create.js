const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const createTour = async (data, token) => {
  try {
    const response = await fetch(apiURL + "/tours", {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // if (!response.ok) throw new Error("Failed on sign up request", response);

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const uploadTourImage = async ({ image_url, token, tourId }) => {
  const formData = new FormData();
  formData.append("image", {
    name: new Date() + "_tour-image",
    uri: image_url,
    type: "image",
  });
  console.log(
    "here",
    apiURL + `/tours/upload-img/${tourId}`,
    image_url,
    token,
    tourId
  );

  const response = await fetch(apiURL + `/tours/upload-img/${tourId}`, {
    headers: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
      body: formData,
    },
  });

  return await response.json();
};
