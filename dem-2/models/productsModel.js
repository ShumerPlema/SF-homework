const client = require("../dbConnect.js");

class ProductModel {
    async getProducts() {
        const dbRes = await client.query(`SELECT products.product, manufactures.manufacture, categories.category 
                                         FROM products
                                         INNER JOIN categories 
                                         ON products.id_category =  categories.id_category  
                                         INNER JOIN manufactures 
                                         ON  products.id_manufacture = manufactures.id_manufacture `);
        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        } else {
            return {
                status: "ok",
                data: dbRes.rows,
                message: "",
            }
        }
    }

    async productSearch(queryValue) {

        const {products, categories, manufactures} = queryValue;

        if(products === undefined && categories  === undefined && manufactures === undefined) {
            return {
                status: "error",
                data: [],
                message: "Incorrect name of arguments"
            }
        }

        if (manufactures && categories && products) {
            return await this.prodManCatName(manufactures, categories, products);
        }

        if (manufactures && categories) {
            return await this.prodManCat(manufactures, categories);
        }

        if (categories && products) {
            return await this.prodCatName(categories, products);
        }

        if (products && manufactures) {
            return await this.prodNameMan(products, manufactures);
        }

        if (products !== undefined) {
            return await this.prodName(products);
        }

        if (categories !== undefined) {
            return await this.prodCat(categories);
        }

        if (manufactures !== undefined) {
            return await this.prodMan(manufactures);
        }
    }

    async productDetails(id) {

        const prodId = id.split(",");


        if (!Number.isInteger(Number(prodId[0]))) {
            return {
                status: "error",
                data: [],
                message: "Incorrect value of id"
            }
        }

        const dbRes = await client.query(`SELECT  products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link, products.ingridients                                       FROM products
                                        INNER JOIN categories
                                        ON products.id_category = categories.id_category
                                        INNER JOIN units
                                        ON products.id_unit = units.id_unit
                                        INNER JOIN manufactures
                                        ON manufactures.id_manufacture = products.id_manufacture
                                        WHERE products.id_product = ${prodId[0]}`)

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: `Product ${prodId[0]} not found`
            }
        }

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    };

    async prodManCatName(manufactures, categories, products) {
        const categoriesQueryValues = categories.split(",");
        const manufacturesQueryValues = manufactures.split(",");
        const validateResMan = await this.validateMan(manufacturesQueryValues);
        const validateResCat = await this.validateCat(categoriesQueryValues);

        if (validateResMan) {
            return validateResMan;
        }

        if (validateResCat) {
            return validateResCat;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_category IN (${categoriesQueryValues.join(",")})
                                            AND products.id_manufacture IN (${manufacturesQueryValues.join(",")})
                                            AND products.product LIKE '%${products}%'`)

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    }

    async prodManCat(manufactures, categories) {
        const categoriesQueryValues = categories.split(",");
        const manufacturesQueryValues = manufactures.split(",");
        const validateResCat = await this.validateCat(categoriesQueryValues);
        const validateResMan = await this.validateMan(manufacturesQueryValues);

        if (validateResCat) {
            return validateResCat;
        }

        if (validateResMan) {
            return validateResMan;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_category IN (${categoriesQueryValues.join(",")})
                                            AND products.id_manufacture IN (${manufacturesQueryValues.join(",")});`)

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    }

    async prodCatName(categories, products) {
        const categoriesQueryValues = categories.split(",");

        const validateResCat = await this.validateCat(categoriesQueryValues);

        if (validateResCat) {
            return validateResCat;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_category IN (${categoriesQueryValues.join(",")}) AND products.product LIKE '%${products}%';`)

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    }

    async prodNameMan(products, manufactures) {
        const manufacturesQueryValues = manufactures.split(",");

        const validateResMan = await this.validateMan(manufacturesQueryValues)

        if (validateResMan) {
            return validateResMan;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_manufacture IN (${manufacturesQueryValues.join(",")}) AND products.product LIKE '%${products}%'`)

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    }

    async prodCat(categories) {
        const categoriesQueryValues = categories.split(",");

        const validateRes = await this.validateCat(categoriesQueryValues);

        if (validateRes) {
            return validateRes;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_category IN (${categoriesQueryValues.join(",")});`);


        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    };

    async prodName(products) {

        if(products.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Product are not found"
            }
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN manufactures
                                            ON  products.id_manufacture = manufactures.id_manufacture
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            WHERE product LIKE '%${products}%'`);

        if (dbRes.rows.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Product are not found"
            }
        } else {

            return {
                status: "ok",
                data: dbRes.rows,
                message: "",
            }
        }
    };

    async prodMan(manufactures) {

        const manufacturesQueryValues = manufactures.split(",");

        const validateResMan = await this.validateMan(manufacturesQueryValues)

        if (validateResMan) {
            return validateResMan;
        }

        const dbRes = await client.query(`SELECT products.id_product, products.product, manufactures.manufacture, categories.category, units.unit, products.price, products.img_link
                                            FROM products
                                            INNER JOIN categories
                                            ON products.id_category = categories.id_category
                                            INNER JOIN units
                                            ON products.id_unit = units.id_unit
                                            INNER JOIN manufactures
                                            ON manufactures.id_manufacture = products.id_manufacture
                                            WHERE products.id_manufacture IN (${manufacturesQueryValues.join(",")})`);

        return {
            status: "ok",
            data: dbRes.rows,
            message: "",
        }
    };

    async validateMan(manufacturesQueryValues) {
        const manufacturesId = await client.query(`SELECT id_manufacture FROM manufactures`);
        let validateManId = manufacturesQueryValues.every(el => Object.values(manufacturesId.rows).map(el => el.id_manufacture).includes(Number(el)))
        if (!validateManId) {
            return {
                status: "error",
                data: [],
                message: "Manufacture not found"
            }
        }
    }

    async validateCat(categoriesQueryValues) {
        const categoriesId = await client.query(`SELECT id_category FROM categories`);

        let validateCatId = categoriesQueryValues.every(el => Object.values(categoriesId.rows).map(el => el.id_category).includes(Number(el)));

        if (!validateCatId) {
            return {
                status: "error",
                data: [],
                message: "Category not found"
            }
        }
    }
}


let prodMod = new ProductModel();

module.exports = prodMod;