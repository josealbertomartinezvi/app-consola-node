const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput, 
    listadoTareasBorrar,
    confirmar
} = require('./helpers/inquirer');
const { 
    guardarDB, 
    leerDB
} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

require('colors');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    // obtiene las tareas desde el archivo y los carga al array
    if( tareasDB ){
        tareas.cargarTareas( tareasDB )
    }

    do {

        opt = await inquirerMenu();

        switch ( opt ) {
            case '1': // Crear Tareas
                
                const descripcion = await leerInput('Descripción: ');
                tareas.crearTarea( descripcion );

                break;

            case '2': // Listar Tareas

                // console.log( tareas.listadoTareas );
                tareas.listadoCompleto();
            
                break;

            case '3': // Listar Tareas Completadas

                // console.log( tareas.listadoTareas );
                tareas.listadoPendientesCompletadas( true );
            
                break;

            case '4': // Listar Tareas Pendientes

                // console.log( tareas.listadoTareas );
                tareas.listadoPendientesCompletadas( false );
            
                break;

            case '5': 

            
                break;

            case '6': // Eliminar Tarea

                const id = await listadoTareasBorrar( tareas.listadoTareas )

                if( id !== '0' ) {

                    const confirm = await confirmar('¿ Esta Seguro ?');

                    if( confirm ){
                        tareas.eliminarTarea( id );
                        console.log('Tarea Eliminada Correctamente.');
                    }

                }

                break;
        }

        guardarDB( tareas.listadoTareas );

        if( opt !== '0' ) await inquirerPausa();

    }while( opt !== '0' );

}


main();