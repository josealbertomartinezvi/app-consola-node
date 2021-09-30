const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput 
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {

        opt = await inquirerMenu();

        switch ( opt ) {
            case '1': // Crear Tareas
                
                const descripcion = await leerInput('Descripción: ');
                tareas.crearTarea( descripcion );

                break;

            case '2': // Listar Tareas

                console.log( tareas._listado );
            
                break;
        }

        if( opt !== '0' ) await inquirerPausa();

    }while( opt !== '0' );

}


main();