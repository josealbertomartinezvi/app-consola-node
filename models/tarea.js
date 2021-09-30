
const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    description = '';
    completed_at = null;

    constructor( description ){

        this.id = uuidv4();
        this.description = description;
        this.completed_at = null;

    }

}

module.exports = Tarea;