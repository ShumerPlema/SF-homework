const {ProductModel} = require("../database/models/productsModel");
const {ManufactureModel} = require("../database/models/manufacturesModel");
const {CategoryModel} = require("../database/models/categoriesModel");
const {UnitModel} = require("../database/models/unitsModel");
const {Op} = require("sequelize");

class ProductsModules {
    async getProducts() {
        const dbRes = await ProductModel.findAll({
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        });

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        } else {
            return {
                status: "ok",
                data: dbRes,
                message: "",
            }
        }
    }

    async productSearch(queryValue) {

        const {products, categories, manufactures} = queryValue;

        if (products === undefined && categories === undefined && manufactures === undefined) {
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

        const dbRes = await ProductModel.findOne({
            where: {
                id_product: prodId
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })


        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: `Product ${prodId[0]} not found`
            }
        }

        return {
            status: "ok",
            data: dbRes,
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

        const dbRes = await ProductModel.findAll({
            where: {
                [Op.and]: [
                    {
                      id_manufacture: {
                          [Op.in]: manufacturesQueryValues
                      }
                    },
                    {
                        id_category: {
                            [Op.in]: categoriesQueryValues
                        }
                    },
                    {
                        product: {
                            [Op.substring]: products
                        }
                    }
                ]
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes,
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

        const dbRes = await ProductModel.findAll({
            where: {
                [Op.and]: [
                    {
                        id_category: {
                            [Op.in]: categoriesQueryValues
                        }
                    },
                    {
                        id_manufacture: {
                            [Op.in]: manufacturesQueryValues
                        }
                    }
                ]
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes,
            message: "",
        }
    }

    async prodCatName(categories, products) {
        const categoriesQueryValues = categories.split(",");

        const validateResCat = await this.validateCat(categoriesQueryValues);

        if (validateResCat) {
            return validateResCat;
        }

        const dbRes = await ProductModel.findAll({
            where: {
                [Op.and]: [
                    {
                        id_category: {
                            [Op.in]: categoriesQueryValues
                        }
                    },
                    {
                        product: {
                            [Op.substring]: products
                        }
                    }
                ]
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes,
            message: "",
        }
    }

    async prodNameMan(products, manufactures) {
        const manufacturesQueryValues = manufactures.split(",");

        const validateResMan = await this.validateMan(manufacturesQueryValues)

        if (validateResMan) {
            return validateResMan;
        }

        const dbRes = await ProductModel.findAll({
            where: {
                [Op.and]: [
                    {
                        id_manufacture: {
                            [Op.in]: manufacturesQueryValues
                        }
                    },
                    {
                        product: {
                            [Op.substring]: products
                        }
                    }
                ]
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are not found"
            }
        }

        return {
            status: "ok",
            data: dbRes,
            message: "",
        }
    }

    async prodCat(categories) {
        const categoriesQueryValues = categories.split(",").map(el => Number(el));

        const validateRes = await this.validateCat(categoriesQueryValues);

        if (validateRes) {
            return validateRes;
        }

        const dbRes = await ProductModel.findAll({
            where: {
                id_category: {[Op.in]: categoriesQueryValues}
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        return {
            status: "ok",
            data: dbRes,
            message: "",
        }
    };

    async prodName(products) {

        if (products.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Product are not found"
            }
        }

        const dbRes = await ProductModel.findAll({
            where: {
                product: {
                    [Op.substring]: products
                }
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        if (dbRes.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Product are not found"
            }
        } else {

            return {
                status: "ok",
                data: dbRes,
                message: "",
            }
        }
    };

    async prodMan(manufactures) {

        const manufacturesQueryValues = manufactures.split(",").map(el => Number(el));

        const validateResMan = await this.validateMan(manufacturesQueryValues)

        if (validateResMan) {
            return validateResMan;
        }

        const dbRes = await ProductModel.findAll({
            where: {
                id_manufacture: {[Op.in]: manufacturesQueryValues}
            },
            attributes: [
                "id_product",
                "product",
                "ingridients",
                "amount",
                "price",
                "img_link"
            ],
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    attributes: ["category"],
                },
                {
                    model: UnitModel,
                    required: true,
                    attributes: ["unit"],
                },
                {
                    model: ManufactureModel,
                    attributes: ["manufacture"],
                    required: true,
                }
            ],
        })

        return {
            status: "ok",
            data: dbRes,
            message: "",
        }
    };

    async validateMan(manufacturesQueryValues) {
        const manufacturesId = await ManufactureModel.findAll({
            attributes: [
                "id_manufacture"
            ]
        })
        let validateManId = manufacturesQueryValues.every(el => manufacturesId.map(el => el.dataValues.id_manufacture).includes(Number(el)))

        if (!validateManId) {
            return {
                status: "error",
                data: [],
                message: "Manufacture not found"
            }
        }
    }

    async validateCat(categoriesQueryValues) {
        const categoriesId = await CategoryModel.findAll({
            attributes: [
                "id_category"
            ]
        })

        let validateCatId = categoriesQueryValues.every(el => categoriesId.map(el => el.dataValues.id_category).includes(Number(el)));

        if (!validateCatId) {
            return {
                status: "error",
                data: [],
                message: "Category not found"
            }
        }
    }
}


let prodMod = new ProductsModules();

module.exports = prodMod;