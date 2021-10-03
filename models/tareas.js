const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};

    }

    get listadoTareas() {

        let listado = [];

        Object.keys( this._listado ).map( key => {

            listado.push( this._listado[key] );

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

    listadoCompleto() {

        console.log(`\n`)
        this.listadoTareas.map( (tarea, index) => {

            const idx = `${ index + 1 }`.green;
            const { description, completed_at } = tarea;
            const estado = completed_at 
                                ? 'Completada'.green 
                                : 'Pendiente'.red;
        
            console.log(`${ idx }. ${ description } :: ${ estado }`);


        } )

    }

    listadoPendientesCompletadas( completadas = true ){

        console.log(`\n`)
        let contador = 0;
        this.listadoTareas.map( tarea => {

            const { description, completed_at } = tarea;
        
            if( completadas ){

                // muestra las completadas
                if( completed_at ){
                    
                    contador += 1;
                    console.log(`${ contador.toString().green }. ${ description } :: ${ completed_at.green  }`);
                }

            }else{

                // muestra las pendientes
                if( !completed_at ){
                    
                    contador += 1;
                    console.log(`${ contador.toString().green }. ${ description } :: ${ completed_at  }`);
                }

            }

        } )

    }

    eliminarTarea( id = '' ) {

        if( this._listado[id] ) {

            delete this._listado[id];

        }

    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[ id ];

            if( !tarea.completed_at ) {

                tarea.completed_at = new Date().toISOString();

            }

        } )

        this.listadoTareas.forEach( tarea => {

            if( !ids.includes( tarea.id ) ) {

                this._listado[ tarea.id ].completed_at = null;

            }

        } )

    }

}

module.exports = Tareas;