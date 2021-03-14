# MicroServiceDemo

### User Story:
* user can add product.
* user can list products.
* user can add product to basket.
* user can remove product from basket.
* user can edit product.
* user can delete product.

### services 
* Proxy (Nginx).
* prdouct.
* basket.
* Event bus (RabbitMQ).
* Client.

### models
| product        | type |
|----------------|---|
| id             | PK, serial |
| name           | String |
| stock          | INTEGER |
| price          | FLOAT |
| Description    | String |

| basket         | type |
|----------------|---|
| id             | PK, serial |
| productId      | INTEGER |
| productName    | String |
| price          | FLOAT |
| quantity       | INTEGER |
