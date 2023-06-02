import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_LOCAL;
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_STAGING;
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_PRODUCTION;

const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS;
//const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_STAGING_DOCS;
// const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_PRODUCTION_DOCS;

async function login(controller, model) {
  const loginDTO = JSON.stringify(model);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,

      loginDTO,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}
// Get all items
async function getAll(controller) {
  try {
    let token = localStorage.getItem("akktok");
    let langId = localStorage.getItem("i18nextLng");
    const response = await axios.get(
      `${API_BASE_URL}/${controller}/${langId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// Get a single item by ID
async function getItemById(controller, itemId) {
  try {
    let langId = localStorage.getItem("i18nextLng");
    let token = localStorage.getItem("akktok");
    const response = await axios.get(
      `${API_BASE_URL}/${controller}/${langId}/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

// Create a new item
async function createItem(controller, itemData) {
  try {
    let token = localStorage.getItem("akktok");

    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      JSON.stringify(itemData),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// CREATE OBJECT WITH FORM FILE
async function createItemWithFile(controller, itemData) {
  try {
    let token = localStorage.getItem("akktok");
    const formData = new FormData();
    Object.keys(itemData).forEach((key) => {
      if (itemData[key] !== null && typeof itemData[key] === "object") {
        if (Array.isArray(itemData[key])) {
          itemData[key].forEach((value) => {
            formData.append(key, value.toString());
          });
        } else {
          Object.keys(itemData[key]).forEach((subKey) => {
            if (Array.isArray(itemData[key][subKey])) {
              itemData[key][subKey].forEach((value) => {
                formData.append(`${key}.${subKey}[]`, value.toString());
              });
            } else {
              formData.append(`${key}.${subKey}`, itemData[key][subKey]);
            }
          });
        }
      } else {
        formData.append(key, itemData[key]);
      }
    });

    // for (let i of formData.entries()) {
    //   console.log(i[0] + i[1]);
    // }
    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// Update an existing item
async function updateItem(controller, itemData) {
  try {
    let langId = localStorage.getItem("i18nextLng");
    let token = localStorage.getItem("akktok");
    const response = await axios.put(
      `${API_BASE_URL}/${controller}/${langId}`,
      JSON.stringify(itemData),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateItemWithFile(controller, itemData) {
  try {
    let token = localStorage.getItem("akktok");
    let langId = localStorage.getItem("i18nextLng");
    const formData = new FormData();
    Object.keys(itemData).forEach((key) => {
      if (itemData[key] !== null && typeof itemData[key] === "object") {
        if (Array.isArray(itemData[key])) {
          itemData[key].forEach((value) => {
            formData.append(key, value.toString());
          });
        } else {
          Object.keys(itemData[key]).forEach((subKey) => {
            if (Array.isArray(itemData[key][subKey])) {
              itemData[key][subKey].forEach((value) => {
                formData.append(`${key}.${subKey}[]`, value.toString());
              });
            } else {
              formData.append(`${key}.${subKey}`, itemData[key][subKey]);
            }
          });
        }
      } else {
        formData.append(key, itemData[key]);
      }
    });

    const response = await axios.put(
      `${API_BASE_URL}/${controller}/${langId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("akktok");
    const response = await axios.delete(
      `${API_BASE_URL}/${controller}/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
async function getReportRDLC(methodRoute, id, reportName) {
  // let token = localStorage.getItem("akktok");
  try {
    let langId = localStorage.getItem("i18nextLng");
    const response = await axios.get(
      `${API_BASE_URL}/ReportAPIController/${methodRoute}/${langId}/${id}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        responseType: "blob",
      }
    );
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    // link.download = `${reportName}.pdf`;
    link.click();
  } catch (error) {
    handleRequestError(error);
  }
}

function documentPath(filePath) {
  return `${API_BASE_URL_DOC}/${filePath}`;
}

async function handleRequestError(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
}

export default {
  login,
  getAll,
  getItemById,
  createItem,
  createItemWithFile,
  deleteItemById,
  updateItem,
  updateItemWithFile,
  documentPath,
  getReportRDLC,
};
