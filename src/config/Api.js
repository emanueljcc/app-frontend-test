// TODO: add in .env with "yarn add dotenv"
const URL = "https://monoku-tasks.herokuapp.com";
const TOKEN = "vTDlMks5BaSIpoLMRRtH";

const getAll = async () => {
    try {

        const response = await fetch(`${URL}/${TOKEN}/all`);
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

const postItem = async (item) => {
    try {

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        };
        const saved = await fetch(`${URL}/${TOKEN}/add`, options);
        return  saved.json();

    } catch (error) {
        console.log(error);
    }
}

const updateItem = async (data) => {
    try {

        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: data.text,
                notes: data.notes,
            })
        };
        const updated = await fetch(`${URL}/${TOKEN}/${data.id}/update`, options);
        return  updated.json();

    } catch (error) {
        console.log(error);
    }
}

const removeItem = async (id) => {
    try {

        const options = {
            method: "DELETE",
        };
        const deleted = await fetch(`${URL}/${TOKEN}/${id}/delete`, options);
        return await deleted.json();

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAll,
    postItem,
    removeItem,
    updateItem,
};
