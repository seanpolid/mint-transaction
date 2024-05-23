class Category {
    id;
    name;
    type;

    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    clone() {
        const category = new Category();
        category.id = this.id;
        category.name = this.name;
        category.type = this.type;
        return category;
    }
}

export default Category;