const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tarea(s)`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar Tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear();
    console.log("=============================".green);
    console.log("    Selecciona una Opción    ".white);
    console.log("=============================\n".green);

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;

}

const inquirerPausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ]
    
    console.log('\n');
    await inquirer.prompt( question );

}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ) {

                if( value.length === 0 ) {
                    return 'Por favor ingrese una valor';
                }

                return true;

            }
        }
    ];

    const { descripcion } = await inquirer.prompt( question );

    return descripcion;

}

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, index ) => {

        const idx = `${ index + 1 }`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.description } `
        }

    } );
    
    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt( preguntas );

    return id;

}

const confirmar = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );

    return ok;

}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar
}