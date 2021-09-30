const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};

    }

    get listadoTareas() {

        let listado = [];

        Object.keys( this._listado ).map( key => {

            listado = [ ...listado, this._listado[key] ]

        } );

        return listado;

    }

    cargarTareas( listado = [] ) {

        listado.map( tarea => {
            this._listado[ tarea.id ] = tarea;
        } )

    }

    crearTarea( descripcion = '' ) {

        const tarea = new Tarea( descripcion );
        this._listado[ tarea.id ] = tarea;

    }

}

module.exports = Tareas;