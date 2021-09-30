const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};

    }

    get listadoTareas() {

        let listado = [];

        Object.keys( this._listado ).map( key => {
            // console.log( key )
            listado = [ ...listado, this._listado[key] ]
        } );

        return listado;

    }

    crearTarea( descripcion = '' ) {

        const tarea = new Tarea( descripcion );
        this._listado[ tarea.id ] = tarea;

    }

}

module.exports = Tareas;