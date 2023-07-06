import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_LOCAL;
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_STAGING;
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_PRODUCTION;

const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS;
//const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_STAGING_DOCS;
// const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_PRODUCTION_DOCS;

const appendToFormData = (key, value, formData) => {
  const appendArrayValue = (formDataKey, arr) => {
    arr.forEach((obj) => {
      if (obj instanceof File) {
        formData.append(`${formDataKey}[]`, obj);
      } else if (typeof obj === "object" && obj !== null) {
        const objectFormData = new FormData();
        Object.entries(obj).forEach(([objKey, objValue]) => {
          if (objValue instanceof File) {
            objectFormData.append(objKey, objValue);
          } else {
            objectFormData.append(objKey, JSON.stringify(objValue));
          }
        });
        formData.append(`${formDataKey}[]`, objectFormData);
      } else {
        formData.append(`${formDataKey}[]`, obj.toString());
      }
    });
  };

  if (value instanceof File) {
    formData.append(key, value);
  } else if (Array.isArray(value)) {
    appendArrayValue(key, value);
  } else if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([subKey, subValue]) => {
      if (subValue instanceof File) {
        formData.append(`${key}.${subKey}`, subValue);
      } else if (Array.isArray(subValue)) {
        appendArrayValue(`${key}.${subKey}`, subValue);
      } else if (typeof subValue === "object" && subValue !== null) {
        const objectFormData = new FormData();
        Object.entries(subValue).forEach(([objKey, objValue]) => {
          if (objValue instanceof File) {
            objectFormData.append(objKey, objValue);
          } else {
            objectFormData.append(objKey, JSON.stringify(objValue));
          }
        });
        formData.append(`${key}.${subKey}`, objectFormData);
      } else {
        formData.append(`${key}.${subKey}`, subValue.toString());
      }
    });
  } else {
    formData.append(key, value);
  }
  return formData;
};

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
async function getAllWithLang(controller) {
  try {
    let token = localStorage.getItem("akktoken");
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
async function getAll(controller) {
  try {
    let token = localStorage.getItem("akktoken");
    const response = await axios.get(`${API_BASE_URL}/${controller}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}
// Get a single item by ID
async function getItemByIdLang(controller, itemId) {
  try {
    let langId = localStorage.getItem("i18nextLng");
    let token = localStorage.getItem("akktoken");
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
async function getItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("akktoken");
    const response = await axios.get(
      `${API_BASE_URL}/${controller}/${itemId}`,
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
    let token = localStorage.getItem("akktoken");
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
async function createItemWithFile(controller, model) {
  try {
    let token = localStorage.getItem("akktoken");
    const formData = new FormData();

    const promises = Object.keys(model).map(async (key) => {
      const value = model[key];
      appendToFormData(key, value, formData);
      return Promise;
    });

    await Promise.all(promises);

    for (let item of formData.entries()) {
      console.log(item[0] + "=" + item[1]);
    }
    // 879456123
    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
    let token = localStorage.getItem("akktoken");
    const response = await axios.put(
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

async function updateItemWithFile(controller, model) {
  try {
    let token = localStorage.getItem("akktoken");
    const formData = new FormData();

    const promises = Object.keys(model).map(async (key) => {
      const value = model[key];
      appendToFormData(key, value, formData);
      return Promise;
    });

    await Promise.all(promises);

    const response = await axios.put(
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

async function deleteItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("akktoken");
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
async function getReportRDLC(methodRoute, fileType, id, reportName) {
  let token = localStorage.getItem("akktoken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${methodRoute}/${fileType}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    const url = URL.createObjectURL(response.data);

    const contentType = response.headers["content-type"];
    if (contentType === "application/pdf") {
      const newWindow = window.open();
      newWindow.location.href = url;
    } else if (contentType === "application/vnd.ms-excel") {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportName}`;
      link.click();
    }
  } catch (error) {
    handleRequestError(error);
  }
}

async function getReportRDLCWithLang(methodRoute, fileType, id, reportName) {
  let langId = localStorage.getItem("i18nextLng");
  let token = localStorage.getItem("akktoken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${methodRoute}/${langId}/${fileType}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    const url = URL.createObjectURL(response.data);

    const contentType = response.headers["content-type"];
    if (contentType === "application/pdf") {
      const newWindow = window.open();
      newWindow.location.href = url;
    } else if (contentType === "application/vnd.ms-excel") {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportName}`;
      link.click();
    }
  } catch (error) {
    handleRequestError(error);
  }
}
async function changeLang(controller) {
  try {
    let token = localStorage.getItem("akktoken");
    let langId = localStorage.getItem("i18nextLng");
    let langByName = langId === "1" ? "sq" : langId === "2" ? "en" : "sr";
    const response = await axios.get(
      `${API_BASE_URL}/GeneralAPI/SetCulture/${langByName}`,
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
function checkIsPDf(event) {
  if (event) {
    let parts = event.split(".");
    let rest = parts.slice(-1)[0];
    if (rest == "pdf") {
      return true;
    } else {
      return false;
    }
  }
}
export default {
  login,
  getAll,
  getAllWithLang,
  getItemById,
  getItemByIdLang,
  createItem,
  createItemWithFile,
  deleteItemById,
  updateItem,
  updateItemWithFile,
  documentPath,
  getReportRDLC,
  getReportRDLCWithLang,
  checkIsPDf,
  changeLang,
};
