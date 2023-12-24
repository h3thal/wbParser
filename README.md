# Название Вашего Проекта

Описание вашего проекта.

## Установка

Для запуска проекта необходимо установить зависимости с помощью npm или yarn:

```bash
# Используя npm
npm install

# Или используя yarn
yarn

# Запуск в режиме продакшн
npm start

# Запуск в режиме разработки
npm run dev

# Или используя yarn
yarn start
yarn dev

#API

Получение элементов
Выполните GET-запрос по следующему пути:

http://localhost:3000/api/items/getItems?url=https://www.wildberries.ru/catalog/146972802/detail.aspx

Ответ сервера будет в формате JSON и будет содержать информацию о элементах:

{
  "responseApi": [
    {
      "name": "Название элемента",
      "art": 123456,
      "color": "Цвет элемента",
      "stock": [
        {
          "2XL": 0
        },
        {
          "3XL": 0
        },
        {
          "4XL": 0
        }
      ]
    },
    // Другие элементы...
  ]
}
```
