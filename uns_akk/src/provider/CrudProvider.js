import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_LOCAL;
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_STAGING;
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_PRODUCTION;

const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS;
//const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_STAGING_DOCS;
// const API_BASE_URL_DOC = process.env.REACT_APP_API_BASE_URL_PRODUCTION_DOCS;

async function login(login) {
  const loginDTO = JSON.stringify(login);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/LoginAPI/login`,

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
    let token = localStorage.getItem("zktok");
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
async function getItemById(controller, itemId) {
  try {
    let token = localStorage.getItem("zktok");

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
    let token = localStorage.getItem("zktok");

    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      itemData,
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
    let token = localStorage.getItem("zktok");

    const response = await axios.post(
      `${API_BASE_URL}/${controller}`,
      itemData,
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
    let token = localStorage.getItem("zktok");
    const response = await axios.put(
      `${API_BASE_URL}/${controller}`,
      itemData,
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
    let token = localStorage.getItem("zktok");
    const response = await axios.put(
      `${API_BASE_URL}/${controller}`,
      itemData,
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
    let token = localStorage.getItem("zktok");

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
  // let token = localStorage.getItem("zktok");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ReportAPIController/${methodRoute}/${id}`,
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
    link.download = `${reportName}.pdf`;
    link.click();
  } catch (error) {
    handleRequestError(error);
  }
}
async function checkSEMS() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/GeneralAPIController/CheckSEMS`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
    return false;
  }
}

async function transferBudget(firstBudget, secondBuget, price) {
  try {
    let token = localStorage.getItem("zktok");

    const response = await axios.put(
      `${API_BASE_URL}/BuxhetiAPI/TransferoBuxhetin/${firstBudget}/${secondBuget}/${price}`,
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
