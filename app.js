"use strict";
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const notes = document.querySelector("#notes");
const button = document.querySelector("#button");
const form = document.querySelector("#form");
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfVQ2ycW2AROnbmCmVw8I8Uc7Z40BZFpH_-IQjgtznQ_4cDw/formResponse";

const handleSubmit = async (event) => {
  event.preventDefault();
  const fullNameValue = fullName.value;
  const emailValue = email.value;
  const notesValue = notes.value;
  const formData = {
    "entry.253486596": fullNameValue,
    "entry.1124906099": emailValue,
    "entry.1163114650": notesValue,
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Form submitted to google spreadsheet successfully!");
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
};

form.addEventListener("submit", handleSubmit);

const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};
