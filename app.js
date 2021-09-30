const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput 
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
        }

        guardarDB( tareas.listadoTareas );

        if( opt !== '0' ) await inquirerPausa();

    }while( opt !== '0' );

}


main();