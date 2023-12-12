// https://new.novaposhta.ua/dashboard/settings/developers - за цим посиланнями в розділі "Безпека",
// ви зможете створити свій API ключ після реєстрації 

let baseUrl = 'https://api.novaposhta.ua/v2.0/json';

// в залежності від даних, які ви хочете отримати - змінюйте цей об'єкт
let bodyWarehouses = {
    "apiKey": "Ваш API ключ", // Нікому не повідомляйте ваш API ключ!!!
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {}
};

async function getWarehouses() {
    try {
        const response = await fetch(`${baseUrl}/cities`, { method: "POST", body: JSON.stringify(bodyWarehouses) });
        const data = await response.json();

        // переведимо JSON в Blob
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

        // Отримуємо <a></a> таг (кнопка,при натисканні на яку починаться скачування нашого файлу)
        let downloadButton = document.getElementById("downloadButton")
        downloadButton.href = URL.createObjectURL(blob);
        downloadButton.download = 'data.json';

        // Додаємо лінк до тіла
        document.body.appendChild(downloadButton);

    } catch (error) {
        console.error('Error fetching warehouses:', error);
    }
}

getWarehouses().catch((error) => {
    console.log(error);
});
